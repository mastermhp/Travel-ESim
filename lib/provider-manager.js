import { provisionESIMGo, getESIMGoBundles } from "./esimgo.js"
import { provisionESIMAccess, getESIMAccessPackages } from "./esimaccess.js"

const PROVIDERS = {
  ESIMGO: "esimgo",
  ESIMACCESS: "esimaccess",
}

const PROVIDER_NAME_MAP = {
  esimgo: "esimgo",
  "esim-go": "esimgo",
  esim_go: "esimgo",
  ESIMGO: "esimgo",
  "ESIM-GO": "esimgo",
  ESIM_GO: "esimgo",

  esimaccess: "esimaccess",
  "esim-access": "esimaccess",
  esim_access: "esimaccess",
  ESIMACCESS: "esimaccess",
  "ESIM-ACCESS": "esimaccess",
  ESIM_ACCESS: "esimaccess",

  // Legacy supplier names
  SUPPLIER_US: "esimgo",
  SUPPLIER_EU: "esimgo",
  SUPPLIER_ASIA: "esimgo",
  SUPPLIER_GLOBAL: "esimaccess",
}

/**
 * Normalize provider name to standard format
 */
function normalizeProviderName(providerName) {
  if (!providerName) {
    console.log("[Provider Manager] ⚠️ No provider name specified, defaulting to esimgo")
    return "esimgo"
  }

  const normalized = PROVIDER_NAME_MAP[providerName] || providerName.toLowerCase()
  console.log(`[Provider Manager] 🔄 Normalized provider: ${providerName} → ${normalized}`)
  return normalized
}

/**
 * Provision eSIM using the specified provider with automatic fallback
 * @param {Object} order - Order object with plan details
 * @param {string} primaryProvider - Primary provider to use
 * @param {string} fallbackProvider - Fallback provider if primary fails
 * @returns {Object} Provisioning result
 */
