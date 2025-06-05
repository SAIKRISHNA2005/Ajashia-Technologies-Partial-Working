"use client"

import { AuthCheck } from "@/components/auth-check"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { WishlistPreview } from "@/components/dashboard/wishlist-preview"
import { RecommendedProducts } from "@/components/dashboard/recommended-products"
import { useUser } from "@clerk/nextjs"

export default function DashboardPage() {
  const { user } = useUser()

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName || "User"}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your account</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DashboardStats />
            <RecentOrders />
            <RecommendedProducts />
          </div>

          <div className="space-y-8">
            <QuickActions />
            <WishlistPreview />
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}
