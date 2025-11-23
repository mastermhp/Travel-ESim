import { NextResponse } from "next/server"
import { PlanModel } from "@/lib/models/plan"
import { CountryModel } from "@/lib/models/country"
import { verifyToken } from "@/lib/auth"
import { cacheDelete } from "@/lib/redis"

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const {
      country,
      name,
      dataGB,
      validityDays,
      price,
      currency,
      costPrice,
      supplierId,
      supplierCode,
      isUnlimited,
      fairUseLimitGB,
      active,
    } = body

    if (!country || !name || !validityDays || !price || !currency) {
      return NextResponse.json({ error: "Country, name, validity, price, and currency are required" }, { status: 400 })
    }

    // Verify country exists
    const countryExists = await CountryModel.findByCode(country)
    if (!countryExists) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 })
    }

    const plan = await PlanModel.create({
      country: country.toUpperCase(),
      name,
      dataGB: isUnlimited ? null : dataGB,
      validityDays,
      price: Number.parseFloat(price),
      currency: currency.toUpperCase(),
      costPrice: costPrice ? Number.parseFloat(costPrice) : null,
      supplierId,
      supplierCode,
      isUnlimited: isUnlimited || false,
      fairUseLimitGB: fairUseLimitGB || null,
      active,
      salesCount: 0,
    })

    // Clear plans cache for this country
    await cacheDelete(`plans:${country.toUpperCase()}`)
    await cacheDelete("plans:all")

    return NextResponse.json(
      {
        success: true,
        plan,
        message: "Plan created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[Admin Plan API] Error:", error)
    return NextResponse.json({ error: "Failed to create plan" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")

    const plans = country ? await PlanModel.findByCountry(country) : await PlanModel.findAll()

    return NextResponse.json({
      success: true,
      plans,
      count: plans.length,
    })
  } catch (error) {
    console.error("[Admin Plan API] Error:", error)
    return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 })
    }

    // Get the plan to clear country-specific cache
    const plan = await PlanModel.findById(id)

    const updated = await PlanModel.update(id, updateData)

    if (!updated) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 })
    }

    // Clear plans cache
    if (plan) {
      await cacheDelete(`plans:${plan.country}`)
    }
    await cacheDelete("plans:all")

    return NextResponse.json({
      success: true,
      message: "Plan updated successfully",
    })
  } catch (error) {
    console.error("[Admin Plan API] Error:", error)
    return NextResponse.json({ error: "Failed to update plan" }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization required" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 })
    }

    // Get the plan to clear country-specific cache
    const plan = await PlanModel.findById(id)

    const deleted = await PlanModel.delete(id)

    if (!deleted) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 })
    }

    // Clear plans cache
    if (plan) {
      await cacheDelete(`plans:${plan.country}`)
    }
    await cacheDelete("plans:all")

    return NextResponse.json({
      success: true,
      message: "Plan deleted successfully",
    })
  } catch (error) {
    console.error("[Admin Plan API] Error:", error)
    return NextResponse.json({ error: "Failed to delete plan" }, { status: 500 })
  }
}
