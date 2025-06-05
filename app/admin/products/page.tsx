"use client"

import { AdminCheck } from "@/components/admin-check"
import { ProductManagement } from "@/components/admin/product-management"
import { ProductForm } from "@/components/admin/product-form"
import { BulkOperations } from "@/components/admin/bulk-operations"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function AdminProductsPage() {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <AdminCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Management</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <BulkOperations />

        <div className="mt-8">
          <ProductManagement />
        </div>

        {showAddForm && <ProductForm onClose={() => setShowAddForm(false)} />}
      </div>
    </AdminCheck>
  )
}
