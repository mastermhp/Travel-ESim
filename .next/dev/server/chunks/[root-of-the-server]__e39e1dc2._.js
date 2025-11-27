module.exports = [
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/Downloads/travel-e-sim-system/lib/esimgo.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkBundleStatus",
    ()=>checkBundleStatus,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getESIMGoBalance",
    ()=>getESIMGoBalance,
    "getESIMGoBundles",
    ()=>getESIMGoBundles,
    "provisionESIMGo",
    ()=>provisionESIMGo,
    "validateESIMGoOrder",
    ()=>validateESIMGoOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
;
const ESIMGO_API_URL = "https://api.esim-go.com/v2.5";
const ESIMGO_API_KEY = process.env.ESIMGO_API_KEY;
const esimgoClient = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ESIMGO_API_URL,
    headers: {
        "X-API-Key": ESIMGO_API_KEY,
        "Content-Type": "application/json"
    },
    timeout: 30000
});
async function provisionESIMGo(order) {
    try {
        if (!ESIMGO_API_KEY) {
            throw new Error("eSIM-Go API key not configured");
        }
        console.log("[eSIM-Go] Provisioning eSIM for order:", order.orderId);
        // Get the bundle name from order metadata or plan
        const bundleName = order.supplierCode || order.bundleName;
        if (!bundleName) {
            throw new Error("Bundle name not found in order");
        }
        console.log("[eSIM-Go] Using bundle:", bundleName);
        // Step 1: Apply bundle to get a new eSIM
        const applyResponse = await esimgoClient.post("/esims/apply", {
            name: bundleName,
            allowReassign: true
        });
        console.log("[eSIM-Go] Apply response:", applyResponse.data);
        const esimData = applyResponse.data.esims?.[0];
        if (!esimData || !esimData.iccid) {
            throw new Error("eSIM-Go did not return ICCID");
        }
        const { iccid, status } = esimData;
        const applyReference = applyResponse.data.applyReference;
        console.log("[eSIM-Go] eSIM assigned - ICCID:", iccid, "Status:", status);
        // Step 2: Get eSIM details including activation code
        const esimDetailsResponse = await esimgoClient.get(`/esims/${iccid}`);
        const esimDetails = esimDetailsResponse.data;
        console.log("[eSIM-Go] eSIM details retrieved");
        // Step 3: Get QR code for installation
        // eSIM-Go provides QR code via /esims/{iccid}/qrcode endpoint
        const qrCodeResponse = await esimgoClient.get(`/esims/${iccid}/qrcode`, {
            responseType: "arraybuffer"
        });
        const qrImageBuffer = Buffer.from(qrCodeResponse.data, "binary");
        // Extract activation code from eSIM details
        // Format: LPA:1$SMDP_ADDRESS$MATCHING_ID
        const activationCode = esimDetails.lpaString || `LPA:1$${esimDetails.smdpAddress}$${esimDetails.matchingId}`;
        console.log("[eSIM-Go] QR code and activation details retrieved");
        const result = {
            success: true,
            iccid: iccid,
            activationCode: activationCode,
            qrImageBuffer: qrImageBuffer,
            status: status,
            applyReference: applyReference,
            rawResponse: {
                esimDetails: esimDetails,
                applyData: applyResponse.data,
                bundleName: bundleName,
                provisionedAt: new Date().toISOString()
            }
        };
        console.log("[eSIM-Go] Provisioning successful for ICCID:", iccid);
        return result;
    } catch (error) {
        console.error("[eSIM-Go] Provisioning failed:", error.message);
        if (error.response) {
            console.error("[eSIM-Go] API Error Response:", {
                status: error.response.status,
                data: error.response.data
            });
        }
        return {
            success: false,
            error: error.response?.data?.message || error.message,
            errorDetails: error.response?.data
        };
    }
}
async function validateESIMGoOrder(bundleName) {
    try {
        console.log("[eSIM-Go] Validating bundle:", bundleName);
        const response = await esimgoClient.post("/orders", {
            type: "validate",
            assign: true,
            order: [
                {
                    type: "bundle",
                    quantity: 1,
                    item: bundleName,
                    allowReassign: true
                }
            ]
        });
        console.log("[eSIM-Go] Validation result:", response.data);
        return {
            valid: response.data.valid,
            total: response.data.total,
            currency: response.data.currency,
            pricePerUnit: response.data.order?.[0]?.pricePerUnit
        };
    } catch (error) {
        console.error("[eSIM-Go] Validation failed:", error.message);
        return {
            valid: false,
            error: error.response?.data?.message || error.message
        };
    }
}
async function getESIMGoBalance() {
    try {
        const response = await esimgoClient.get("/account/balance");
        return {
            success: true,
            balance: response.data.balance,
            currency: response.data.currency
        };
    } catch (error) {
        console.error("[eSIM-Go] Failed to get balance:", error.message);
        return {
            success: false,
            error: error.message
        };
    }
}
async function getESIMGoBundles() {
    try {
        console.log("[eSIM-Go] 📋 Fetching bundles catalog...");
        // Use /bundles endpoint to get full catalog
        const response = await esimgoClient.get("/bundles");
        console.log("[eSIM-Go] ✅ Bundles fetched:", response.data?.length || 0);
        return {
            success: true,
            bundles: response.data || []
        };
    } catch (error) {
        console.error("[eSIM-Go] ❌ Failed to get bundles:", error.message);
        if (error.response) {
            console.error("[eSIM-Go] API Error:", {
                status: error.response.status,
                data: error.response.data
            });
        }
        return {
            success: false,
            error: error.message,
            bundles: []
        };
    }
}
async function checkBundleStatus(iccid, bundleName) {
    try {
        const response = await esimgoClient.get(`/esims/${iccid}/bundles/${bundleName}`);
        return {
            success: true,
            status: response.data.status,
            data: response.data
        };
    } catch (error) {
        console.error("[eSIM-Go] Failed to check bundle status:", error.message);
        return {
            success: false,
            error: error.message
        };
    }
}
const __TURBOPACK__default__export__ = {
    provisionESIMGo,
    validateESIMGoOrder,
    getESIMGoBalance,
    getESIMGoBundles,
    checkBundleStatus
};
}),
"[project]/Downloads/travel-e-sim-system/lib/esimaccess.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getESIMAccessBalance",
    ()=>getESIMAccessBalance,
    "getESIMAccessOrderDetails",
    ()=>getESIMAccessOrderDetails,
    "getESIMAccessPackages",
    ()=>getESIMAccessPackages,
    "provisionESIMAccess",
    ()=>provisionESIMAccess,
    "topUpESIMAccess",
    ()=>topUpESIMAccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
