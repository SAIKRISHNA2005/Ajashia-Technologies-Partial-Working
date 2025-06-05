"use client"

import { AdminCheck } from "@/components/admin-check"
import { GeneralSettings } from "@/components/admin/settings/general-settings"
import { PaymentSettings } from "@/components/admin/settings/payment-settings"
import { ShippingSettings } from "@/components/admin/settings/shipping-settings"
import { NotificationSettings } from "@/components/admin/settings/notification-settings"
import { SecuritySettings } from "@/components/admin/settings/security-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">System Settings</h1>
          <p className="text-muted-foreground">Configure your store settings and preferences</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <GeneralSettings />
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <PaymentSettings />
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <ShippingSettings />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </AdminCheck>
  )
}
