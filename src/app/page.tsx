import { HeroSection } from "@/components/home/HeroSection"
import { FeaturedTasks } from "@/components/home/FeaturedTasks"
import { TopFreelancers } from "@/components/home/TopFreelancers"
import { HowItWorks } from "@/components/home/HowItWorks"
import { Categories } from "@/components/home/Categories"

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedTasks />
      <TopFreelancers />
      <HowItWorks />
      <Categories />
    </>
  )
}