;
;
const ESIMACCESS_API_URL = "https://api.esimaccess.com/api/v1";
const ESIMACCESS_ACCESS_CODE = process.env.ESIMACCESS_ACCESS_CODE;
const ESIMACCESS_SECRET_KEY = process.env.ESIMACCESS_SECRET_KEY;
const esimAccessClient = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ESIMACCESS_API_URL,
    headers: {
        "RT-AccessCode": ESIMACCESS_ACCESS_CODE,
        "Content-Type": "application/json"
    },
    timeout: 30000
});
async function provisionESIMAccess(order) {
    console.log("\n[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("[eSIM Access] 🚀 Starting eSIM provisioning");
    console.log("[eSIM Access] 📦 Order ID:", order.orderId);
    console.log("[eSIM Access] 🔑 AccessCode:", ESIMACCESS_ACCESS_CODE ? "SET ✅" : "MISSING ❌");
    console.log("[eSIM Access] 🔐 SecretKey:", ESIMACCESS_SECRET_KEY ? "SET ✅" : "MISSING ❌");
    console.log("[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    try {
        if (!ESIMACCESS_ACCESS_CODE) {
            throw new Error("eSIM Access Access Code not configured");
        }
        const packageCode = order.supplierCode || order.packageCode;
        if (!packageCode) {
            throw new Error("Package code not found in order");
        }
        // Step 1: Fetch current package price from provider to avoid price expired error
        console.log("[eSIM Access] 📋 Step 1: Fetching current package details...");
        const packageListResponse = await esimAccessClient.post("/open/package/list", {
            packageCode: packageCode
        });
        if (!packageListResponse.data.success || !packageListResponse.data.obj?.packageList?.length) {
            throw new Error(`Package ${packageCode} not found in provider catalog`);
        }
        const packageDetails = packageListResponse.data.obj.packageList[0];
        const currentPrice = packageDetails.price || 10000;
        console.log("[eSIM Access] 💰 Provider's current price:", currentPrice);
        console.log("[eSIM Access] 📦 Package name:", packageDetails.name);
        console.log("[eSIM Access] 🌍 Location:", packageDetails.locationCode);
        // Step 2: Place order with provider's current price
        const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        console.log("[eSIM Access] 📋 Step 2: Placing order...");
        console.log("[eSIM Access] 📋 Package Code:", packageCode);
        console.log("[eSIM Access] 🆔 Transaction ID:", transactionId);
        console.log("[eSIM Access] 📡 Calling API: POST /open/esim/order");
        const requestBody = {
            transactionId: transactionId,
            amount: currentPrice,
            packageInfoList: [
                {
                    packageCode: packageCode,
                    count: 1,
                    price: currentPrice
                }
            ]
        };
        console.log("[eSIM Access] 📤 Request:", JSON.stringify(requestBody, null, 2));
        const orderResponse = await esimAccessClient.post("/open/esim/order", requestBody);
        console.log("[eSIM Access] 📥 Response Status:", orderResponse.status);
        console.log("[eSIM Access] 📥 Response Data:", JSON.stringify(orderResponse.data, null, 2));
        if (!orderResponse.data || !orderResponse.data.success) {
            throw new Error(orderResponse.data?.errorMsg || "Failed to provision eSIM");
        }
        const { orderNo, transactionId: txnId } = orderResponse.data.obj || {};
        if (!orderNo) {
            throw new Error("eSIM Access did not return order number");
        }
        console.log("[eSIM Access] 📦 Order Number:", orderNo);
        console.log("[eSIM Access] 🔍 Querying allocated profiles...");
        await new Promise((resolve)=>setTimeout(resolve, 3000));
        const profileResponse = await esimAccessClient.post("/open/esim/query", {
            orderNo: orderNo,
            pager: {
                pageNum: 1,
                pageSize: 20
            }
        });
        console.log("[eSIM Access] 📥 Profile Response:", JSON.stringify(profileResponse.data, null, 2));
        const profiles = profileResponse.data.obj?.esimList || [];
        if (profiles.length === 0) {
            console.log("[eSIM Access] ⚠️ No profiles allocated yet");
            return {
                success: true,
                orderNo,
                transactionId: txnId,
                status: "processing",
                message: "Order placed successfully, eSIM will be ready in 1-2 minutes"
            };
        }
        const profile = profiles[0];
        const { iccid, qrCodeUrl, acValue, rspUrl, smdpAddress, matchingId, confirmationCode } = profile;
        if (!iccid) {
            throw new Error("eSIM Access did not return ICCID");
        }
        let activationCode = acValue || rspUrl;
        // If no acValue or rspUrl, try to construct from SM-DP+ details
        if (!activationCode && smdpAddress) {
            activationCode = smdpAddress;
            if (matchingId) {
                activationCode += `\nMatching ID: ${matchingId}`;
            }
            if (confirmationCode) {
                activationCode += `\nConfirmation Code: ${confirmationCode}`;
            }
        }
        console.log("\n[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("[eSIM Access] ✅ PROVISIONING SUCCESSFUL!");
        console.log("[eSIM Access] 📱 ICCID:", iccid);
        console.log("[eSIM Access] 📦 Order No:", orderNo);
        console.log("[eSIM Access] 🎨 QR Code URL:", qrCodeUrl ? "Available ✅" : "Not Available ❌");
        console.log("[eSIM Access] 🔑 Activation Code:", activationCode ? "Available ✅" : "Not Available ❌");
        if (activationCode) {
            console.log("[eSIM Access] 🔑 Full Activation Details:", activationCode);
        }
        console.log("[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        let qrImageBuffer = null;
        if (qrCodeUrl) {
            try {
                const qrResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(qrCodeUrl, {
                    responseType: "arraybuffer"
                });
                qrImageBuffer = __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(qrResponse.data, "binary");
                console.log("[eSIM Access] ✅ QR code image downloaded");
            } catch (error) {
                console.warn("[eSIM Access] ⚠️ Failed to download QR code:", error.message);
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
                provisionedAt: new Date().toISOString()
            }
        };
    } catch (error) {
        console.log("\n[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("[eSIM Access] ❌ PROVISIONING FAILED!");
        console.log("[eSIM Access] Error:", error.message);
        if (error.response) {
            console.log("[eSIM Access] API Response Status:", error.response.status);
            console.log("[eSIM Access] API Response Data:", JSON.stringify(error.response.data, null, 2));
            if (error.response.status === 402) {
                console.log("[eSIM Access] 💳 INSUFFICIENT BALANCE - Please top up your account");
                console.log("[eSIM Access] 🌐 Top up at: https://console.esimaccess.com");
            } else if (error.response.status === 404) {
                console.log("[eSIM Access] 📦 PACKAGE NOT FOUND - Check package code");
            } else if (error.response.status === 401) {
                console.log("[eSIM Access] 🔑 AUTHENTICATION FAILED - Check API credentials");
            }
        }
        console.log("[eSIM Access] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        return {
            success: false,
            error: error.response?.data?.errorMsg || error.message,
            errorDetails: error.response?.data
        };
    }
}
async function getESIMAccessBalance() {
    try {
        const response = await esimAccessClient.get("/balance");
        return {
            success: true,
            balance: response.data.balance,
            currency: response.data.currency || "USD"
        };
    } catch (error) {
        console.error("[eSIM Access] Failed to get balance:", error.message);
        return {
            success: false,
            error: error.message
        };
    }
}
async function getESIMAccessPackages() {
    try {
        console.log("[eSIM Access] 📋 Fetching packages list...");
        const response = await esimAccessClient.post("/open/package/list", {
            locationCode: "",
            type: "",
            slug: "",
            packageCode: "",
            iccid: ""
        });
        console.log("[eSIM Access] ✅ Packages fetched:", response.data?.obj?.packageList?.length || 0);
        if (!response.data || !response.data.success) {
            throw new Error(response.data?.errorMsg || "Failed to fetch packages");
        }
        return {
            success: true,
            packages: response.data.obj?.packageList || []
        };
    } catch (error) {
        console.error("[eSIM Access] ❌ Failed to get packages:", error.message);
        if (error.response) {
            console.error("[eSIM Access] API Error:", {
                status: error.response.status,
                data: error.response.data
            });
        }
        return {
            success: false,
            error: error.message,
            packages: []
        };
    }
}
async function getESIMAccessOrderDetails(orderNo) {
    try {
        const response = await esimAccessClient.get(`/order/${orderNo}`);
        return {
            success: true,
            order: response.data
        };
    } catch (error) {
        console.error("[eSIM Access] Failed to get order details:", error.message);
        return {
            success: false,
            error: error.message
        };
    }
}
async function topUpESIMAccess(iccid, packageCode) {
    try {
        const response = await esimAccessClient.post("/topup", {
            iccid: iccid,
            packageCode: packageCode
        });
        return {
            success: true,
            orderNo: response.data.orderNo,
            data: response.data
        };
    } catch (error) {
        console.error("[eSIM Access] Top-up failed:", error.message);
        return {
            success: false,
            error: error.message
        };
    }
}
const __TURBOPACK__default__export__ = {
    provisionESIMAccess,
    getESIMAccessBalance,
    getESIMAccessPackages,
    getESIMAccessOrderDetails,
    topUpESIMAccess
};
}),
"[project]/Downloads/travel-e-sim-system/lib/provider-manager.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PROVIDERS",
    ()=>PROVIDERS,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getAllProviderBundles",
    ()=>getAllProviderBundles,
    "normalizeBundleToPlan",
    ()=>normalizeBundleToPlan,
    "provisionESIM",
    ()=>provisionESIM,
    "provisionWithFallback",
    ()=>provisionWithFallback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$esimgo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/esimgo.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$esimaccess$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/esimaccess.js [app-route] (ecmascript)");
;
;
const PROVIDERS = {
    ESIMGO: "esimgo",
    ESIMACCESS: "esimaccess"
};
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
    SUPPLIER_GLOBAL: "esimaccess"
};
/**
 * Normalize provider name to standard format
 */ function normalizeProviderName(providerName) {
    if (!providerName) {
        console.log("[Provider Manager] ⚠️ No provider name specified, defaulting to esimgo");
        return "esimgo";
    }
    const normalized = PROVIDER_NAME_MAP[providerName] || providerName.toLowerCase();
    console.log(`[Provider Manager] 🔄 Normalized provider: ${providerName} → ${normalized}`);
    return normalized;
}
async function provisionWithFallback(order, primaryProvider, fallbackProvider = null) {
    console.log(`[Provider Manager] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`[Provider Manager] 🚀 Starting provisioning for order: ${order.orderId}`);
    console.log(`[Provider Manager] 📦 Primary provider: ${primaryProvider}`);
    console.log(`[Provider Manager] 🔄 Fallback provider: ${fallbackProvider || "none"}`);
    console.log(`[Provider Manager] 📋 Bundle/Package code: ${order.plan?.supplierCode || order.plan?.bundleCode}`);
    console.log(`[Provider Manager] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    // Normalize provider names
    const normalizedPrimary = normalizeProviderName(primaryProvider);
    const normalizedFallback = fallbackProvider ? normalizeProviderName(fallbackProvider) : null;
    // Try primary provider
    console.log(`[Provider Manager] 🎯 Attempting provisioning with primary: ${normalizedPrimary}`);
    let result = await provisionESIM(order, normalizedPrimary);
    console.log(`[Provider Manager] 📊 Primary provider result:`, {
        success: result.success,
        provider: result.provider,
        error: result.error || "none",
        hasQR: result.hasQR || false,
        hasActivationCode: result.hasActivationCode || false
    });
    // If primary fails and fallback is available, try fallback
    if (!result.success && normalizedFallback) {
        console.log(`[Provider Manager] ⚠️ Primary provider failed, trying fallback: ${normalizedFallback}`);
        result = await provisionESIM(order, normalizedFallback);
        console.log(`[Provider Manager] 📊 Fallback provider result:`, {
            success: result.success,
            provider: result.provider,
            error: result.error || "none",
            hasQR: result.hasQR || false,
            hasActivationCode: result.hasActivationCode || false
        });
        if (result.success) {
            result.usedFallback = true;
            result.provider = normalizedFallback;
            console.log(`[Provider Manager] ✅ Fallback provider succeeded!`);
        } else {
            console.log(`[Provider Manager] ❌ Both providers failed`);
        }
    } else if (result.success) {
        result.provider = normalizedPrimary;
        result.usedFallback = false;
        console.log(`[Provider Manager] ✅ Primary provider succeeded!`);
    } else {
        console.log(`[Provider Manager] ❌ Primary provider failed and no fallback available`);
    }
    console.log(`[Provider Manager] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    return result;
}
async function provisionESIM(order, provider) {
    const normalizedProvider = normalizeProviderName(provider);
    console.log(`[Provider Manager] 🔌 Connecting to provider: ${normalizedProvider}`);
    try {
        let result;
        switch(normalizedProvider){
            case PROVIDERS.ESIMGO:
                console.log(`[Provider Manager] 📡 Calling eSIM-Go API...`);
                result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$esimgo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["provisionESIMGo"])(order);
                break;
            case PROVIDERS.ESIMACCESS:
                console.log(`[Provider Manager] 📡 Calling eSIM Access API...`);
                result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$esimaccess$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["provisionESIMAccess"])(order);
                break;
            default:
                console.log(`[Provider Manager] ❌ Unknown provider after normalization: ${normalizedProvider}`);
                return {
                    success: false,
                    error: `Unknown provider: ${provider} (normalized: ${normalizedProvider})`,
                    provider: normalizedProvider
                };
        }
        console.log(`[Provider Manager] 📥 Provider response received:`, {
            success: result.success,
            hasQR: !!result.qrUrl || !!result.qrCode,
            hasActivation: !!result.activationCode,
            error: result.error || "none"
        });
        return result;
    } catch (error) {
        console.error(`[Provider Manager] 💥 Exception during provisioning:`, error);
        return {
            success: false,
            error: error.message || "Provisioning exception",
            provider: normalizedProvider,
            exception: error.toString()
        };
    }
}
async function getAllProviderBundles() {
    console.log("[Provider Manager] 🔄 Fetching bundles from all providers...");
    const results = {
        esimgo: [],
        esimaccess: []
    };
    // Fetch eSIM-Go bundles
    try {
        if (process.env.ESIMGO_API_KEY) {
            console.log("[Provider Manager] 📡 Fetching eSIM-Go bundles...");
            const esimgoResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$esimgo$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getESIMGoBundles"])();
            if (esimgoResult.success) {
                results.esimgo = esimgoResult.bundles;
                console.log(`[Provider Manager] ✅ eSIM-Go: ${results.esimgo.length} bundles fetched`);
            }
        } else {
            console.log("[Provider Manager] ⚠️ eSIM-Go API key not configured, skipping");
        }
    } catch (error) {
        console.error("[Provider Manager] ❌ eSIM-Go fetch failed:", error.message);
    }
    // Fetch eSIM Access packages
    try {
        if (process.env.ESIMACCESS_ACCESS_CODE) {
            console.log("[Provider Manager] 📡 Fetching eSIM Access packages...");
            const esimAccessResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$esimaccess$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getESIMAccessPackages"])();
            if (esimAccessResult.success) {
                results.esimaccess = esimAccessResult.packages;
                console.log(`[Provider Manager] ✅ eSIM Access: ${results.esimaccess.length} packages fetched`);
            }
        } else {
            console.log("[Provider Manager] ⚠️ eSIM Access API key not configured, skipping");
        }
    } catch (error) {
        console.error("[Provider Manager] ❌ eSIM Access fetch failed:", error.message);
    }
    console.log(`[Provider Manager] 🎯 Total bundles: ${results.esimgo.length + results.esimaccess.length}`);
    return results;
}
function normalizeBundleToPlan(bundle, provider) {
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
                providerData: bundle
            };
        } else if (provider === PROVIDERS.ESIMACCESS) {
            // eSIM Access package structure from their API
            const dataGB = convertBytesToGB(bundle.volume);
            const countries = bundle.location?.split(",") || [];
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
                providerData: bundle
            };
        }
    } catch (error) {
        console.error("[Provider Manager] ❌ Failed to normalize bundle:", error.message);
        return null;
    }
}
function extractCountryCode(regions) {
    if (Array.isArray(regions) && regions.length > 0) {
        return regions[0];
    }
    if (typeof regions === "string") {
        return regions.split(",")[0];
    }
    return "GL";
}
function extractCountryName(name) {
    const match = name.match(/^([A-Za-z\s]+)/);
    return match ? match[1].trim() : "International";
}
function convertToGB(bytes) {
    if (!bytes) return 1;
    return Number.parseFloat((bytes / (1024 * 1024 * 1024)).toFixed(2));
}
function convertBytesToGB(bytes) {
    if (!bytes) return 1;
    return Number.parseFloat((bytes / (1024 * 1024 * 1024)).toFixed(2));
}
;
const __TURBOPACK__default__export__ = {
    provisionWithFallback,
    provisionESIM,
    getAllProviderBundles,
    normalizeBundleToPlan,
    PROVIDERS
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e39e1dc2._.js.map