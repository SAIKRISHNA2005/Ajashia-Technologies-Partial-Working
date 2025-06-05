"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, checkUserRole } from "@/lib/auth"

export function AdminCheck({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const user = await getCurrentUser()
      if (!user) {
        router.push("/sign-in")
        return
      }

      const role = await checkUserRole(user.id)
      if (role !== "admin") {
        router.push("/dashboard")
        return
      }

      setIsLoading(false)
    }

    checkAdmin()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
