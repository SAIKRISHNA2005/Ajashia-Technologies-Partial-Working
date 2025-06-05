"use client"

import { useSearchParams } from "next/navigation"
import { SearchResults } from "@/components/search/search-results"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchSort } from "@/components/search/search-sort"
import { ProductSearch } from "@/components/products/product-search"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        {query && <p className="text-muted-foreground">Showing results for "{query}"</p>}
      </div>

      <div className="mb-6">
        <ProductSearch defaultValue={query} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <SearchFilters />
        </aside>

        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">Found 156 products</div>
            <SearchSort />
          </div>
          <SearchResults query={query} />
        </main>
      </div>
    </div>
  )
}
