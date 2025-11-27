import { NextResponse } from "next/server"

const ESIMACCESS_API_URL = "https://api.esimaccess.com"
const ESIMACCESS_ACCESS_CODE = process.env.ESIMACCESS_ACCESS_CODE
const ESIMACCESS_SECRET_KEY = process.env.ESIMACCESS_SECRET_KEY

export async function GET() {
  try {
    console.log("[eSIM Access Packages] Fetching available packages...")

    if (!ESIMACCESS_ACCESS_CODE || !ESIMACCESS_SECRET_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "eSIM Access API credentials not configured",
        },
        { status: 500 },
      )
    }

    const response = await fetch(`${ESIMACCESS_API_URL}/api/v1/open/package/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "RT-AccessCode": ESIMACCESS_ACCESS_CODE,
        "RT-SecretKey": ESIMACCESS_SECRET_KEY,
      },
      body: JSON.stringify({}),
    })

    const data = await response.json()

    console.log("[eSIM Access Packages] Response:", JSON.stringify(data, null, 2))

    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          error: data.errorMsg || "Failed to fetch packages",
        },
        { status: 400 },
      )
    }

    const packages = data.obj?.packageList || []
    const formatted = packages.map((pkg) => ({
      code: pkg.packageCode || pkg.slug,
      name: pkg.name,
      country: pkg.locationCode,
      data: pkg.dataAmount,
      validity: pkg.periodNum,
      price: pkg.price,
      description: pkg.description,
    }))

    return NextResponse.json({
      success: true,
      count: formatted.length,
      packages: formatted,
    })
  } catch (error) {
    console.error("[eSIM Access Packages] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
