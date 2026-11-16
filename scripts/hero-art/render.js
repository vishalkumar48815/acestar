// Renders scripts/hero-art/<name>/render-<name>-art.html to a transparent PNG at 2x.
// node scripts/hero-art/render.js <name> <width> <height> <out.png>
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const [name, w, h, out] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.resolve(__dirname, name, `render-${name}-art.html`));
  await p.waitForTimeout(900);
  await p.locator('#s').screenshot({ path: out, omitBackground: true });
  await b.close();
})();
