import { AboutHero } from "@/components/about/about-hero"
import { AboutTestimonials } from "@/components/about/about-team"
import { AboutValues } from "@/components/about/about-values"
import { AboutTimeline } from "@/components/about/about-timeline"
import { AboutStats } from "@/components/about/about-stats"

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-0 pb-16">
      <AboutHero />
      <AboutStats />
      <AboutValues />
      <AboutTimeline />
      <AboutTestimonials />
    </div>
  )
}
