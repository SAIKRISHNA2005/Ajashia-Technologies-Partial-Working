"use client"

import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Shyesh Kumar",
    quote: "Good products and Helpful for my Final Year Project.",
  },
  {
    name: "Karthik S",
    quote: "Amazing service and quality! and also Delivery is quick...Highly recommend Ajashia.",
  },
  {
    name: "Deepika Roselyn",
    quote: "Great Working Model Projects!",
  },
]

export function AboutTestimonials() {
  return (
    <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800 dark:text-white">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-white shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6 text-center">
                <p className="text-lg italic mb-4">“{t.quote}”</p>
                <h3 className="text-md font-semibold text-blue-600 dark:text-blue-400">— {t.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
