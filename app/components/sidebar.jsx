"use client"

import { usePathname } from "next/navigation"
import { CloudSun, Map, Settings, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

const menus = [
  { href: "/weather", label: "Weather", icon: CloudSun },
  { href: "/cities", label: "Cities", icon: Building2 },
  { href: "/map", label: "Map", icon: Map },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex p-4 h-screen">
        <aside className="h-full w-20 bg-sidebar text-foreground flex flex-col items-center py-3 rounded-xl">
          {/* Logo */}
          <div className="text-xl font-bold mb-7">
            <img src="/logo.png" alt="Logo" width={50} />
          </div>

          {/* Menu */}
          <TooltipProvider>
            <nav className="flex flex-col items-center gap-5">
              {menus.map(({ href, label, icon: Icon }) => {
                const isActive = pathname.startsWith(href)
                return (
                  <Tooltip key={href}>
                    <TooltipTrigger asChild>
                      <Link href={href}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${
                            isActive
                              ? "text-white bg-slate-800"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{label}</TooltipContent>
                  </Tooltip>
                )
              })}
            </nav>
          </TooltipProvider>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div className="text-xs text-slate-500">v1.0</div>
        </aside>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-sidebar text-foreground flex justify-around items-center py-2 px-4 shadow-lg rounded-t-xl md:hidden z-50">
        {menus.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1">
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              />
              <span className="text-[10px]">{label}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
