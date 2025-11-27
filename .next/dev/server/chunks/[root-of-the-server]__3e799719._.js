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
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/Downloads/travel-e-sim-system/lib/models/country.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CountryModel",
    ()=>CountryModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/db.js [app-route] (ecmascript)");
;
const CountryModel = {
    collection: "countries",
    async create (countryData) {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        const country = {
            ...countryData,
            active: countryData.active !== undefined ? countryData.active : true,
            supported: countryData.supported !== undefined ? countryData.supported : true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const result = await db.collection(this.collection).insertOne(country);
        return {
            ...country,
            _id: result.insertedId
        };
    },
    async findAll (query = {}) {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        return db.collection(this.collection).find(query).sort({
            name: 1
        }).toArray();
    },
    async findByCode (code) {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        return db.collection(this.collection).findOne({
            code: code.toUpperCase()
        });
    },
    async findById (id) {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        const { ObjectId } = __turbopack_context__.r("[externals]/mongodb [external] (mongodb, cjs)");
        return db.collection(this.collection).findOne({
            _id: new ObjectId(id)
        });
    },
    async update (id, updateData) {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        const { ObjectId } = __turbopack_context__.r("[externals]/mongodb [external] (mongodb, cjs)");
        const result = await db.collection(this.collection).updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        });
        return result.modifiedCount > 0;
    },
    async delete (id) {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        const { ObjectId } = __turbopack_context__.r("[externals]/mongodb [external] (mongodb, cjs)");
        const result = await db.collection(this.collection).deleteOne({
            _id: new ObjectId(id)
        });
        return result.deletedCount > 0;
    },
    async getActiveCountries () {
        return this.findAll({
            active: true,
            supported: true
        });
    },
    async countByRegion () {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        return db.collection(this.collection).aggregate([
            {
                $match: {
                    active: true
                }
            },
            {
                $group: {
                    _id: "$region",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]).toArray();
    }
};
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
"[project]/Downloads/travel-e-sim-system/app/api/v1/admin/plan/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/plan.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$country$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/country.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/auth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/redis.js [app-route] (ecmascript)");
;
;
;
;
;
async function POST(request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Authorization required"
            }, {
                status: 401
            });
        }
        const token = authHeader.replace("Bearer ", "");
        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
        if (!decoded || decoded.role !== "admin") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Admin access required"
            }, {
                status: 403
            });
        }
        const body = await request.json();
        const { country, name, dataGB, validityDays, price, currency, costPrice, supplierId, supplierCode, isUnlimited, fairUseLimitGB, active, fallbackSupplierId, isCustomPlan } = body;
        console.log("[Admin Plan API] Creating custom plan:");
        console.log("[Admin Plan API]   Name:", name);
        console.log("[Admin Plan API]   Country:", country);
        console.log("[Admin Plan API]   Provider:", supplierId);
        console.log("[Admin Plan API]   Provider Code:", supplierCode);
        console.log("[Admin Plan API]   Retail Price:", price, currency);
        console.log("[Admin Plan API]   Cost Price:", costPrice, currency);
        console.log("[Admin Plan API]   Margin:", costPrice ? `${((price - costPrice) / price * 100).toFixed(2)}%` : "N/A");
        // </CHANGE>
        if (!country || !name || !validityDays || !price || !currency) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Country, name, validity, price, and currency are required"
            }, {
                status: 400
            });
        }
        // Verify country exists
        const countryExists = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$country$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CountryModel"].findByCode(country);
        if (!countryExists) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Country not found"
            }, {
                status: 404
            });
        }
        const plan = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanModel"].create({
            country: country.toUpperCase(),
            name,
            dataGB: isUnlimited ? null : dataGB,
            validityDays,
            price: Number.parseFloat(price),
            currency: currency.toUpperCase(),
            costPrice: costPrice ? Number.parseFloat(costPrice) : null,
            supplierId: supplierId || "esimgo",
            supplierCode,
            fallbackSupplierId: fallbackSupplierId || null,
            isUnlimited: isUnlimited || false,
            fairUseLimitGB: fairUseLimitGB || null,
            active,
            isCustomPlan: isCustomPlan !== undefined ? isCustomPlan : true,
            providerSynced: false,
            salesCount: 0
        });
        console.log("[Admin Plan API] ✅ Custom plan created successfully!");
        console.log("[Admin Plan API]   Plan ID:", plan._id.toString());
        console.log("[Admin Plan API]   Provider:", plan.supplierId);
        console.log("[Admin Plan API]   Fallback:", plan.fallbackSupplierId || "none");
        // </CHANGE>
        // Clear plans cache for this country
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheDelete"])(`plans:${country.toUpperCase()}`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheDelete"])("plans:all");
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            plan,
            message: "Plan created successfully"
        }, {
            status: 201
        });
    } catch (error) {
        console.error("[Admin Plan API] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create plan"
        }, {
            status: 500
        });
    }
}
async function GET(request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Authorization required"
            }, {
                status: 401
            });
        }
        const token = authHeader.replace("Bearer ", "");
        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
        if (!decoded || decoded.role !== "admin") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Admin access required"
            }, {
                status: 403
            });
        }
        const { searchParams } = new URL(request.url);
        const country = searchParams.get("country");
        const plans = country ? await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanModel"].findByCountry(country) : await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanModel"].findAll();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            plans,
            count: plans.length
        });
    } catch (error) {
        console.error("[Admin Plan API] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch plans"
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Authorization required"
            }, {
                status: 401
            });
        }
        const token = authHeader.replace("Bearer ", "");
        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
        if (!decoded || decoded.role !== "admin") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Admin access required"
            }, {
                status: 403
            });
        }
        const body = await request.json();
        const { id, ...updateData } = body;
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Plan ID is required"
            }, {
                status: 400
            });
        }
        // Get the plan to clear country-specific cache
        const plan = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanModel"].findById(id);
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanModel"].update(id, updateData);
        if (!updated) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Plan not found"
            }, {
                status: 404
            });
        }
        // Clear plans cache
        if (plan) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheDelete"])(`plans:${plan.country}`);
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheDelete"])("plans:all");
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Plan updated successfully"
        });
    } catch (error) {
        console.error("[Admin Plan API] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to update plan"
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Authorization required"
            }, {
                status: 401
            });
        }
        const token = authHeader.replace("Bearer ", "");
        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
        if (!decoded || decoded.role !== "admin") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Admin access required"
            }, {
                status: 403
            });
        }
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Plan ID is required"
            }, {
                status: 400
            });
        }
        // Get the plan to clear country-specific cache
        const plan = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanModel"].findById(id);
        const deleted = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlanModel"].delete(id);
        if (!deleted) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Plan not found"
            }, {
                status: 404
            });
        }
        // Clear plans cache
        if (plan) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheDelete"])(`plans:${plan.country}`);
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$redis$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheDelete"])("plans:all");
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Plan deleted successfully"
        });
    } catch (error) {
        console.error("[Admin Plan API] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to delete plan"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3e799719._.js.map