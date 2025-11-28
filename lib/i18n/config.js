export const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", rtl: false },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", rtl: true },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", rtl: false },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", rtl: false },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹", rtl: false },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", rtl: false },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪", rtl: false },
  { code: "am", name: "Amharic", nativeName: "አማርኛ", flag: "🇪🇹", rtl: false },
  { code: "ti", name: "Tigrinya", nativeName: "ትግርኛ", flag: "🇪🇷", rtl: false },
  { code: "om", name: "Oromo", nativeName: "Afaan Oromoo", flag: "🇪🇹", rtl: false },
  { code: "so", name: "Somali", nativeName: "Soomaali", flag: "🇸🇴", rtl: false },
]

export const DEFAULT_LANGUAGE = "en"

// Detect language from browser
export function detectBrowserLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE

  const browserLang = navigator.language.split("-")[0]
  const supported = LANGUAGES.find((l) => l.code === browserLang)
  return supported ? browserLang : DEFAULT_LANGUAGE
}

// Get RTL direction
export function isRTL(languageCode) {
  const lang = LANGUAGES.find((l) => l.code === languageCode)
  return lang?.rtl || false
}
