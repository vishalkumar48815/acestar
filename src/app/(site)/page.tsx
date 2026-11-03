import { ClosingCta } from "@/components/sections/home/closing-cta";
import { Hero } from "@/components/sections/home/hero";
import { Partners } from "@/components/sections/home/partners";
import { Solutions } from "@/components/sections/home/solutions";

/** Homepage, in the order of the new design. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Solutions />
      <Partners />
      <ClosingCta />
    </>
  );
}
