"use client"

import { useEffect, useState } from "react"
import { ThemeProvider, useTheme } from "next-themes"
import { Toaster } from "sonner"
import { ChatProvider } from "@/contexts/ChatContext"
import Chat from "./chat"

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ChatProvider>
        {children}
        <Chat />
        <ThemedToaster />
      </ChatProvider>
    </ThemeProvider>
  )
}

function ThemedToaster() {
  const { resolvedTheme } = useTheme()

  if (!resolvedTheme) return null

  return (
    <Toaster
      className="mt-12"
      position="top-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  )
}
