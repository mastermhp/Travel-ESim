module.exports = [
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[project]/Downloads/travel-e-sim-system/lib/cloudinary.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uploadQRCodeToCloudinary",
    ()=>uploadQRCodeToCloudinary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$cloudinary$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/cloudinary/cloudinary.js [app-route] (ecmascript)");
;
// Configure Cloudinary
__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$cloudinary$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v2"].config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
async function uploadQRCodeToCloudinary(qrBuffer, orderId) {
    try {
        return new Promise((resolve, reject)=>{
            const uploadStream = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$cloudinary$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v2"].uploader.upload_stream({
                folder: "esim-qr-codes",
                public_id: `qr_${orderId}`,
                resource_type: "image",
                format: "png"
            }, (error, result)=>{
                if (error) {
                    console.error("[Cloudinary] Upload error:", error);
                    reject(error);
                } else {
                    console.log("[Cloudinary] Upload successful:", result.secure_url);
                    resolve(result.secure_url);
                }
            });
            uploadStream.end(qrBuffer);
        });
    } catch (error) {
        console.error("[Cloudinary] Error uploading QR code:", error);
        throw error;
    }
}
;
}),
"[project]/Downloads/travel-e-sim-system/lib/cloudinary.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cloudinary",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$cloudinary$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v2"],
    "uploadQRCodeToCloudinary",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["uploadQRCodeToCloudinary"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/cloudinary.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$cloudinary$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/cloudinary/cloudinary.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__936f485d._.js.map