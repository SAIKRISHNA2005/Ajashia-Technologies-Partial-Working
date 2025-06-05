"use client"

import { AdminCheck } from "@/components/admin-check"
import { OrderManagement } from "@/components/admin/order-management"
import { OrderFilters } from "@/components/admin/order-filters"
import { OrderStats } from "@/components/admin/order-stats"

export default function AdminOrdersPage() {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Order Management</h1>
          <p className="text-muted-foreground">Manage customer orders and fulfillment</p>
        </div>

        <OrderStats />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <aside className="lg:col-span-1">
            <OrderFilters />
          </aside>

          <main className="lg:col-span-3">
            <OrderManagement />
          </main>
        </div>
      </div>
    </AdminCheck>
  )
}
