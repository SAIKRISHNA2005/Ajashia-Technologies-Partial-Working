"use client"

import { Card, CardContent } from "@/components/ui/card"

const timeline = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a vision to revolutionize online shopping",
  },
  {
    year: "2021",
    title: "Hundred Projects Sold",
    description: "Reached our first major milestone with 100 projucts sold",
  },
  {
    year: "2022",
    title: "Product Sale Expansion",
    description: "Expanded operations to sell products across multiple states",
  },
  {
    year: "2023",
    title: "First Thousand Customers",
    description: "Celebrated our first 1000 happy customers",
  },
  {
    year: "2024",
    title: "Two Thousand Projects and Products Sold",
    description: "Achieved a significant milestone with 2000 projects and products sold",
  },
]

export function AboutTimeline() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-black" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400 mb-16">
          Our Journey
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-600 rounded-full"></div>

          <div className="flex flex-col gap-16">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0
              return (
                <div
                  key={item.year}
                  className={`relative flex items-center ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-black shadow-lg z-10"></div>

                  {/* Card */}
                  <div
                    className={`w-[calc(50%-2rem)] ${
                      isLeft ? "text-right pr-6" : "text-left pl-6"
                    }`}
                  >
                    <Card className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground dark:text-gray-300">
                          {item.description}
                        </p>
                        <span className="text-sm text-blue-500 dark:text-blue-300 font-semibold block mt-3">
                          {item.year}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
