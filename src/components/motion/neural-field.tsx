"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; tw: number };
type Pulse = { a: number; b: number; t: number; dur: number; hops: number };

function parseColor(value: string, fallback: [number, number, number]): [number, number, number] {
  const hex = value.trim().match(/^#([0-9a-f]{6})$/i);
  if (!hex) return fallback;
  const n = parseInt(hex[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * A quiet "neural network": drifting nodes that link up when close, with light pulses hopping
 * node to node like signals, and links reaching toward the cursor. Canvas 2D, no dependencies.
 * Colours follow the --accent-from / --accent-to theme tokens. Pauses when off-screen;
 * reduced-motion users get a single still frame.
 */
export function NeuralField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      dpr = 1,
      link = 130,
      running = false,
      frame = 0,
      last = 0;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let from: [number, number, number] = [59, 99, 243];
    let to: [number, number, number] = [162, 77, 240];
    let dark = false;

    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      from = parseColor(cs.getPropertyValue("--accent-from"), from);
      to = parseColor(cs.getPropertyValue("--accent-to"), to);
      dark = document.documentElement.dataset.theme === "dark";
    };

    const colour = (x: number, a: number) => {
      const k = Math.min(1, Math.max(0, x / w));
      const c = from.map((v, i) => Math.round(v + (to[i] - v) * k));
      return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    };

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      link = w < 640 ? 95 : 140;
      const count = Math.min(72, Math.max(16, Math.round((w * h) / 21000)));
      nodes = Array.from({ length: count }, () => {
        // Bias towards the right half on wide screens, where the artwork lives.
        const bx = w >= 1024 ? 0.35 + 0.65 * Math.sqrt(Math.random()) : Math.random();
        return {
          x: bx * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          r: 0.9 + Math.random() * 1.5,
          tw: Math.random() * Math.PI * 2,
        };
      });
      pulses.length = 0;
    };

    const neighbour = (i: number, avoid = -1) => {
      let best = -1,
        bestD = link * link;
      const n = nodes[i];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i || j === avoid) continue;
        const dx = nodes[j].x - n.x,
          dy = nodes[j].y - n.y,
          d = dx * dx + dy * dy;
        if (d < bestD && Math.random() > 0.35) {
          bestD = d;
          best = j;
        }
      }
      return best;
    };

    const spawnPulse = () => {
      const a = Math.floor(Math.random() * nodes.length);
      const b = neighbour(a);
      if (b >= 0) pulses.push({ a, b, t: 0, dur: 650 + Math.random() * 500, hops: 2 + Math.floor(Math.random() * 4) });
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const lineA = dark ? 0.32 : 0.2;
      const t = performance.now() / 1000;

      // Move
      for (const n of nodes) {
        if (pointer.active) {
          const dx = pointer.x - n.x,
            dy = pointer.y - n.y,
            d = Math.hypot(dx, dy);
          if (d < 200 && d > 1) {
            n.vx += (dx / d) * 0.004;
            n.vy += (dy / d) * 0.004;
          }
        }
        n.vx *= 0.995;
        n.vy *= 0.995;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp < 0.05) {
          n.vx += (Math.random() - 0.5) * 0.02;
          n.vy += (Math.random() - 0.5) * 0.02;
        }
        n.x += n.vx * dt * 0.06;
        n.y += n.vy * dt * 0.06;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // Links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          if (Math.abs(dx) > link || Math.abs(dy) > link) continue;
          const d = Math.hypot(dx, dy);
          if (d > link) continue;
          ctx.strokeStyle = colour((a.x + b.x) / 2, (1 - d / link) * lineA);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        // Reach toward the cursor
        if (pointer.active) {
          const d = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (d < 190) {
            ctx.strokeStyle = colour(a.x, (1 - d / 190) * (dark ? 0.55 : 0.4));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      // Nodes (twinkling)
      for (const n of nodes) {
        const tw = 0.55 + 0.45 * Math.sin(t * 1.4 + n.tw);
        ctx.fillStyle = colour(n.x, (dark ? 0.85 : 0.6) * tw);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Signals hopping across the network
      if (!reduced && pulses.length < (w < 640 ? 2 : 5) && Math.random() < 0.03) spawnPulse();
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        p.t += dt / p.dur;
        const A = nodes[p.a],
          B = nodes[p.b];
        if (!A || !B) {
          pulses.splice(k, 1);
          continue;
        }
        const e = p.t < 0.5 ? 2 * p.t * p.t : 1 - Math.pow(-2 * p.t + 2, 2) / 2;
        const x = A.x + (B.x - A.x) * e,
          y = A.y + (B.y - A.y) * e;
        ctx.strokeStyle = colour(x, dark ? 0.7 : 0.5);
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
        g.addColorStop(0, dark ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,1)");
        g.addColorStop(0.25, colour(x, 0.75));
        g.addColorStop(1, colour(x, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();
        if (p.t >= 1) {
          const next = p.hops > 0 ? neighbour(p.b, p.a) : -1;
          if (next >= 0) {
            p.a = p.b;
            p.b = next;
            p.t = 0;
            p.hops--;
          } else pulses.splice(k, 1);
        }
      }
      ctx.lineWidth = 1;
    };

    const loop = (now: number) => {
      const dt = Math.min(48, now - (last || now));
      last = now;
      draw(dt);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    readTheme();
    seed();
    draw(16);

    const ro = new ResizeObserver(() => {
      seed();
      draw(16);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      readTheme();
      if (!running) draw(16);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onVis = () => (document.visibilityState === "visible" ? start() : stop());
    document.addEventListener("visibilitychange", onVis);
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.y > 0 && pointer.y < rect.height;
    };
    const onLeave = () => (pointer.active = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
