import { NextResponse } from "next/server"
import { getESIMGoBalance, getESIMGoBundles, validateESIMGoOrder } from "@/lib/esimgo"

export async function GET(request) {
  try {
    console.log("[Diagnostics] Checking eSIM-Go account status...")

    // Check if API key is set
    if (!process.env.ESIMGO_API_KEY) {
      return NextResponse.json({
        success: false,
        error: "ESIMGO_API_KEY not configured in environment variables",
      })
    }

    // Get account balance
    const balanceResult = await getESIMGoBalance()

    // Get available bundles
    const bundlesResult = await getESIMGoBundles()

    // Validate a test bundle (SUP-USA-3GB)
    const validationResult = await validateESIMGoOrder("SUP-USA-3GB")

    return NextResponse.json({
      success: true,
      apiKeyConfigured: true,
      balance: balanceResult,
      bundles: bundlesResult,
      testValidation: validationResult,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[Diagnostics] Error:", error.message)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
