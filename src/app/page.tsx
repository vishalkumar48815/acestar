import { Beyond } from "@/components/sections/home/beyond";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { Hero } from "@/components/sections/home/hero";
import { Pillars } from "@/components/sections/home/pillars";
import { Proof } from "@/components/sections/home/proof";
import { Voices } from "@/components/sections/home/voices";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <Pillars />
      <Beyond />
      <Voices />
      <ClosingCta />
    </>
  );
}
