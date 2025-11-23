import { NextResponse } from "next/server"
import { PlanModel } from "@/lib/models/plan"
import { cacheGet, cacheSet } from "@/lib/redis"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const minData = searchParams.get("minData")
    const maxData = searchParams.get("maxData")

    // Create cache key based on query params
    const cacheKey = country
      ? `plans:${country.toUpperCase()}`
      : `plans:all${minPrice ? `:min${minPrice}` : ""}${maxPrice ? `:max${maxPrice}` : ""}`

    // Try to get from cache first (TTL: 60 seconds)
    const cached = await cacheGet(cacheKey)
    if (cached) {
      console.log("[Plans API] Cache hit:", cacheKey)
      return NextResponse.json({
        success: true,
        plans: cached,
        count: cached.length,
        cached: true,
      })
    }

    console.log("[Plans API] Cache miss:", cacheKey)

    // Fetch from database
    let plans

    if (country) {
      plans = await PlanModel.findByCountry(country)
    } else if (minPrice || maxPrice || minData || maxData) {
      plans = await PlanModel.searchPlans({
        minPrice,
        maxPrice,
        minData,
        maxData,
      })
    } else {
      plans = await PlanModel.findAll({ active: true })
    }

    // Cache the result for 60 seconds
    await cacheSet(cacheKey, plans, 60)

    return NextResponse.json({
      success: true,
      plans,
      count: plans.length,
      cached: false,
    })
  } catch (error) {
    console.error("[Plans API] Error:", error)
    return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 })
  }
}
