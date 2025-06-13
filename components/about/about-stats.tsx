"use client"

import { StatCard } from "@/components/about/StatCard"

const stats = [
  { label: "Happy Customers", value: 1000 },
  { label: "Products Sold", value: 2500 },
  { label: "Various States", value: 10 },
  { label: "Projects Made", value: 750 },
]

export function AboutStats() {
  return (
    <section className="py-24 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
