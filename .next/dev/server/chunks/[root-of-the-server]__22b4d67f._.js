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
"[project]/Downloads/travel-e-sim-system/lib/models/order.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const orderSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    clientRequestId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
    userEmail: {
        type: String,
        required: true
    },
    planId: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: "USD"
    },
    paymentMethod: {
        type: String,
        enum: [
            "card",
            "mobile_money"
        ],
        default: "card"
    },
    paymentStatus: {
        type: String,
        enum: [
            "unpaid",
            "paid",
            "failed",
            "refunded"
        ],
        default: "unpaid",
        index: true
    },
    status: {
        type: String,
        enum: [
            "pending",
            "paid",
            "provisioning",
            "completed",
            "failed",
            "cancelled"
        ],
        default: "pending",
        index: true
    },
    provisionStatus: {
        type: String,
        enum: [
            "pending",
            "processing",
            "provisioned",
            "failed"
        ],
        default: "pending",
        index: true
    },
    supplierId: {
        type: String
    },
    supplierCode: {
        type: String
    },
    fallbackSupplierId: {
        type: String
    },
    lastError: {
        type: String
    },
    supplierResponse: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.Mixed
    },
    qrUrl: {
        type: String
    },
    activationCode: {
        type: String
    },
    iccid: {
        type: String
    },
    stripePaymentIntentId: {
        type: String
    },
    stripePaymentIntentClientSecret: {
        type: String
    },
    purchaseSource: {
        type: String,
        enum: [
            "web",
            "mobile",
            "agent"
        ],
        default: "web"
    },
    agentId: {
        type: String
    },
    metadata: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.Mixed
    }
}, {
    timestamps: true
});
orderSchema.index({
    userId: 1,
    createdAt: -1
});
orderSchema.index({
    status: 1,
    createdAt: -1
});
orderSchema.index({
    stripePaymentIntentId: 1
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Order || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Order", orderSchema);
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
        type: String,
        enum: [
            "esimgo",
            "esimaccess",
            "custom"
        ],
        default: "custom"
    },
    supplierCode: {
        type: String
    },
    fallbackSupplierId: {
        type: String,
        enum: [
            "esimgo",
            "esimaccess",
            null
        ]
    },
    fallbackSupplierCode: {
        type: String
    },
    providerSynced: {
        type: Boolean,
        default: false
    },
    lastSyncedAt: {
        type: Date
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
    },
    isCustomPlan: {
        type: Boolean,
        default: false
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
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

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
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

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
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/Downloads/travel-e-sim-system/lib/stripe.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "constructWebhookEvent",
    ()=>constructWebhookEvent,
    "createPaymentIntent",
    ()=>createPaymentIntent,
    "getStripeClient",
    ()=>getStripeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
;
let stripeInstance = null;
function getStripeClient() {
    if (!stripeInstance) {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) {
            console.warn("[Stripe] STRIPE_SECRET_KEY not found, Stripe features will not work");
            return null;
        }
        stripeInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](secretKey, {
            apiVersion: "2024-11-20.acacia"
        });
    }
    return stripeInstance;
}
async function createPaymentIntent({ amount, currency = "usd", metadata = {} }) {
    const stripe = getStripeClient();
    if (!stripe) {
        throw new Error("Stripe is not configured");
    }
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: currency.toLowerCase(),
            metadata,
            automatic_payment_methods: {
                enabled: true
            }
        });
        return paymentIntent;
    } catch (error) {
        console.error("[Stripe] Error creating payment intent:", error);
        throw error;
    }
}
function constructWebhookEvent(body, signature) {
    const stripe = getStripeClient();
    if (!stripe) {
        throw new Error("Stripe is not configured");
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }
    try {
        return stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
        console.error("[Stripe] Webhook signature verification failed:", error);
        throw error;
    }
}
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

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
"[project]/Downloads/travel-e-sim-system/lib/queue.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QUEUE_NAMES",
    ()=>QUEUE_NAMES,
    "queueManager",
    ()=>queueManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/redis.js [app-route] (ecmascript)");
