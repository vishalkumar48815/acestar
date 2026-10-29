import Link from "next/link";
import { Mail, MapPin, Phone } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { SocialIcon } from "@/components/ui/social-icons";
import { footerColumns, legalNav } from "@/content/navigation";
import { COPYRIGHT_YEAR, site } from "@/content/site";

export function Footer() {
  const { contact } = site;
  return (
    <footer className="relative pt-6 lg:pt-8">
      <div className="container-page grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.1fr_0.7fr_1.2fr] lg:gap-8">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm text-fg-muted">{site.footerTagline}</p>
          <ul className="mt-2 flex items-center gap-4" aria-label="Social media">
            {site.social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${s.label}`}
                  className="grid size-9 place-items-center rounded-lg text-ink transition-all hover:-translate-y-0.5 hover:text-brand-ink"
                >
                  <SocialIcon network={s.network} className="size-[1.375rem]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerColumns.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-semibold text-ink">{group.title}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-fg-muted transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-sm font-semibold text-ink">Contact</h2>
          <ul className="mt-4 flex flex-col gap-3.5 text-sm text-fg-muted">
            <li>
              <a
                href={contact.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 transition-colors hover:text-ink"
              >
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink" />
                <address className="not-italic">
                  {site.legalName}
                  <br />
                  Bangsar South, Kuala Lumpur, Malaysia
                </address>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email.sales}`} className="flex gap-3 transition-colors hover:text-ink">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink" />
                {contact.email.sales}
              </a>
            </li>
            <li>
              <a href={contact.phone.href} className="flex gap-3 transition-colors hover:text-ink">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink" />
                {contact.phone.display}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {site.legalName} ({site.registrationNo}). All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-ink">
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
