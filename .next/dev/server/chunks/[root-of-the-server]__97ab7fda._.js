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
"[project]/Downloads/travel-e-sim-system/lib/models/plan.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Plan",
    ()=>Plan,
    "PlanModel",
    ()=>Plan,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const planSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    country: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    dataGB: {
        type: Number,
        required: true
    },
    validityDays: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: "USD"
    },
    costPrice: {
        type: Number
    },
    supplierId: {
        type: String
    },
    supplierCode: {
        type: String
    },
    isUnlimited: {
        type: Boolean,
        default: false
    },
    fairUseLimitGB: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true,
        index: true
    },
    salesCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
planSchema.index({
    country: 1,
    active: 1
});
planSchema.index({
    price: 1
});
planSchema.statics.findAll = async function(filter = {}) {
    return this.find({
        active: true,
        ...filter
    }).sort({
        country: 1,
        price: 1
    });
};
planSchema.statics.findByCountry = async function(countryCode) {
    return this.find({
        country: countryCode.toUpperCase(),
        active: true
    }).sort({
        price: 1
    });
};
planSchema.statics.searchPlans = async function({ minPrice, maxPrice, minData, maxData }) {
    const filter = {
        active: true
    };
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number.parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = Number.parseFloat(maxPrice);
    }
    if (minData || maxData) {
        filter.dataGB = {};
        if (minData) filter.dataGB.$gte = Number.parseFloat(minData);
        if (maxData) filter.dataGB.$lte = Number.parseFloat(maxData);
    }
    return this.find(filter).sort({
        price: 1
    });
};
planSchema.statics.update = async function(id, updateData) {
    return this.findByIdAndUpdate(id, updateData, {
        new: true
    });
};
planSchema.statics.delete = async function(id) {
    return this.findByIdAndDelete(id);
};
if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Plan) {
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Plan;
}
const Plan = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Plan", planSchema);
;
const __TURBOPACK__default__export__ = Plan;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[project]/Downloads/travel-e-sim-system/lib/redis.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cacheDelete",
    ()=>cacheDelete,
    "cacheGet",
    ()=>cacheGet,
    "cacheSet",
    ()=>cacheSet,
    "getRedis",
    ()=>getRedis,
    "getRedisClient",
    ()=>getRedisClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$ioredis$2f$built$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/ioredis/built/index.js [app-route] (ecmascript)");
;
let redis = null;
function getRedis() {
    if (!redis) {
        // Use Redis connection string from env or fall back to local
        const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
        try {
            redis = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$ioredis$2f$built$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](redisUrl, {
                maxRetriesPerRequest: 3,
                retryStrategy (times) {
                    const delay = Math.min(times * 50, 2000);
                    return delay;
                }
            });
            redis.on("error", (err)=>{
                console.error("[Redis] Connection error:", err.message);
            });
            redis.on("connect", ()=>{
                console.log("[Redis] Connected successfully");
            });
        } catch (error) {
            console.error("[Redis] Failed to initialize:", error.message);
            // Return a mock Redis client for development without Redis
            return {
                get: async ()=>null,
                setex: async ()=>"OK",
                del: async ()=>1,
                quit: async ()=>"OK"
            };
        }
    }
    return redis;
}
const getRedisClient = getRedis;
async function cacheGet(key) {
    try {
        const redis = getRedis();
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("[Redis] Cache get error:", error.message);
        return null;
    }
}
async function cacheSet(key, value, ttlSeconds = 60) {
    try {
        const redis = getRedis();
        await redis.setex(key, ttlSeconds, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error("[Redis] Cache set error:", error.message);
        return false;
    }
}
async function cacheDelete(key) {
    try {
        const redis = getRedis();
        await redis.del(key);
        return true;
    } catch (error) {
        console.error("[Redis] Cache delete error:", error.message);
        return false;
    }
}
}),
"[project]/Downloads/travel-e-sim-system/app/api/v1/plans/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/plan.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/redis.js [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const country = searchParams.get("country");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const minData = searchParams.get("minData");
        const maxData = searchParams.get("maxData");
        // Create cache key based on query params
        const cacheKey = country ? `plans:${country.toUpperCase()}` : `plans:all${minPrice ? `:min${minPrice}` : ""}${maxPrice ? `:max${maxPrice}` : ""}`;
        // Try to get from cache first (TTL: 60 seconds)
        const cached = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheGet"])(cacheKey);
        if (cached) {
            console.log("[Plans API] Cache hit:", cacheKey);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                plans: cached,
                count: cached.length,
                cached: true
            });
        }
        console.log("[Plans API] Cache miss:", cacheKey);
        // Fetch from database
        let plans;
        if (country) {
            plans = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanModel"].findByCountry(country);
        } else if (minPrice || maxPrice || minData || maxData) {
            plans = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanModel"].searchPlans({
                minPrice,
                maxPrice,
                minData,
                maxData
            });
        } else {
            plans = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanModel"].findAll({
                active: true
            });
        }
        // Cache the result for 60 seconds
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheSet"])(cacheKey, plans, 60);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            plans,
            count: plans.length,
            cached: false
        });
    } catch (error) {
        console.error("[Plans API] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch plans"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__97ab7fda._.js.map