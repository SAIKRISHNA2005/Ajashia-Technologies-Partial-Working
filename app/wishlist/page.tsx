"use client"

import { useWishlist } from "@/components/wishlist-provider"
import { WishlistGrid } from "@/components/wishlist/wishlist-grid"
import { AuthCheck } from "@/components/auth-check"
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WishlistPage() {
  const { items } = useWishlist()

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">{items.length} items saved for later</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center max-w-md mx-auto py-16">
            <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save items you love to easily find them later.</p>
            <Button asChild>
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <WishlistGrid items={items} />
        )}
      </div>
    </AuthCheck>
  )
}
