module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/Downloads/travel-e-sim-system/lib/db.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectDB",
    ()=>connectDB,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getCollection",
    ()=>getCollection,
    "getDb",
    ()=>getDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env file");
}
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            console.log("[MongoDB] Connected successfully");
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
async function getDb() {
    await connectDB();
    return __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connection.db;
}
async function getCollection(collectionName) {
    const db = await getDb();
    return db.collection(collectionName);
}
const __TURBOPACK__default__export__ = connectDB;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

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
    try {
        if (!ESIMACCESS_ACCESS_CODE) {
            throw new Error("eSIM Access Access Code not configured");
        }
        console.log("[eSIM Access] 🚀 Provisioning eSIM for order:", order.orderId);
        const packageCode = order.supplierCode || order.packageCode;
        if (!packageCode) {
            throw new Error("Package code not found in order");
        }
        console.log("[eSIM Access] 📦 Using package:", packageCode);
        // Use correct endpoint: /open/apply (provision new eSIM with bundle)
        const orderResponse = await esimAccessClient.post("/open/apply", {
            packageCode: packageCode,
            count: 1
        });
        console.log("[eSIM Access] 📥 Order response:", orderResponse.data);
        if (!orderResponse.data || !orderResponse.data.success) {
            throw new Error(orderResponse.data?.errorMsg || "Failed to provision eSIM");
        }
        const esimList = orderResponse.data.obj?.iccidInfoList || [];
        if (esimList.length === 0) {
            throw new Error("eSIM Access did not return any eSIM data");
        }
        const esimData = esimList[0];
        const { iccid, qrCodeUrl, rspUrl, ac, orderNo } = esimData;
        if (!iccid) {
            throw new Error("eSIM Access did not return ICCID");
        }
        console.log("[eSIM Access] ✅ eSIM assigned - ICCID:", iccid, "Order No:", orderNo);
        // Download QR code image if URL is provided
        let qrImageBuffer = null;
        if (qrCodeUrl) {
            try {
                const qrResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(qrCodeUrl, {
                    responseType: "arraybuffer"
                });
                qrImageBuffer = Buffer.from(qrResponse.data, "binary");
            } catch (error) {
                console.warn("[eSIM Access] ⚠️ Failed to download QR code:", error.message);
            }
        }
        // Activation code from rspUrl or ac
        const activationCode = rspUrl || ac;
        console.log("[eSIM Access] 🎯 Provisioning successful for ICCID:", iccid);
        return {
            success: true,
            iccid: iccid,
            activationCode: activationCode,
            qrImageBuffer: qrImageBuffer,
            qrUrl: qrCodeUrl,
            status: "active",
            orderNo: orderNo,
            rawResponse: {
                esimData: esimData,
                packageCode: packageCode,
                provisionedAt: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error("[eSIM Access] ❌ Provisioning failed:", error.message);
        if (error.response) {
            console.error("[eSIM Access] API Error Response:", {
                status: error.response.status,
                data: error.response.data
            });
        }
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
        // Use the correct endpoint: /open/package/list
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
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/Downloads/travel-e-sim-system/lib/auth.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// JWT utilities and auth helpers
__turbopack_context__.s([
    "checkRateLimit",
    ()=>checkRateLimit,
    "createToken",
    ()=>createToken,
    "extractToken",
    ()=>extractToken,
    "generateAccessToken",
    ()=>generateAccessToken,
    "getCurrentUser",
    ()=>getCurrentUser,
    "logSecurityEvent",
    ()=>logSecurityEvent,
    "verifyAccessToken",
    ()=>verifyAccessToken,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const JWT_EXPIRES_IN = "7d";
function generateAccessToken(user) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
        userId: user._id.toString(),
        email: user.email,
        role: user.role
    }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}
function createToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}
function verifyAccessToken(token) {
    try {
        console.log("[v0] Verifying token with JWT_SECRET:", ("TURBOPACK compile-time truthy", 1) ? "SET" : "TURBOPACK unreachable");
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
        console.log("[v0] Token verified successfully:", decoded);
        return decoded;
    } catch (error) {
        console.error("[v0] JWT verification failed:", error.message);
        return null;
    }
}
function verifyToken(token) {
    return verifyAccessToken(token);
}
function extractToken(request) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }
    return authHeader.substring(7);
}
async function getCurrentUser(request) {
    const token = extractToken(request);
    if (!token) {
        return null;
    }
    const payload = verifyAccessToken(token);
    if (!payload) {
        return null;
    }
    return payload;
}
// Rate limiting helper
const loginAttempts = new Map();
function checkRateLimit(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    const now = Date.now();
    const attempts = loginAttempts.get(identifier) || [];
    // Clean old attempts
    const recentAttempts = attempts.filter((time)=>now - time < windowMs);
    if (recentAttempts.length >= maxAttempts) {
        return false;
    }
    recentAttempts.push(now);
    loginAttempts.set(identifier, recentAttempts);
    return true;
}
function logSecurityEvent(userId, event, details) {
    console.log(`[v0] Security Event: ${event}`, {
        userId,
        timestamp: new Date().toISOString(),
        ...details
    });
// In production, store in database or send to monitoring service
}
}),
"[project]/Downloads/travel-e-sim-system/app/api/v1/plans/sync/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$provider$2d$manager$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/provider-manager.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/auth.js [app-route] (ecmascript)");
;
;
;
;
async function POST(request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const token = authHeader.replace("Bearer ", "");
        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyAccessToken"])(token);
        if (!decoded || decoded.role !== "admin") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Admin access required"
            }, {
                status: 403
            });
        }
        console.log("[Plan Sync] 🚀 Starting plan synchronization from providers...");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
        const db = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])()).db;
        const plansCollection = db.collection("plans");
        console.log("[Plan Sync] 📡 Fetching bundles from providers...");
        const providerBundles = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$provider$2d$manager$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllProviderBundles"])();
        const syncResults = {
            esimgo: {
                added: 0,
                updated: 0,
                skipped: 0,
                errors: 0
            },
            esimaccess: {
                added: 0,
                updated: 0,
                skipped: 0,
                errors: 0
            },
            total: 0
        };
        // Sync eSIM-Go bundles
        if (providerBundles.esimgo && providerBundles.esimgo.length > 0) {
            console.log(`[Plan Sync] 🔄 Processing ${providerBundles.esimgo.length} eSIM-Go bundles...`);
            for (const bundle of providerBundles.esimgo){
                try {
                    const planData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$provider$2d$manager$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeBundleToPlan"])(bundle, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$provider$2d$manager$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROVIDERS"].ESIMGO);
                    if (!planData) {
                        syncResults.esimgo.skipped++;
                        continue;
                    }
                    const existing = await plansCollection.findOne({
                        supplierId: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$provider$2d$manager$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROVIDERS"].ESIMGO,
                        supplierCode: planData.supplierCode
                    });
                    if (existing) {
                        await plansCollection.updateOne({
                            _id: existing._id
                        }, {
                            $set: {
                                ...planData,
                                providerSynced: true,
                                lastSyncedAt: new Date()
                            }
                        });
                        syncResults.esimgo.updated++;
                        console.log(`[Plan Sync] ✏️ Updated: ${planData.name}`);
                    } else {
                        await plansCollection.insertOne({
                            ...planData,
                            providerSynced: true,
                            lastSyncedAt: new Date(),
                            isCustomPlan: false,
                            createdAt: new Date()
                        });
                        syncResults.esimgo.added++;
                        console.log(`[Plan Sync] ➕ Added: ${planData.name}`);
                    }
                } catch (error) {
                    console.error(`[Plan Sync] ❌ Error processing bundle:`, error.message);
                    syncResults.esimgo.errors++;
                }
            }
        }
        // Sync eSIM Access packages
        if (providerBundles.esimaccess && providerBundles.esimaccess.length > 0) {
            console.log(`[Plan Sync] 🔄 Processing ${providerBundles.esimaccess.length} eSIM Access packages...`);
            for (const pkg of providerBundles.esimaccess){
                try {
                    const planData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$provider$2d$manager$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeBundleToPlan"])(pkg, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$provider$2d$manager$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROVIDERS"].ESIMACCESS);
                    if (!planData) {
                        syncResults.esimaccess.skipped++;
                        continue;
                    }
                    const existing = await plansCollection.findOne({
                        supplierId: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$provider$2d$manager$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROVIDERS"].ESIMACCESS,
                        supplierCode: planData.supplierCode
                    });
                    if (existing) {
                        await plansCollection.updateOne({
                            _id: existing._id
                        }, {
                            $set: {
                                ...planData,
                                providerSynced: true,
                                lastSyncedAt: new Date()
                            }
                        });
                        syncResults.esimaccess.updated++;
                        console.log(`[Plan Sync] ✏️ Updated: ${planData.name}`);
                    } else {
                        await plansCollection.insertOne({
                            ...planData,
                            providerSynced: true,
                            lastSyncedAt: new Date(),
                            isCustomPlan: false,
                            createdAt: new Date()
                        });
                        syncResults.esimaccess.added++;
                        console.log(`[Plan Sync] ➕ Added: ${planData.name}`);
                    }
                } catch (error) {
                    console.error(`[Plan Sync] ❌ Error processing package:`, error.message);
                    syncResults.esimaccess.errors++;
                }
            }
        }
        syncResults.total = syncResults.esimgo.added + syncResults.esimgo.updated + syncResults.esimaccess.added + syncResults.esimaccess.updated;
        console.log("[Plan Sync] ✅ Synchronization complete:", syncResults);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Plans synchronized successfully from both providers",
            results: syncResults,
            providers: {
                esimgo: {
                    configured: !!process.env.ESIMGO_API_KEY,
                    bundlesFound: providerBundles.esimgo?.length || 0
                },
                esimaccess: {
                    configured: !!process.env.ESIMACCESS_ACCESS_CODE,
                    packagesFound: providerBundles.esimaccess?.length || 0
                }
            }
        });
    } catch (error) {
        console.error("[Plan Sync] ❌ Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to sync plans",
            details: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f69e5af0._.js.map