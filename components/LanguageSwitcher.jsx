"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LANGUAGES } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, changeLanguage, enabledLanguages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = LANGUAGES.find((l) => l.code === language)
  const availableLanguages = LANGUAGES.filter((lang) => enabledLanguages.includes(lang.code))

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang?.nativeName}</span>
          <span className="sm:hidden">{currentLang?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              changeLanguage(lang.code)
              setIsOpen(false)
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="flex-1">{lang.nativeName}</span>
            {language === lang.code && <span className="text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
