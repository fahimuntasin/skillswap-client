import { HeroSection } from "@/components/home/HeroSection"
import { TabSection } from "@/components/home/sections/TabSection"
import { AccordionSection } from "@/components/home/sections/AccordionSection"
import { FeatureCards } from "@/components/home/sections/FeatureCards"
import { CtaBanner } from "@/components/home/sections/CtaBanner"

export default function Home() {
  return (
    <>
      <HeroSection />
      <TabSection />
      <AccordionSection />
      <FeatureCards />
      <CtaBanner />
    </>
  )
}
