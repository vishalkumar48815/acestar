import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { footerNav, legalNav } from "@/content/navigation";
import { COPYRIGHT_YEAR, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-[1.2fr_2fr]">
        <div className="flex max-w-sm flex-col gap-5">
          <Logo />
          <p className="text-fg-muted">{site.description}</p>
          <address className="text-sm leading-relaxed text-fg-subtle not-italic">
            {site.contact.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-4">
              <h2 className="text-eyebrow text-fg-subtle">{group.title}</h2>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-fg-muted transition-colors hover:text-fg">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="flex flex-col gap-4">
            <h2 className="text-eyebrow text-fg-subtle">Reach us</h2>
            <ul className="flex flex-col gap-2.5 text-fg-muted">
              <li>
                <a href={site.contact.phone.href} className="transition-colors hover:text-fg">
                  {site.contact.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email.sales}`} className="break-all transition-colors hover:text-fg">
                  {site.contact.email.sales}
                </a>
              </li>
              <li className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                {site.social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-fg transition-colors hover:text-brand-ink"
                  >
                    {s.label}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {site.legalName} ({site.registrationNo})
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