export async function provisionWithFallback(order, primaryProvider, fallbackProvider = null) {
  console.log(`[Provider Manager] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`[Provider Manager] 🚀 Starting provisioning for order: ${order.orderId}`)
  console.log(`[Provider Manager] 📦 Primary provider: ${primaryProvider}`)
  console.log(`[Provider Manager] 🔄 Fallback provider: ${fallbackProvider || "none"}`)
  console.log(`[Provider Manager] 📋 Bundle/Package code: ${order.plan?.supplierCode || order.plan?.bundleCode}`)
  console.log(`[Provider Manager] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

  // Normalize provider names
  const normalizedPrimary = normalizeProviderName(primaryProvider)
  const normalizedFallback = fallbackProvider ? normalizeProviderName(fallbackProvider) : null

  // Try primary provider
  console.log(`[Provider Manager] 🎯 Attempting provisioning with primary: ${normalizedPrimary}`)
  let result = await provisionESIM(order, normalizedPrimary)

  console.log(`[Provider Manager] 📊 Primary provider result:`, {
    success: result.success,
    provider: result.provider,
    error: result.error || "none",
    hasQR: result.hasQR || false,
    hasActivationCode: result.hasActivationCode || false,
  })

  // If primary fails and fallback is available, try fallback
  if (!result.success && normalizedFallback) {
    console.log(`[Provider Manager] ⚠️ Primary provider failed, trying fallback: ${normalizedFallback}`)
    result = await provisionESIM(order, normalizedFallback)

    console.log(`[Provider Manager] 📊 Fallback provider result:`, {
      success: result.success,
      provider: result.provider,
      error: result.error || "none",
      hasQR: result.hasQR || false,
      hasActivationCode: result.hasActivationCode || false,
    })

    if (result.success) {
      result.usedFallback = true
      result.provider = normalizedFallback
      console.log(`[Provider Manager] ✅ Fallback provider succeeded!`)
    } else {
      console.log(`[Provider Manager] ❌ Both providers failed`)
    }
  } else if (result.success) {
    result.provider = normalizedPrimary
    result.usedFallback = false
    console.log(`[Provider Manager] ✅ Primary provider succeeded!`)
  } else {
    console.log(`[Provider Manager] ❌ Primary provider failed and no fallback available`)
  }

  console.log(`[Provider Manager] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  return result
}

/**
 * Provision eSIM using a specific provider
 * @param {Object} order - Order object
 * @param {string} provider - Provider name (esimgo, esimaccess)
 * @returns {Object} Provisioning result
 */
export async function provisionESIM(order, provider) {
  const normalizedProvider = normalizeProviderName(provider)

  console.log(`[Provider Manager] 🔌 Connecting to provider: ${normalizedProvider}`)

  try {
    let result

    switch (normalizedProvider) {
      case PROVIDERS.ESIMGO:
        console.log(`[Provider Manager] 📡 Calling eSIM-Go API...`)
        result = await provisionESIMGo(order)
        break

      case PROVIDERS.ESIMACCESS:
        console.log(`[Provider Manager] 📡 Calling eSIM Access API...`)
        result = await provisionESIMAccess(order)
        break

      default:
        console.log(`[Provider Manager] ❌ Unknown provider after normalization: ${normalizedProvider}`)
        return {
          success: false,
          error: `Unknown provider: ${provider} (normalized: ${normalizedProvider})`,
          provider: normalizedProvider,
        }
    }

    console.log(`[Provider Manager] 📥 Provider response received:`, {
      success: result.success,
      hasQR: !!result.qrUrl || !!result.qrCode,
      hasActivation: !!result.activationCode,
      error: result.error || "none",
    })

    return result
  } catch (error) {
    console.error(`[Provider Manager] 💥 Exception during provisioning:`, error)
    return {
      success: false,
      error: error.message || "Provisioning exception",
      provider: normalizedProvider,
      exception: error.toString(),
    }
  }
}

/**
 * Get all bundles/packages from all providers
 * @returns {Object} Bundles from all providers
 */
export async function getAllProviderBundles() {
  console.log("[Provider Manager] 🔄 Fetching bundles from all providers...")

  const results = {
    esimgo: [],
    esimaccess: [],
  }

  // Fetch eSIM-Go bundles
  try {
    if (process.env.ESIMGO_API_KEY) {
      console.log("[Provider Manager] 📡 Fetching eSIM-Go bundles...")
      const esimgoResult = await getESIMGoBundles()
      if (esimgoResult.success) {
        results.esimgo = esimgoResult.bundles
        console.log(`[Provider Manager] ✅ eSIM-Go: ${results.esimgo.length} bundles fetched`)
      }
    } else {
      console.log("[Provider Manager] ⚠️ eSIM-Go API key not configured, skipping")
    }
  } catch (error) {
    console.error("[Provider Manager] ❌ eSIM-Go fetch failed:", error.message)
  }

  // Fetch eSIM Access packages
  try {
    if (process.env.ESIMACCESS_ACCESS_CODE) {
      console.log("[Provider Manager] 📡 Fetching eSIM Access packages...")
      const esimAccessResult = await getESIMAccessPackages()
      if (esimAccessResult.success) {
        results.esimaccess = esimAccessResult.packages
        console.log(`[Provider Manager] ✅ eSIM Access: ${results.esimaccess.length} packages fetched`)
      }
    } else {
      console.log("[Provider Manager] ⚠️ eSIM Access API key not configured, skipping")
    }
  } catch (error) {
    console.error("[Provider Manager] ❌ eSIM Access fetch failed:", error.message)
  }

  console.log(`[Provider Manager] 🎯 Total bundles: ${results.esimgo.length + results.esimaccess.length}`)

  return results
}

/**
 * Normalize provider bundle data to common format
 * @param {Object} bundle - Provider-specific bundle data
 * @param {string} provider - Provider name
 * @returns {Object} Normalized plan data
 */
export function normalizeBundleToPlan(bundle, provider) {
  try {
    if (provider === PROVIDERS.ESIMGO) {
      // eSIM-Go bundle structure from their API
      return {
        name: bundle.name || bundle.description,
        countryCode: extractCountryCode(bundle.regions || bundle.countries),
        country: bundle.name?.split(" ")[0] || "International",
        data: convertToGB(bundle.dataLimitInBytes),
        validity: bundle.validityInDays || 7,
        price: Number.parseFloat((bundle.pricePerUnit / 100).toFixed(2)),
        currency: "USD",
        supplierId: PROVIDERS.ESIMGO,
        supplierCode: bundle.name,
        fallbackSupplierId: PROVIDERS.ESIMACCESS,
        isActive: true,
        providerData: bundle,
      }
    } else if (provider === PROVIDERS.ESIMACCESS) {
      // eSIM Access package structure from their API
      const dataGB = convertBytesToGB(bundle.volume)
      const countries = bundle.location?.split(",") || []

      return {
        name: bundle.name,
        countryCode: countries[0] || "GL",
        country: extractCountryName(bundle.name),
        data: dataGB,
        validity: bundle.duration || 7,
        price: Number.parseFloat((bundle.price / 100000).toFixed(2)),
        currency: bundle.currencyCode || "USD",
        supplierId: PROVIDERS.ESIMACCESS,
        supplierCode: bundle.packageCode,
        slug: bundle.slug,
        fallbackSupplierId: PROVIDERS.ESIMGO,
        isActive: true,
        providerData: bundle,
      }
    }
  } catch (error) {
    console.error("[Provider Manager] ❌ Failed to normalize bundle:", error.message)
    return null
  }
}

function extractCountryCode(regions) {
  if (Array.isArray(regions) && regions.length > 0) {
    return regions[0]
  }
  if (typeof regions === "string") {
    return regions.split(",")[0]
  }
  return "GL"
}

function extractCountryName(name) {
  const match = name.match(/^([A-Za-z\s]+)/)
  return match ? match[1].trim() : "International"
}

function convertToGB(bytes) {
  if (!bytes) return 1
  return Number.parseFloat((bytes / (1024 * 1024 * 1024)).toFixed(2))
}

function convertBytesToGB(bytes) {
  if (!bytes) return 1
  return Number.parseFloat((bytes / (1024 * 1024 * 1024)).toFixed(2))
}

export { PROVIDERS }

export default {
  provisionWithFallback,
  provisionESIM,
  getAllProviderBundles,
  normalizeBundleToPlan,
  PROVIDERS,
}
