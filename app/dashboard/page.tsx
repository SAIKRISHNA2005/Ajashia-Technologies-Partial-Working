"use client"

import { AuthCheck } from "@/components/auth-check"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { WishlistPreview } from "@/components/dashboard/wishlist-preview"
import { RecommendedProducts } from "@/components/dashboard/recommended-products"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { useAuth } from "@clerk/nextjs"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName || "User"}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your account</p>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <RecentOrders />
            <RecommendedProducts />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <QuickActions />
            <WishlistPreview />
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}
