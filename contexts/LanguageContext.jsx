"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { translations } from "@/lib/i18n/translations"
import { DEFAULT_LANGUAGE, detectBrowserLanguage, isRTL, LANGUAGES } from "@/lib/i18n/config"

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE)
  const [enabledLanguages, setEnabledLanguages] = useState(LANGUAGES.map((l) => l.code))
  const [isLoading, setIsLoading] = useState(true)

  // Load enabled languages from API and detect browser language
  useEffect(() => {
    const initLanguage = async () => {
      try {
        // Fetch enabled languages from admin settings
        const response = await fetch("/api/v1/settings/languages")
        if (response.ok) {
          const data = await response.json()
          if (data.enabled && data.enabled.length > 0) {
            setEnabledLanguages(data.enabled)
          }
        }

        // Check localStorage first
        const savedLang = localStorage.getItem("language")
        if (savedLang && translations[savedLang]) {
          setLanguage(savedLang)
        } else {
          // Auto-detect from browser
          const detected = detectBrowserLanguage()
          setLanguage(detected)
          localStorage.setItem("language", detected)
        }
      } catch (error) {
        console.error("[v0] Failed to load language settings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initLanguage()
  }, [])

  // Update HTML lang and dir attributes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
      document.documentElement.dir = isRTL(language) ? "rtl" : "ltr"
    }
  }, [language])

  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLanguage(newLang)
      localStorage.setItem("language", newLang)
    }
  }

  const t = (key) => {
    const keys = key.split(".")
    let value = translations[language]

    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }

    // Fallback to English if translation not found
    if (value === undefined) {
      value = translations[DEFAULT_LANGUAGE]
      for (const k of keys) {
        value = value?.[k]
        if (value === undefined) break
      }
    }

    return value || key
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
        isRTL: isRTL(language),
        enabledLanguages,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
