"use client"

import { AdminCheck } from "@/components/admin-check"
import { InventoryOverview } from "@/components/admin/inventory/inventory-overview"
import { InventoryTable } from "@/components/admin/inventory/inventory-table"
import { LowStockAlerts } from "@/components/admin/inventory/low-stock-alerts"
import { InventoryFilters } from "@/components/admin/inventory/inventory-filters"
import { StockAdjustments } from "@/components/admin/inventory/stock-adjustments"

export default function InventoryPage() {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage your product inventory</p>
        </div>

        <div className="space-y-8">
          <InventoryOverview />
          <LowStockAlerts />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <InventoryFilters />
            </div>
            <div className="lg:col-span-3">
              <InventoryTable />
            </div>
          </div>

          <StockAdjustments />
        </div>
      </div>
    </AdminCheck>
  )
}
