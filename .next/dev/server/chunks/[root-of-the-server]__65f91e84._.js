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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/Downloads/travel-e-sim-system/lib/models/user.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// User model and utilities
__turbopack_context__.s([
    "createUser",
    ()=>createUser,
    "findUserByEmail",
    ()=>findUserByEmail,
    "findUserById",
    ()=>findUserById,
    "findUserByPhone",
    ()=>findUserByPhone,
    "findUserByUsername",
    ()=>findUserByUsername,
    "updateUser",
    ()=>updateUser,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
async function createUser(userData) {
    const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("users");
    // Check if user already exists
    const existingUser = await users.findOne({
        $or: [
            {
                email: userData.email
            },
            {
                phone: userData.phone
            },
            {
                username: userData.username
            }
        ]
    });
    if (existingUser) {
        if (existingUser.email === userData.email) {
            throw new Error("Email already registered");
        }
        if (existingUser.phone === userData.phone) {
            throw new Error("Phone number already registered");
        }
        if (existingUser.username === userData.username) {
            throw new Error("Username already taken");
        }
    }
    // Hash password
    const passwordHash = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(userData.password, 12);
    // Generate unique referral code
    const referralCode = await generateUniqueReferralCode();
    const user = {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        passwordHash,
        role: userData.role || "customer",
        referralCode,
        referredBy: userData.referralCodeUsed || null,
        loginMethods: {
            emailPassword: true,
            phoneOtp: true,
            google: false,
            apple: false,
            facebook: false
        },
        mfa: {
            enabled: false,
            methods: []
        },
        language: userData.language || "en",
        isVerified: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const result = await users.insertOne(user);
    // Record referral if provided
    if (userData.referralCodeUsed) {
        await recordReferral(userData.referralCodeUsed, result.insertedId);
    }
    return {
        ...user,
        _id: result.insertedId
    };
}
async function findUserByEmail(email) {
    const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("users");
    return users.findOne({
        email
    });
}
async function findUserByPhone(phone) {
    const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("users");
    return users.findOne({
        phone
    });
}
async function findUserById(userId) {
    const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("users");
    const { ObjectId } = __turbopack_context__.r("[externals]/mongodb [external] (mongodb, cjs)");
    return users.findOne({
        _id: new ObjectId(userId)
    });
}
async function findUserByUsername(username) {
    const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("users");
    return users.findOne({
        username
    });
}
async function verifyPassword(plainPassword, hashedPassword) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(plainPassword, hashedPassword);
}
async function updateUser(userId, updates) {
    const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("users");
    const { ObjectId } = __turbopack_context__.r("[externals]/mongodb [external] (mongodb, cjs)");
    const result = await users.updateOne({
        _id: new ObjectId(userId)
    }, {
        $set: {
            ...updates,
            updatedAt: new Date()
        }
    });
    return result.modifiedCount > 0;
}
async function generateUniqueReferralCode() {
    const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("users");
    let code;
    let exists = true;
    while(exists){
        code = "ESIM" + Math.random().toString(36).substring(2, 8).toUpperCase();
        const existing = await users.findOne({
            referralCode: code
        });
        exists = !!existing;
    }
    return code;
}
async function recordReferral(referralCode, newUserId) {
    const users = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("users");
    const referrals = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("referrals");
    const referrer = await users.findOne({
        referralCode
    });
    if (!referrer) return;
    await referrals.insertOne({
        referrerId: referrer._id,
        referredUserId: newUserId,
        referralCode,
        status: "pending",
        createdAt: new Date()
    });
}
}),
"[project]/Downloads/travel-e-sim-system/lib/models/session.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Session management
__turbopack_context__.s([
    "createSession",
    ()=>createSession,
    "deleteAllUserSessions",
    ()=>deleteAllUserSessions,
    "deleteSession",
    ()=>deleteSession,
    "findSessionByRefreshToken",
    ()=>findSessionByRefreshToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
async function createSession(userId, deviceInfo, ip) {
    const sessions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("sessions");
    const refreshToken = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(64).toString("hex");
    const refreshTokenHash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(refreshToken).digest("hex");
    const session = {
        userId,
        refreshTokenHash,
        deviceInfo,
        ip,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };
    await sessions.insertOne(session);
    return refreshToken;
}
async function findSessionByRefreshToken(refreshToken) {
    const sessions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("sessions");
    const refreshTokenHash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(refreshToken).digest("hex");
    return sessions.findOne({
        refreshTokenHash,
        expiresAt: {
            $gt: new Date()
        }
    });
}
async function deleteSession(refreshToken) {
    const sessions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("sessions");
    const refreshTokenHash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(refreshToken).digest("hex");
    return sessions.deleteOne({
        refreshTokenHash
    });
}
async function deleteAllUserSessions(userId) {
    const sessions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("sessions");
    return sessions.deleteMany({
        userId
    });
}
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
    "verifyAdminAuth",
    ()=>verifyAdminAuth,
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
async function verifyAdminAuth(request) {
    const token = extractToken(request);
    if (!token) {
        return {
            isValid: false,
            error: "No token provided"
        };
    }
    const payload = verifyAccessToken(token);
    if (!payload) {
        return {
            isValid: false,
            error: "Invalid token"
        };
    }
    // Check if user has admin role
    if (payload.role !== "admin") {
        return {
            isValid: false,
            error: "Admin access required"
        };
    }
    return {
        isValid: true,
        user: payload
    };
}
}),
"[project]/Downloads/travel-e-sim-system/app/api/v1/auth/login/email/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Email login API endpoint
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$user$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/user.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$session$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/session.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/auth.js [app-route] (ecmascript)");
;
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Email and password required"
            }, {
                status: 400
            });
        }
        // Rate limiting
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkRateLimit"])(email)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSecurityEvent"])(null, "RATE_LIMIT_EXCEEDED", {
                email
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Too many login attempts. Please try again later."
            }, {
                status: 429
            });
        }
        // Find user
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$user$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findUserByEmail"])(email);
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Invalid credentials"
            }, {
                status: 401
            });
        }
        // Check if user is active
        if (!user.isActive) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Account is disabled"
            }, {
                status: 403
            });
        }
        // Verify password
        const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$user$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyPassword"])(password, user.passwordHash);
        if (!isValid) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSecurityEvent"])(user._id.toString(), "FAILED_LOGIN", {
                email
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Invalid credentials"
            }, {
                status: 401
            });
        }
        // Check if MFA is required
        if (user.mfa.enabled) {
            // Return MFA challenge
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                mfaRequired: true,
                mfaMethods: user.mfa.methods,
                tempToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateAccessToken"])({
                    ...user,
                    temp: true
                })
            });
        }
        // Create session
        const deviceInfo = request.headers.get("user-agent") || "Unknown";
        const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown";
        const refreshToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$session$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSession"])(user._id.toString(), deviceInfo, ip);
        // Generate access token
        const accessToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateAccessToken"])(user);
        // Log successful login
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSecurityEvent"])(user._id.toString(), "SUCCESSFUL_LOGIN", {
            email,
            method: "email"
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            token: accessToken,
            refreshToken,
            mfaRequired: false,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                phone: user.phone,
                username: user.username,
                role: user.role,
                referralCode: user.referralCode
            }
        });
    } catch (error) {
        console.error("[v0] Login error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Login failed"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__65f91e84._.js.map