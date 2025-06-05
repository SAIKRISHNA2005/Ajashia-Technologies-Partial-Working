"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@clerk/nextjs"
import { Calendar, Star } from "lucide-react"

export function ProfileStats() {
  const { user } = useUser()

  const stats = [
    { label: "Orders", value: "12" },
    { label: "Reviews", value: "8" },
    { label: "Wishlist", value: "15" },
  ]

  return (
    <Card>
      <CardHeader className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src={user?.imageUrl || "/placeholder.svg"} />
          <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <CardTitle>
          {user?.firstName} {user?.lastName}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{user?.emailAddresses[0]?.emailAddress}</p>
        <Badge variant="secondary">Customer</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Member since {new Date(user?.createdAt || Date.now()).getFullYear()}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-muted-foreground" />
            <span>4.8 average rating</span>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
