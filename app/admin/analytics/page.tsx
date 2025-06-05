"use client"

import { AdminCheck } from "@/components/admin-check"
import { AnalyticsOverview } from "@/components/admin/analytics/analytics-overview"
import { SalesChart } from "@/components/admin/analytics/sales-chart"
import { TrafficChart } from "@/components/admin/analytics/traffic-chart"
import { ConversionChart } from "@/components/admin/analytics/conversion-chart"
import { TopProducts } from "@/components/admin/analytics/top-products"
import { CustomerSegments } from "@/components/admin/analytics/customer-segments"
import { ExportReports } from "@/components/admin/analytics/export-reports"

export default function AnalyticsPage() {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
        </div>

        <div className="space-y-8">
          <AnalyticsOverview />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SalesChart />
            <TrafficChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ConversionChart />
            <TopProducts />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CustomerSegments />
            <ExportReports />
          </div>
        </div>
      </div>
    </AdminCheck>
  )
}
