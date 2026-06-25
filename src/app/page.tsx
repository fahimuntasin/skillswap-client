import { Suspense } from "react"
import { HeroSection } from "@/components/home/HeroSection"
import { FeaturedTasks } from "@/components/home/FeaturedTasks"
import { TopFreelancers } from "@/components/home/TopFreelancers"
import { HowItWorks } from "@/components/home/HowItWorks"
import { Categories } from "@/components/home/Categories"
import { TabSection } from "@/components/home/sections/TabSection"
import { FeatureRows } from "@/components/home/sections/FeatureRows"
import { FeatureCards } from "@/components/home/sections/FeatureCards"
import { CtaBanner } from "@/components/home/sections/CtaBanner"

export default function Home() {
  return (
    <>
      <HeroSection />
      <TabSection />
      <Suspense><FeaturedTasks /></Suspense>
      <Suspense><TopFreelancers /></Suspense>
      <HowItWorks />
      <Categories />
      <FeatureRows />
      <FeatureCards />
      <CtaBanner />
    </>
  )
}