;
class QueueManager {
    constructor(){
        this.redis = null;
        this.inMemoryQueue = [];
        this.isProcessing = false;
    }
    async getClient() {
        if (!this.redis) {
            this.redis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRedisClient"])();
        }
        return this.redis;
    }
    async enqueue(queueName, job) {
        try {
            const redis = await this.getClient();
            if (redis) {
                await redis.lpush(queueName, JSON.stringify(job));
                console.log(`[Queue] Enqueued job to ${queueName}:`, job.orderId);
            } else {
                console.log(`[Queue] Redis not available, using in-memory queue`);
                this.inMemoryQueue.push({
                    queueName,
                    job,
                    timestamp: Date.now()
                });
                console.log(`[Queue] Enqueued job to in-memory queue:`, job.orderId);
                console.log(`[Queue] Total jobs in queue: ${this.inMemoryQueue.length}`);
                if ("TURBOPACK compile-time truthy", 1) {
                    console.log(`[Queue] Auto-processing enabled, starting job...`);
                    setImmediate(()=>this.processNextJob());
                }
            }
        } catch (error) {
            console.error("[Queue] Error enqueueing job:", error);
            this.inMemoryQueue.push({
                queueName,
                job,
                timestamp: Date.now()
            });
            if ("TURBOPACK compile-time truthy", 1) {
                console.log(`[Queue] Auto-processing after error, starting job...`);
                setImmediate(()=>this.processNextJob());
            }
        }
    }
    async processNextJob() {
        if (this.isProcessing || this.inMemoryQueue.length === 0) {
            if (this.isProcessing) {
                console.log(`[Queue] Already processing a job, skipping...`);
            }
            return;
        }
        this.isProcessing = true;
        const item = this.inMemoryQueue.shift();
        try {
            console.log(`\n[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            console.log(`[Queue] 🔄 Processing job: ${item.job.orderId}`);
            console.log(`[Queue] 📊 Retry attempt: ${item.retries || 0}/3`);
            console.log(`[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
            const hasESIMGo = !!process.env.ESIMGO_API_KEY;
            const hasESIMAccess = !!(process.env.ESIMACCESS_ACCESS_CODE && process.env.ESIMACCESS_SECRET_KEY);
            console.log(`[Queue] Provider API keys status:`);
            console.log(`[Queue]   eSIM-Go: ${hasESIMGo ? "FOUND ✅" : "MISSING ❌"}`);
            console.log(`[Queue]   eSIM Access: ${hasESIMAccess ? "FOUND ✅" : "MISSING ❌"}`);
            if (!hasESIMGo && !hasESIMAccess) {
                console.error(`[Queue] ❌ No provider API keys found`);
                console.error(`[Queue] 📋 Add to .env.local:`);
                console.error(`[Queue]   ESIMGO_API_KEY=your_key`);
                console.error(`[Queue]   ESIMACCESS_ACCESS_CODE=your_code`);
                console.error(`[Queue]   ESIMACCESS_SECRET_KEY=your_secret`);
                throw new Error("Provider API keys not configured");
            }
            const { provisionWithFallback } = await __turbopack_context__.A("[project]/Downloads/travel-e-sim-system/lib/provider-manager.js [app-route] (ecmascript, async loader)");
            const { uploadQRCodeToCloudinary } = await __turbopack_context__.A("[project]/Downloads/travel-e-sim-system/lib/cloudinary.js [app-route] (ecmascript, async loader)");
            const Order = (await __turbopack_context__.A("[project]/Downloads/travel-e-sim-system/lib/models/order.js [app-route] (ecmascript, async loader)")).default;
            const Plan = (await __turbopack_context__.A("[project]/Downloads/travel-e-sim-system/lib/models/plan.js [app-route] (ecmascript, async loader)")).default;
            const { connectDB } = await __turbopack_context__.A("[project]/Downloads/travel-e-sim-system/lib/db.js [app-route] (ecmascript, async loader)");
            await connectDB();
            const { orderId, planId } = item.job;
            const order = await Order.findOne({
                orderId
            });
            if (!order) {
                console.error("[Queue] ❌ Order not found:", orderId);
                this.isProcessing = false;
                return;
            }
            if (order.provisionStatus === "provisioned") {
                console.log("[Queue] ✅ Order already provisioned:", orderId);
                this.isProcessing = false;
                return;
            }
            order.provisionStatus = "processing";
            await order.save();
            console.log(`[Queue] ✅ Order status updated to "processing"`);
            const plan = await Plan.findById(planId);
            if (!plan) {
                throw new Error("Plan not found");
            }
            console.log("\n[Queue] 📋 Plan Details:");
            console.log("[Queue]   Name:", plan.name);
            console.log("[Queue]   Country:", plan.country);
            console.log("[Queue]   Data:", plan.dataGB, "GB");
            console.log("[Queue]   Validity:", plan.validityDays, "days");
            console.log("[Queue]   Primary Provider:", plan.supplierId);
            console.log("[Queue]   Provider Code:", plan.supplierCode);
            console.log("[Queue]   Fallback Provider:", plan.fallbackSupplierId || "none");
            console.log("\n[Queue] 💰 Pricing:");
            console.log("[Queue]   Retail Price:", plan.price, plan.currency);
            console.log("[Queue]   Cost Price:", plan.costPrice || "N/A", plan.currency);
            if (plan.costPrice) {
                const margin = ((plan.price - plan.costPrice) / plan.price * 100).toFixed(2);
                const profit = (plan.price - plan.costPrice).toFixed(2);
                console.log("[Queue]   Profit:", profit, plan.currency);
                console.log("[Queue]   Margin:", margin + "%");
            }
            console.log("[Queue]   Custom Plan:", plan.isCustomPlan ? "Yes ✅" : "No (Provider synced)");
            const primaryProvider = plan.supplierId || "esimgo";
            const fallbackProvider = plan.fallbackSupplierId || (primaryProvider === "esimgo" ? "esimaccess" : "esimgo");
            console.log(`\n[Queue] 🎯 Using providers:`);
            console.log(`[Queue]   Primary: ${primaryProvider}`);
            console.log(`[Queue]   Fallback: ${fallbackProvider}`);
            order.supplierCode = plan.supplierCode || plan.bundleName;
            const provisionResult = await provisionWithFallback({
                orderId: order.orderId,
                supplierCode: order.supplierCode,
                bundleName: order.supplierCode,
                packageCode: order.supplierCode,
                plan: {
                    supplierId: plan.supplierId,
                    supplierCode: plan.supplierCode,
                    bundleCode: plan.bundleName,
                    country: plan.country,
                    dataGB: plan.dataGB,
                    validityDays: plan.validityDays
                }
            }, primaryProvider, fallbackProvider);
            console.log(`\n[Queue] 📥 Provisioning Result:`);
            console.log(`[Queue]   Success: ${provisionResult.success ? "✅ YES" : "❌ NO"}`);
            console.log(`[Queue]   Provider Used: ${provisionResult.provider || "NONE"}`);
            console.log(`[Queue]   Used Fallback: ${provisionResult.usedFallback ? "Yes" : "No"}`);
            console.log(`[Queue]   Has QR Code: ${provisionResult.qrUrl ? "Yes ✅" : "No ❌"}`);
            console.log(`[Queue]   Has Activation: ${provisionResult.activationCode ? "Yes ✅" : "No ❌"}`);
            console.log(`[Queue]   ICCID: ${provisionResult.iccid || "N/A"}`);
            if (!provisionResult.success) {
                console.log(`[Queue]   Error: ${provisionResult.error}`);
            }
            if (!provisionResult.success) {
                throw new Error(provisionResult.error || "Provisioning failed");
            }
            let qrUrl = provisionResult.qrUrl;
            if (provisionResult.qrImageBuffer && process.env.CLOUDINARY_CLOUD_NAME) {
                console.log(`[Queue] 📤 Uploading QR code to Cloudinary...`);
                qrUrl = await uploadQRCodeToCloudinary(provisionResult.qrImageBuffer, orderId);
                console.log(`[Queue] ✅ QR code uploaded`);
            }
            order.provisionStatus = "provisioned";
            order.status = "completed";
            order.supplierResponse = {
                ...provisionResult.rawResponse,
                provisionedAt: new Date(),
                supplierId: provisionResult.provider?.toUpperCase() || primaryProvider.toUpperCase(),
                usedFallback: provisionResult.usedFallback || false
            };
            order.qrUrl = qrUrl;
            order.activationCode = provisionResult.activationCode;
            order.iccid = provisionResult.iccid;
            await order.save();
            console.log("\n[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("[Queue] ✅ JOB COMPLETED SUCCESSFULLY!");
            console.log("[Queue] 📦 Order:", orderId);
            console.log("[Queue] 🏢 Provider:", provisionResult.provider);
            console.log("[Queue] 📱 ICCID:", provisionResult.iccid);
            console.log("[Queue] 🎨 QR Code:", qrUrl ? "Available" : "N/A");
            console.log("[Queue] 🔑 Activation:", provisionResult.activationCode ? "Available" : "N/A");
            console.log("[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        } catch (error) {
            console.log("\n[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("[Queue] ❌ JOB FAILED!");
            console.log("[Queue] Error:", error.message);
            console.log("[Queue] Stack:", error.stack);
            console.log("\n[Queue] 🔧 Troubleshooting:");
            console.log("[Queue]   1. Check account balance in provider dashboard");
            console.log("[Queue]   2. Verify provider code matches available packages");
            console.log("[Queue]   3. Confirm API credentials are correct");
            console.log("[Queue]   4. Review provider API response above");
            console.log("[Queue] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
            if (item.retries === undefined) {
                item.retries = 0;
            }
            if (item.retries < 3) {
                item.retries++;
                this.inMemoryQueue.push(item);
                console.log(`[Queue] 🔄 Retrying (${item.retries}/3) in 2 seconds`);
            } else {
                console.error("[Queue] ❌ Max retries reached");
                console.error("[Queue] 📋 Final troubleshooting steps:");
                console.error("[Queue]   - Check provider dashboards for account status");
                console.error("[Queue]   - Verify package/bundle codes exist");
                console.error("[Queue]   - Review API error responses above");
            }
        } finally{
            this.isProcessing = false;
            if (this.inMemoryQueue.length > 0) {
                console.log(`[Queue] 📊 ${this.inMemoryQueue.length} job(s) remaining in queue\n`);
                setTimeout(()=>this.processNextJob(), 2000);
            }
        }
    }
    async dequeue(queueName) {
        try {
            const redis = await this.getClient();
            if (redis) {
                const job = await redis.rpop(queueName);
                return job ? JSON.parse(job) : null;
            } else {
                const index = this.inMemoryQueue.findIndex((item)=>item.queueName === queueName);
                if (index !== -1) {
                    const item = this.inMemoryQueue.splice(index, 1)[0];
                    return item.job;
                }
                return null;
            }
        } catch (error) {
            console.error("[Queue] Error dequeuing job:", error);
            return null;
        }
    }
    async getQueueLength(queueName) {
        try {
            const redis = await this.getClient();
            if (redis) {
                return await redis.llen(queueName);
            } else {
                return this.inMemoryQueue.filter((item)=>item.queueName === queueName).length;
            }
        } catch (error) {
            console.error("[Queue] Error getting queue length:", error);
            return 0;
        }
    }
    getInMemoryQueue() {
        return this.inMemoryQueue;
    }
}
const queueManager = new QueueManager();
const QUEUE_NAMES = {
    PROVISION_HIGH: "provision:high",
    PROVISION_NORMAL: "provision:normal",
    NOTIFICATION: "notification"
};
}),
"[project]/Downloads/travel-e-sim-system/app/api/v1/orders/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/order.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/plan.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/auth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$stripe$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/stripe.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/queue.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
async function POST(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
        const authHeader = request.headers.get("authorization");
        let userId = null;
        let userEmail = null;
        if (authHeader) {
            const token = authHeader.replace("Bearer ", "");
            const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
            if (decoded) {
                userId = decoded.userId;
                userEmail = decoded.email;
            }
        }
        const body = await request.json();
        const { clientRequestId, planId, phoneNumber, email, firstName, lastName, purchaseSource = "web" } = body;
        if (!clientRequestId || !planId || !phoneNumber || !email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Missing required fields"
            }, {
                status: 400
            });
        }
        const existingOrder = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            clientRequestId
        });
        if (existingOrder) {
            console.log("[Orders] Returning existing order for clientRequestId:", clientRequestId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                orderId: existingOrder.orderId,
                status: existingOrder.status,
                amount: existingOrder.amount,
                currency: existingOrder.currency,
                paymentIntentClientSecret: existingOrder.stripePaymentIntentClientSecret,
                message: "Order already exists"
            }, {
                status: 200
            });
        }
        const plan = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(planId);
        if (!plan) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Plan not found"
            }, {
                status: 404
            });
        }
        if (!plan.active) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Plan is not active"
            }, {
                status: 400
            });
        }
        const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const paymentIntent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$stripe$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaymentIntent"])({
            amount: plan.price,
            currency: plan.currency,
            metadata: {
                orderId,
                planId: plan._id.toString(),
                userId: userId || "guest",
                phoneNumber
            }
        });
        const order = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
            orderId,
            clientRequestId,
            userId: userId || "guest",
            userEmail: userEmail || email,
            planId: plan._id.toString(),
            phoneNumber,
            amount: plan.price,
            currency: plan.currency,
            paymentMethod: "card",
            paymentStatus: "unpaid",
            status: "pending",
            supplierId: plan.supplierId,
            supplierCode: plan.supplierCode,
            stripePaymentIntentId: paymentIntent.id,
            stripePaymentIntentClientSecret: paymentIntent.client_secret,
            purchaseSource,
            metadata: {
                planName: plan.name,
                dataGB: plan.dataGB,
                validityDays: plan.validityDays,
                customerName: `${firstName} ${lastName}`,
                customerEmail: email
            }
        });
        await order.save();
        console.log("[Orders] Created new order:", orderId);
        // DEV MODE: Marking order as paid and enqueueing provisioning job
        if ("TURBOPACK compile-time truthy", 1) {
            console.log("[Orders] DEV MODE: Marking order as paid and enqueueing provisioning job");
            order.paymentStatus = "paid";
            order.status = "paid";
            await order.save();
            await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queueManager"].enqueue(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QUEUE_NAMES"].PROVISION_HIGH, {
                orderId: order.orderId,
                planId: order.planId,
                userId: order.userId,
                supplierId: order.supplierId,
                supplierCode: order.supplierCode,
                phoneNumber: order.phoneNumber,
                attempt: 0
            });
            console.log("[Orders] Provisioning job enqueued for order:", orderId);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            orderId: order.orderId,
            status: order.status,
            amount: order.amount,
            currency: order.currency,
            paymentIntentClientSecret: paymentIntent.client_secret
        }, {
            status: 201
        });
    } catch (error) {
        console.error("[Orders] Error creating order:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
async function GET(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
        const authHeader = request.headers.get("authorization");
        if (!authHeader) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const token = authHeader.replace("Bearer ", "");
        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
        if (!decoded) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Invalid token"
            }, {
                status: 401
            });
        }
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get("orderId");
        if (orderId) {
            const order = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                orderId,
                userId: decoded.userId
            });
            if (!order) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: "Order not found"
                }, {
                    status: 404
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                order
            });
        }
        const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
            userId: decoded.userId
        }).sort({
            createdAt: -1
        }).limit(50);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            orders
        });
    } catch (error) {
        console.error("[Orders] Error fetching orders:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__22b4d67f._.js.map