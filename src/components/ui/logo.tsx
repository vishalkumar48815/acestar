import Image from "next/image";
import Link from "next/link";
import { media } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * Official Acestar logo (from the old site's header). The light-mode version is generated
 * by scripts/build-media.mjs; CSS swaps them on the resolved theme, so there is no flash.
 */
export function Logo({
  className,
  priority = false,
  href = "/",
  label = "Acestar home",
  tone = "auto",
}: {
  className?: string;
  priority?: boolean;
  href?: string;
  label?: string;
  /** "dark": always the logo for dark backgrounds (used in the always-dark footer). */
  tone?: "auto" | "dark";
}) {
  const { logoLight, logoDark } = media;
  const imgClass = "h-7 w-auto sm:h-8 md:h-9";
  if (tone === "dark") {
    return (
      <Link href={href} aria-label={label} className={cn("inline-flex shrink-0 items-center", className)}>
        <Image
          src={logoDark.src}
          width={logoDark.width}
          height={logoDark.height}
          alt=""
          priority={priority}
          unoptimized
          className={imgClass}
        />
      </Link>
    );
  }
  return (
    <Link href={href} aria-label={label} className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={logoLight.src}
        width={logoLight.width}
        height={logoLight.height}
        alt=""
        priority={priority}
        unoptimized
        className={cn(imgClass, "dark:hidden")}
      />
      <Image
        src={logoDark.src}
        width={logoDark.width}
        height={logoDark.height}
        alt=""
        priority={priority}
        unoptimized
        className={cn(imgClass, "hidden dark:block")}
      />
    </Link>
  );
}
