import { HeroSection } from "@/components/home/HeroSection"
import { TabSection } from "@/components/home/sections/TabSection"
import { FeatureRows } from "@/components/home/sections/FeatureRows"
import { FeatureCards } from "@/components/home/sections/FeatureCards"
import { CtaBanner } from "@/components/home/sections/CtaBanner"

export default function Home() {
  return (
    <>
      <HeroSection />
      <TabSection />
      <FeatureRows />
      <FeatureCards />
      <CtaBanner />
    </>
  )
}
