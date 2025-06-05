"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Smartphone, DollarSign } from "lucide-react"

interface PaymentMethodsProps {
  onBack: () => void
  onNext: () => void
}

export function PaymentMethods({ onBack, onNext }: PaymentMethodsProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="space-y-3">
            <Card className={paymentMethod === "card" ? "ring-2 ring-primary" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-5 w-5" />
                    Credit/Debit Card
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card className={paymentMethod === "paypal" ? "ring-2 ring-primary" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="h-5 w-5" />
                    PayPal
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card className={paymentMethod === "apple" ? "ring-2 ring-primary" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="apple" id="apple" />
                  <Label htmlFor="apple" className="flex items-center gap-2 cursor-pointer">
                    <DollarSign className="h-5 w-5" />
                    Apple Pay
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </RadioGroup>
      </div>

      {paymentMethod === "card" && (
        <div className="space-y-4">
          <h4 className="font-semibold">Card Information</h4>

          <div>
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              required
              value={cardData.name}
              onChange={(e) => setCardData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
              value={cardData.number}
              onChange={(e) => setCardData((prev) => ({ ...prev, number: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                required
                value={cardData.expiry}
                onChange={(e) => setCardData((prev) => ({ ...prev, expiry: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                required
                value={cardData.cvv}
                onChange={(e) => setCardData((prev) => ({ ...prev, cvv: e.target.value }))}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back to Shipping
        </Button>
        <Button type="submit" className="flex-1">
          Review Order
        </Button>
      </div>
    </form>
  )
}
