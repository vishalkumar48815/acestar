import Link from "next/link";
import { Children, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { shortCtaLabels } from "@/content/cta-labels";
import { cn } from "@/lib/utils";

/**
 * Full label from 640px up, short label (content/cta-labels.ts) on phones, so long CTAs never wrap.
 * Usable on its own for button-like elements that don't use <Button>/<ButtonLink>.
 */
export function ResponsiveLabel({ text }: { text: string }) {
  const short = shortCtaLabels[text.trim()];
  if (!short) return <>{text}</>;
  return (
    <>
      <span className="sm:hidden">{short}</span>
      <span className="max-sm:hidden">{text}</span>
    </>
  );
}

const withShortLabels = (children: ReactNode) =>
  Children.map(children, (child) =>
    typeof child === "string" && shortCtaLabels[child.trim()] ? <ResponsiveLabel text={child} /> : child,
  );

type Variant = "primary" | "gradient" | "glass" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex max-w-full items-center justify-center gap-2 rounded-2xl text-center font-semibold whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color,color,filter] duration-300 ease-out-expo " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] hover:-translate-y-0.5 hover:shadow-[var(--btn-primary-shadow)]",
  gradient:
    "rounded-full bg-[image:var(--btn-gradient)] text-white shadow-[var(--btn-gradient-shadow)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-14px_rgb(91_84_240/0.9)]",
  glass: "glass text-fg hover:-translate-y-0.5",
  ghost: "text-fg hover:bg-brand-soft",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[0.9375rem] max-sm:py-2.5",
  lg: "min-h-13 px-6 text-base max-sm:min-h-12 max-sm:py-3 max-sm:text-[0.9375rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

type ButtonLinkProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/** Link styled as a button. External links open in a new tab safely. */
export function ButtonLink({ href, external, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    const opensTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(opensTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {withShortLabels(children)}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {withShortLabels(children)}
    </Link>
  );
}

type ButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({ variant, size, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {withShortLabels(children)}
    </button>
  );
}
