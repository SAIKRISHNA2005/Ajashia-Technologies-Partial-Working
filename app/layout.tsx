import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartProvider } from "@/components/cart-provider"
import { WishlistProvider } from "@/components/wishlist-provider"
import { ComparisonProvider } from "@/components/comparison-provider"
import { NotificationProvider } from "@/components/notification-provider"
import { LiveChat } from "@/components/support/live-chat"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ajashia Electronics - Premium Electronic Components & Kits",
  description:
    "Discover high-quality electronic components, Arduino boards, sensors, and development kits for makers, engineers, and hobbyists.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <CartProvider>
              <WishlistProvider>
                <ComparisonProvider>
                  <NotificationProvider>
                    <div className="relative flex min-h-screen flex-col">
                      <SiteHeader />
                      <main className="flex-1">{children}</main>
                      <SiteFooter />
                    </div>
                    <LiveChat />
                    <Toaster />
                  </NotificationProvider>
                </ComparisonProvider>
              </WishlistProvider>
            </CartProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
