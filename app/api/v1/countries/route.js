import { NextResponse } from "next/server"
import { CountryModel } from "@/lib/models/country"
import { cacheGet, cacheSet } from "@/lib/redis"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get("active") === "true"

    // Create cache key
    const cacheKey = activeOnly ? "countries:active" : "countries:all"

    // Try to get from cache first (TTL: 60 seconds)
    const cached = await cacheGet(cacheKey)
    if (cached) {
      console.log("[Countries API] Cache hit:", cacheKey)
      return NextResponse.json({
        success: true,
        countries: cached,
        count: cached.length,
        cached: true,
      })
    }

    console.log("[Countries API] Cache miss:", cacheKey)

    // Fetch from database
    const countries = activeOnly ? await CountryModel.getActiveCountries() : await CountryModel.findAll()

    // Cache the result for 60 seconds
    await cacheSet(cacheKey, countries, 60)

    return NextResponse.json({
      success: true,
      countries,
      count: countries.length,
      cached: false,
    })
  } catch (error) {
    console.error("[Countries API] Error:", error)
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 })
  }
}
