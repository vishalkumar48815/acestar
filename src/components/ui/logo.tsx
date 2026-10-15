import Image from "next/image";
import Link from "next/link";
import { media } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * Official Acestar logo (from the old site's header). The light-mode version is generated
 * by scripts/build-media.mjs; CSS swaps them on the resolved theme, so there is no flash.
 */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  const { logoLight, logoDark } = media;
  const imgClass = "h-8 w-auto md:h-9";
  return (
    <Link href="/" aria-label="Acestar home" className={cn("inline-flex shrink-0 items-center", className)}>
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
