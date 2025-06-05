"use client"

import { AdminCheck } from "@/components/admin-check"
import { CouponsList } from "@/components/admin/coupons/coupons-list"
import { CreateCouponForm } from "@/components/admin/coupons/create-coupon-form"
import { CouponStats } from "@/components/admin/coupons/coupon-stats"
import { PromotionScheduler } from "@/components/admin/coupons/promotion-scheduler"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function CouponsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Coupons & Promotions</h1>
            <p className="text-muted-foreground">Create and manage discount codes and promotions</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Coupon
          </Button>
        </div>

        <div className="space-y-8">
          <CouponStats />

          {showCreateForm && <CreateCouponForm onClose={() => setShowCreateForm(false)} />}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CouponsList />
            <PromotionScheduler />
          </div>
        </div>
      </div>
    </AdminCheck>
  )
}
