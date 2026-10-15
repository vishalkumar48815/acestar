import { Beyond } from "@/components/sections/home/beyond";
import { Campaigns } from "@/components/sections/home/campaigns";
import { CeoMessage } from "@/components/sections/home/ceo-message";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { Hero } from "@/components/sections/home/hero";
import { News } from "@/components/sections/home/news";
import { Pillars } from "@/components/sections/home/pillars";
import { Proof } from "@/components/sections/home/proof";
import { Voices } from "@/components/sections/home/voices";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Campaigns />
      <Proof />
      <Pillars />
      <Beyond />
      <CeoMessage />
      <Voices />
      <News />
      <ClosingCta />
    </>
  );
}
