"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AuthCheck } from "@/components/auth-check"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ReturnsPage() {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState("")
  const [reason, setReason] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      const data = await response.json()
      setOrders(data.filter((order: any) => order.status === "delivered"))
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/returns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: selectedOrder,
          reason,
          description,
        }),
      })

      if (response.ok) {
        alert("Return request submitted successfully!")
        setSelectedOrder("")
        setReason("")
        setDescription("")
      }
    } catch (error) {
      console.error("Error submitting return request:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/orders"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold mb-2">Return & Refund Request</h1>
          <p className="text-muted-foreground">Request a return or refund for your delivered orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Submit Return Request</CardTitle>
              <CardDescription>Fill out the form below to request a return or refund</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="order">Select Order</Label>
                  <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an order" />
                    </SelectTrigger>
                    <SelectContent>
                      {orders.map((order: any) => (
                        <SelectItem key={order.id} value={order.id}>
                          Order #{order.order_number} - ${order.total}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Return</Label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="defective">Defective Product</SelectItem>
                      <SelectItem value="wrong-item">Wrong Item Received</SelectItem>
                      <SelectItem value="not-as-described">Not as Described</SelectItem>
                      <SelectItem value="damaged">Damaged in Shipping</SelectItem>
                      <SelectItem value="changed-mind">Changed Mind</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide details about your return request..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading || !selectedOrder || !reason}>
                  {loading ? "Submitting..." : "Submit Return Request"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Return Policy</CardTitle>
              <CardDescription>Please review our return policy before submitting a request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Return Window</h4>
                <p className="text-sm text-muted-foreground">
                  Items can be returned within 30 days of delivery for a full refund.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Condition Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  Items must be in original condition with all tags and packaging intact.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Processing Time</h4>
                <p className="text-sm text-muted-foreground">
                  Return requests are typically processed within 2-3 business days.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Refund Method</h4>
                <p className="text-sm text-muted-foreground">
                  Refunds will be issued to the original payment method within 5-7 business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthCheck>
  )
}
