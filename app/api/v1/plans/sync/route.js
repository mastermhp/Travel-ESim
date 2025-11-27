import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { getAllProviderBundles, normalizeBundleToPlan, PROVIDERS } from "@/lib/provider-manager"
import { verifyAccessToken } from "@/lib/auth"

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = verifyAccessToken(token)

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    console.log("[Plan Sync] 🚀 Starting plan synchronization from providers...")

    await connectDB()
    const db = (await connectDB()).db
    const plansCollection = db.collection("plans")

    console.log("[Plan Sync] 📡 Fetching bundles from providers...")
    const providerBundles = await getAllProviderBundles()

    const syncResults = {
      esimgo: { added: 0, updated: 0, skipped: 0, errors: 0 },
      esimaccess: { added: 0, updated: 0, skipped: 0, errors: 0 },
      total: 0,
    }

    // Sync eSIM-Go bundles
    if (providerBundles.esimgo && providerBundles.esimgo.length > 0) {
      console.log(`[Plan Sync] 🔄 Processing ${providerBundles.esimgo.length} eSIM-Go bundles...`)

      for (const bundle of providerBundles.esimgo) {
        try {
          const planData = normalizeBundleToPlan(bundle, PROVIDERS.ESIMGO)
          if (!planData) {
            syncResults.esimgo.skipped++
            continue
          }

          const existing = await plansCollection.findOne({
            supplierId: PROVIDERS.ESIMGO,
            supplierCode: planData.supplierCode,
          })

          if (existing) {
            await plansCollection.updateOne(
              { _id: existing._id },
              {
                $set: {
                  ...planData,
                  providerSynced: true,
                  lastSyncedAt: new Date(),
                },
              },
            )
            syncResults.esimgo.updated++
            console.log(`[Plan Sync] ✏️ Updated: ${planData.name}`)
          } else {
            await plansCollection.insertOne({
              ...planData,
              providerSynced: true,
              lastSyncedAt: new Date(),
              isCustomPlan: false,
              createdAt: new Date(),
            })
            syncResults.esimgo.added++
            console.log(`[Plan Sync] ➕ Added: ${planData.name}`)
          }
        } catch (error) {
          console.error(`[Plan Sync] ❌ Error processing bundle:`, error.message)
          syncResults.esimgo.errors++
        }
      }
    }

    // Sync eSIM Access packages
    if (providerBundles.esimaccess && providerBundles.esimaccess.length > 0) {
      console.log(`[Plan Sync] 🔄 Processing ${providerBundles.esimaccess.length} eSIM Access packages...`)

      for (const pkg of providerBundles.esimaccess) {
        try {
          const planData = normalizeBundleToPlan(pkg, PROVIDERS.ESIMACCESS)
          if (!planData) {
            syncResults.esimaccess.skipped++
            continue
          }

          const existing = await plansCollection.findOne({
            supplierId: PROVIDERS.ESIMACCESS,
            supplierCode: planData.supplierCode,
          })

          if (existing) {
            await plansCollection.updateOne(
              { _id: existing._id },
              {
                $set: {
                  ...planData,
                  providerSynced: true,
                  lastSyncedAt: new Date(),
                },
              },
            )
            syncResults.esimaccess.updated++
            console.log(`[Plan Sync] ✏️ Updated: ${planData.name}`)
          } else {
            await plansCollection.insertOne({
              ...planData,
              providerSynced: true,
              lastSyncedAt: new Date(),
              isCustomPlan: false,
              createdAt: new Date(),
            })
            syncResults.esimaccess.added++
            console.log(`[Plan Sync] ➕ Added: ${planData.name}`)
          }
        } catch (error) {
          console.error(`[Plan Sync] ❌ Error processing package:`, error.message)
          syncResults.esimaccess.errors++
        }
      }
    }

    syncResults.total =
      syncResults.esimgo.added +
      syncResults.esimgo.updated +
      syncResults.esimaccess.added +
      syncResults.esimaccess.updated

    console.log("[Plan Sync] ✅ Synchronization complete:", syncResults)

    return NextResponse.json({
      success: true,
      message: "Plans synchronized successfully from both providers",
      results: syncResults,
      providers: {
        esimgo: {
          configured: !!process.env.ESIMGO_API_KEY,
          bundlesFound: providerBundles.esimgo?.length || 0,
        },
        esimaccess: {
          configured: !!process.env.ESIMACCESS_ACCESS_CODE,
          packagesFound: providerBundles.esimaccess?.length || 0,
        },
      },
    })
  } catch (error) {
    console.error("[Plan Sync] ❌ Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to sync plans",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
