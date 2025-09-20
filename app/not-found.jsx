"use client"

import { Wrench } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center">
      <div className="flex flex-col items-center gap-6 max-w-md">
        <div className="p-4 rounded-full bg-muted">
          <Wrench className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">We’ll be back soon!</h1>
        <p className="text-muted-foreground">
          Our website is currently undergoing maintenance.  
          Please check back later.
        </p>
        <div className="mt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cenanyang Cuaca. All rights reserved.
        </div>
      </div>
    </div>
  )
}