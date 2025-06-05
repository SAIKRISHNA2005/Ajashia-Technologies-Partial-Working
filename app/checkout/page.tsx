"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { PaymentMethods } from "@/components/checkout/payment-methods"
import { AuthCheck } from "@/components/auth-check"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"

const checkoutSteps = [
  { title: "Shipping", description: "Enter your address" },
  { title: "Payment", description: "Choose payment method" },
  { title: "Review", description: "Confirm your order" },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const { items } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">No items to checkout</h1>
        <p className="text-muted-foreground">Please add items to your cart before proceeding to checkout.</p>
      </div>
    )
  }

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <Stepper steps={checkoutSteps} currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 0 && "Shipping Information"}
                  {currentStep === 1 && "Payment Method"}
                  {currentStep === 2 && "Order Review"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === 0 && <CheckoutForm onNext={() => setCurrentStep(1)} />}
                {currentStep === 1 && (
                  <PaymentMethods onBack={() => setCurrentStep(0)} onNext={() => setCurrentStep(2)} />
                )}
                {currentStep === 2 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Review Your Order</h3>
                    <p>Order review content will go here...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}
