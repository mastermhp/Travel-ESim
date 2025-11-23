import { NextResponse } from "next/server"
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
    const { name, code, region, active, supported } = body

    if (!name || !code || !region) {
      return NextResponse.json({ error: "Name, code, and region are required" }, { status: 400 })
    }

    // Check if country with this code already exists
    const existing = await CountryModel.findByCode(code)
    if (existing) {
      return NextResponse.json({ error: "Country with this code already exists" }, { status: 400 })
    }

    const country = await CountryModel.create({
      name,
      code: code.toUpperCase(),
      region,
      active,
      supported,
    })

    // Clear countries cache
    await cacheDelete("countries:all")
    await cacheDelete("countries:active")

    return NextResponse.json(
      {
        success: true,
        country,
        message: "Country created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[Admin Country API] Error:", error)
    return NextResponse.json({ error: "Failed to create country" }, { status: 500 })
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

    const countries = await CountryModel.findAll()

    return NextResponse.json({
      success: true,
      countries,
      count: countries.length,
    })
  } catch (error) {
    console.error("[Admin Country API] Error:", error)
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 })
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
      return NextResponse.json({ error: "Country ID is required" }, { status: 400 })
    }

    const updated = await CountryModel.update(id, updateData)

    if (!updated) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 })
    }

    // Clear countries cache
    await cacheDelete("countries:all")
    await cacheDelete("countries:active")

    return NextResponse.json({
      success: true,
      message: "Country updated successfully",
    })
  } catch (error) {
    console.error("[Admin Country API] Error:", error)
    return NextResponse.json({ error: "Failed to update country" }, { status: 500 })
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
      return NextResponse.json({ error: "Country ID is required" }, { status: 400 })
    }

    const deleted = await CountryModel.delete(id)

    if (!deleted) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 })
    }

    // Clear countries cache
    await cacheDelete("countries:all")
    await cacheDelete("countries:active")

    return NextResponse.json({
      success: true,
      message: "Country deleted successfully",
    })
  } catch (error) {
    console.error("[Admin Country API] Error:", error)
    return NextResponse.json({ error: "Failed to delete country" }, { status: 500 })
  }
}
