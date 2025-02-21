"use client"

import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"
import { useTranslation } from "react-i18next"

export function Header() {
  const { t } = useTranslation()

  return (
    <header>
      <div className="container mx-auto">
        <div className="grid grid-cols-12">
          <div className="hidden lg:block lg:col-span-2" />
          <div className="col-span-12 lg:col-span-8">
            <div className="py-6 space-y-4">
              <div className="relative">
                <div className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <ThemeToggle className="h-7 w-7" />
                  <LanguageToggle className="h-7 w-7" />
                </div>
              </div>
              <div className="relative">
                <p className="text-center text-muted-foreground">{t('description')}</p>
              </div>
            </div>
            <div className="border-t border-border" />
          </div>
          <div className="hidden lg:block lg:col-span-2" />
        </div>
      </div>
    </header>
  )
} 