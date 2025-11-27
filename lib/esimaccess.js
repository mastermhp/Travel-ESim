import axios from "axios"
import { Buffer } from "buffer"

const ESIMACCESS_API_URL = "https://api.esimaccess.com/api/v1"
const ESIMACCESS_ACCESS_CODE = process.env.ESIMACCESS_ACCESS_CODE
const ESIMACCESS_SECRET_KEY = process.env.ESIMACCESS_SECRET_KEY

const esimAccessClient = axios.create({
  baseURL: ESIMACCESS_API_URL,
  headers: {
    "RT-AccessCode": ESIMACCESS_ACCESS_CODE,
    "Content-Type": "application/json",
  },
  timeout: 30000,
})

/**
 * Provision eSIM using eSIM Access API
 * @param {Object} order - Order object with plan details
 * @returns {Object} Provisioning result with ICCID, QR code, and activation details
 */
export async function provisionESIMAccess(order) {
  console.log("\n[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("[eSIM Access] 🚀 Starting eSIM provisioning")
  console.log("[eSIM Access] 📦 Order ID:", order.orderId)
  console.log("[eSIM Access] 🔑 AccessCode:", ESIMACCESS_ACCESS_CODE ? "SET ✅" : "MISSING ❌")
  console.log("[eSIM Access] 🔐 SecretKey:", ESIMACCESS_SECRET_KEY ? "SET ✅" : "MISSING ❌")
  console.log("[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

  try {
    if (!ESIMACCESS_ACCESS_CODE) {
      throw new Error("eSIM Access Access Code not configured")
    }

    const packageCode = order.supplierCode || order.packageCode
    if (!packageCode) {
      throw new Error("Package code not found in order")
    }

    // Step 1: Fetch current package price from provider to avoid price expired error
    console.log("[eSIM Access] 📋 Step 1: Fetching current package details...")

    const packageListResponse = await esimAccessClient.post("/open/package/list", {
      packageCode: packageCode,
    })

    if (!packageListResponse.data.success || !packageListResponse.data.obj?.packageList?.length) {
      throw new Error(`Package ${packageCode} not found in provider catalog`)
    }

    const packageDetails = packageListResponse.data.obj.packageList[0]
    const currentPrice = packageDetails.price || 10000

    console.log("[eSIM Access] 💰 Provider's current price:", currentPrice)
    console.log("[eSIM Access] 📦 Package name:", packageDetails.name)
    console.log("[eSIM Access] 🌍 Location:", packageDetails.locationCode)

    // Step 2: Place order with provider's current price
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log("[eSIM Access] 📋 Step 2: Placing order...")
    console.log("[eSIM Access] 📋 Package Code:", packageCode)
    console.log("[eSIM Access] 🆔 Transaction ID:", transactionId)
    console.log("[eSIM Access] 📡 Calling API: POST /open/esim/order")

    const requestBody = {
      transactionId: transactionId,
      amount: currentPrice, // Use provider's current price instead of hardcoded value
      packageInfoList: [
        {
          packageCode: packageCode,
          count: 1,
          price: currentPrice, // Use provider's current price instead of hardcoded value
        },
      ],
    }

    console.log("[eSIM Access] 📤 Request:", JSON.stringify(requestBody, null, 2))

    const orderResponse = await esimAccessClient.post("/open/esim/order", requestBody)

    console.log("[eSIM Access] 📥 Response Status:", orderResponse.status)
    console.log("[eSIM Access] 📥 Response Data:", JSON.stringify(orderResponse.data, null, 2))

    if (!orderResponse.data || !orderResponse.data.success) {
      throw new Error(orderResponse.data?.errorMsg || "Failed to provision eSIM")
    }

    const { orderNo, transactionId: txnId } = orderResponse.data.obj || {}

    if (!orderNo) {
      throw new Error("eSIM Access did not return order number")
    }

    console.log("[eSIM Access] 📦 Order Number:", orderNo)
    console.log("[eSIM Access] 🔍 Querying allocated profiles...")

    await new Promise((resolve) => setTimeout(resolve, 3000))

    const profileResponse = await esimAccessClient.post("/open/esim/query", {
      orderNo: orderNo,
      pager: {
        pageNum: 1,
        pageSize: 20,
      },
    })

    console.log("[eSIM Access] 📥 Profile Response:", JSON.stringify(profileResponse.data, null, 2))

    const profiles = profileResponse.data.obj?.esimList || []

    if (profiles.length === 0) {
      console.log("[eSIM Access] ⚠️ No profiles allocated yet")
      return {
        success: true,
        orderNo,
        transactionId: txnId,
        status: "processing",
        message: "Order placed successfully, eSIM will be ready in 1-2 minutes",
      }
    }

    const profile = profiles[0]
    const { iccid, qrCodeUrl, acValue, rspUrl, smdpAddress, matchingId, confirmationCode } = profile

    if (!iccid) {
      throw new Error("eSIM Access did not return ICCID")
    }

    let activationCode = acValue || rspUrl

    // If no acValue or rspUrl, try to construct from SM-DP+ details
    if (!activationCode && smdpAddress) {
      activationCode = smdpAddress
      if (matchingId) {
        activationCode += `\nMatching ID: ${matchingId}`
      }
      if (confirmationCode) {
        activationCode += `\nConfirmation Code: ${confirmationCode}`
      }
    }

    console.log("\n[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("[eSIM Access] ✅ PROVISIONING SUCCESSFUL!")
    console.log("[eSIM Access] 📱 ICCID:", iccid)
    console.log("[eSIM Access] 📦 Order No:", orderNo)
    console.log("[eSIM Access] 🎨 QR Code URL:", qrCodeUrl ? "Available ✅" : "Not Available ❌")
    console.log("[eSIM Access] 🔑 Activation Code:", activationCode ? "Available ✅" : "Not Available ❌")
    if (activationCode) {
      console.log("[eSIM Access] 🔑 Full Activation Details:", activationCode)
    }
    console.log("[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

    let qrImageBuffer = null
    if (qrCodeUrl) {
      try {
        const qrResponse = await axios.get(qrCodeUrl, { responseType: "arraybuffer" })
        qrImageBuffer = Buffer.from(qrResponse.data, "binary")
        console.log("[eSIM Access] ✅ QR code image downloaded")
      } catch (error) {
        console.warn("[eSIM Access] ⚠️ Failed to download QR code:", error.message)
      }
    }

    return {
      success: true,
      iccid: iccid,
      activationCode: activationCode,
      qrImageBuffer: qrImageBuffer,
      qrUrl: qrCodeUrl,
      status: "active",
      orderNo: orderNo,
      rawResponse: {
        esimData: profile,
        packageCode: packageCode,
        provisionedAt: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.log("\n[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("[eSIM Access] ❌ PROVISIONING FAILED!")
    console.log("[eSIM Access] Error:", error.message)

    if (error.response) {
      console.log("[eSIM Access] API Response Status:", error.response.status)
      console.log("[eSIM Access] API Response Data:", JSON.stringify(error.response.data, null, 2))

      if (error.response.status === 402) {
        console.log("[eSIM Access] 💳 INSUFFICIENT BALANCE - Please top up your account")
        console.log("[eSIM Access] 🌐 Top up at: https://console.esimaccess.com")
      } else if (error.response.status === 404) {
        console.log("[eSIM Access] 📦 PACKAGE NOT FOUND - Check package code")
      } else if (error.response.status === 401) {
        console.log("[eSIM Access] 🔑 AUTHENTICATION FAILED - Check API credentials")
      }
    }
    console.log("[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

    return {
      success: false,
      error: error.response?.data?.errorMsg || error.message,
      errorDetails: error.response?.data,
    }
  }
}

/**
 * Get account balance
 * @returns {Object} Balance information
 */
export async function getESIMAccessBalance() {
  try {
    const response = await esimAccessClient.get("/balance")
    return {
      success: true,
      balance: response.data.balance,
      currency: response.data.currency || "USD",
    }
  } catch (error) {
    console.error("[eSIM Access] Failed to get balance:", error.message)
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Get available packages/bundles from eSIM Access
 * @returns {Array} List of available packages
 */
export async function getESIMAccessPackages() {
  try {
    console.log("[eSIM Access] 📋 Fetching packages list...")

    const response = await esimAccessClient.post("/open/package/list", {
      locationCode: "", // Empty string for all locations
      type: "", // Empty for all types
      slug: "",
      packageCode: "",
      iccid: "",
    })

    console.log("[eSIM Access] ✅ Packages fetched:", response.data?.obj?.packageList?.length || 0)

    if (!response.data || !response.data.success) {
      throw new Error(response.data?.errorMsg || "Failed to fetch packages")
    }

    return {
      success: true,
      packages: response.data.obj?.packageList || [],
    }
  } catch (error) {
    console.error("[eSIM Access] ❌ Failed to get packages:", error.message)
    if (error.response) {
      console.error("[eSIM Access] API Error:", {
        status: error.response.status,
        data: error.response.data,
      })
    }
    return {
      success: false,
      error: error.message,
      packages: [],
    }
  }
}

/**
 * Get order details
 * @param {string} orderNo - Order number
 * @returns {Object} Order details
 */
export async function getESIMAccessOrderDetails(orderNo) {
  try {
    const response = await esimAccessClient.get(`/order/${orderNo}`)
    return {
      success: true,
      order: response.data,
    }
  } catch (error) {
    console.error("[eSIM Access] Failed to get order details:", error.message)
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Top up an existing eSIM
 * @param {string} iccid - eSIM ICCID
 * @param {string} packageCode - Package code for top-up
 * @returns {Object} Top-up result
 */
export async function topUpESIMAccess(iccid, packageCode) {
  try {
    const response = await esimAccessClient.post("/topup", {
      iccid: iccid,
      packageCode: packageCode,
    })

    return {
      success: true,
      orderNo: response.data.orderNo,
      data: response.data,
    }
  } catch (error) {
    console.error("[eSIM Access] Top-up failed:", error.message)
    return {
      success: false,
      error: error.message,
    }
  }
}

export default {
  provisionESIMAccess,
  getESIMAccessBalance,
  getESIMAccessPackages,
  getESIMAccessOrderDetails,
  topUpESIMAccess,
}
