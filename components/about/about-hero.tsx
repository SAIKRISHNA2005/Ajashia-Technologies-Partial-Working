"use client"

import { Button } from "@/components/ui/button"

export function AboutHero() {
  const handleScroll = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
          About Ajashia
        </h1>
        <p className="text-2xl md:text-3xl mb-10 max-w-4xl mx-auto font-light">
          We're passionate about bringing you the best products with exceptional service and innovation.
        </p>
        <Button
          size="lg"
          variant="secondary"
          onClick={handleScroll}
          className="text-lg px-10 py-6 font-semibold rounded-full"
        >
          Learn More
        </Button>
      </div>
    </section>
  )
}
