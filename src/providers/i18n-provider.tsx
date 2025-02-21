"use client"

import { PropsWithChildren, useEffect, useState } from "react"

export function I18nProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // 或者返回一个加载状态
  }

  return <>{children}</>
} 