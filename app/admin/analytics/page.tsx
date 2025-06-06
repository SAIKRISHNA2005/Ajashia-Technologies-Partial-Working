"use client"

import { AdminCheck } from "@/components/admin-check"
import { AnalyticsOverview } from "@/components/admin/analytics/analytics-overview"
import { SalesChart } from "@/components/admin/analytics/sales-chart"
import { TrafficChart } from "@/components/admin/analytics/traffic-chart"
import { ConversionChart } from "@/components/admin/analytics/conversion-chart"
import { TopProducts } from "@/components/admin/analytics/top-products"
import { CustomerSegments } from "@/components/admin/analytics/customer-segments"
import { ExportReports } from "@/components/admin/analytics/export-reports"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminAnalyticsPage() {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights into your store performance</p>
        </div>

        <AnalyticsOverview />

        <div className="mt-8">
          <Tabs defaultValue="sales" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="conversion">Conversion</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>

            <TabsContent value="sales" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SalesChart />
                <ExportReports />
              </div>
            </TabsContent>

            <TabsContent value="traffic" className="mt-8">
              <TrafficChart />
            </TabsContent>

            <TabsContent value="conversion" className="mt-8">
              <ConversionChart />
            </TabsContent>

            <TabsContent value="products" className="mt-8">
              <TopProducts />
            </TabsContent>

            <TabsContent value="customers" className="mt-8">
              <CustomerSegments />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminCheck>
  )
}
