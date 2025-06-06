"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { checkUserRole } from "@/lib/auth"

export function AdminCheck({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const { isLoaded, userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (isLoaded && !userId) {
        router.push("/sign-in")
        return
      }

      if (userId) {
        try {
          const role = await checkUserRole(userId)
          if (role === "admin") {
            setIsAdmin(true)
            setIsLoading(false)
          } else {
            router.push("/dashboard")
          }
        } catch (error) {
          console.error("Error checking admin access:", error)
          router.push("/sign-in")
        }
      }
    }

    checkAdminAccess()
  }, [isLoaded, userId, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return <>{children}</>
}
