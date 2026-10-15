import { ArrowRight, Mail, MessageCircle, Phone } from "@/components/ui/icons";
import { Aurora } from "@/components/ui/aurora";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="relative pt-4 pb-14 md:pb-20">
      <div className="container-page">
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-[2.25rem] px-6 py-12 text-center glass sm:px-12 md:py-16"
        >
          <Aurora className="opacity-80" />
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
            <span className="text-eyebrow text-brand-ink">Contact us</span>
            <h2 id="cta-title" className="text-title">
              Talk to an Acestar specialist.
            </h2>
            <p className="text-lead text-fg-muted">
              Tell us about your team and what you need. We&apos;ll recommend the right software, computers and support.
            </p>
            <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/contact" className="w-full sm:w-auto">
                Contact us
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(site.contact.whatsapp.number, site.whatsappGreeting)}
                variant="glass"
                className="w-full sm:w-auto"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                WhatsApp
              </ButtonLink>
            </div>
            <ul className="mt-4 flex flex-col items-center gap-x-8 gap-y-3 text-fg-muted sm:flex-row">
              <li>
                <a href={site.contact.phone.href} className="inline-flex min-h-11 items-center gap-2 hover:text-fg">
                  <Phone aria-hidden="true" className="size-4" />
                  {site.contact.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email.sales}`}
                  className="inline-flex min-h-11 items-center gap-2 hover:text-fg"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  {site.contact.email.sales}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
