import type React from "react"
import { MainNav } from "@/components/main-nav"
import { SiteLogo } from "@/components/site-logo"
import { cn } from "@/lib/utils"
import { Cart } from "@/components/cart"
import { ThemeToggle } from "@/components/theme-toggle"

interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ className, ...props }) => {
  return (
    <header className={cn("sticky top-0 z-40 w-full border-b bg-background", className)} {...props}>
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <SiteLogo />
        <MainNav className="mx-6 hidden md:block" />
        <div className="flex items-center space-x-2">
          <Cart />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
