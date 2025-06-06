"use client"

import { AdminCheck } from "@/components/admin-check"
import { InventoryOverview } from "@/components/admin/inventory/inventory-overview"
import { InventoryTable } from "@/components/admin/inventory/inventory-table"
import { InventoryFilters } from "@/components/admin/inventory/inventory-filters"
import { LowStockAlerts } from "@/components/admin/inventory/low-stock-alerts"
import { StockAdjustments } from "@/components/admin/inventory/stock-adjustments"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminInventoryPage() {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage your product inventory</p>
        </div>

        <InventoryOverview />

        <div className="mt-8">
          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="alerts">Low Stock Alerts</TabsTrigger>
              <TabsTrigger value="adjustments">Stock Adjustments</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1">
                  <InventoryFilters />
                </aside>
                <main className="lg:col-span-3">
                  <InventoryTable />
                </main>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="mt-8">
              <LowStockAlerts />
            </TabsContent>

            <TabsContent value="adjustments" className="mt-8">
              <StockAdjustments />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminCheck>
  )
}
