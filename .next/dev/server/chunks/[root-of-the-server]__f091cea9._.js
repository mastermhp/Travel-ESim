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
        const response = await esimgoClient.get("/bundles");
        return {
            success: true,
            bundles: response.data.bundles || response.data
        };
    } catch (error) {
        console.error("[eSIM-Go] Failed to get bundles:", error.message);
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
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f091cea9._.js.map