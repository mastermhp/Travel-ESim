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
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/Downloads/travel-e-sim-system/lib/db.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// MongoDB connection utility
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getCollection",
    ()=>getCollection,
    "getDb",
    ()=>getDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
const uri = process.env.MONGODB_URI;
const options = {
    maxPoolSize: 10,
    minPoolSize: 5
};
let client;
let clientPromise;
if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env file");
}
if ("TURBOPACK compile-time truthy", 1) {
    if (!/*TURBOPACK member replacement*/ __turbopack_context__.g._mongoClientPromise) {
        client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri, options);
        /*TURBOPACK member replacement*/ __turbopack_context__.g._mongoClientPromise = client.connect();
    }
    clientPromise = /*TURBOPACK member replacement*/ __turbopack_context__.g._mongoClientPromise;
} else //TURBOPACK unreachable
;
const __TURBOPACK__default__export__ = clientPromise;
async function getDb() {
    const client = await clientPromise;
    return client.db(process.env.MONGODB_DB_NAME || "travel_esim");
}
async function getCollection(collectionName) {
    const db = await getDb();
    return db.collection(collectionName);
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

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
    "extractToken",
    ()=>extractToken,
    "generateAccessToken",
    ()=>generateAccessToken,
    "getCurrentUser",
    ()=>getCurrentUser,
    "logSecurityEvent",
    ()=>logSecurityEvent,
    "verifyAccessToken",
    ()=>verifyAccessToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const JWT_EXPIRES_IN = "1h";
function generateAccessToken(user) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign({
        userId: user._id.toString(),
        email: user.email,
        role: user.role
    }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}
function verifyAccessToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
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
"[project]/Downloads/travel-e-sim-system/app/api/v1/auth/register/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Registration API endpoint
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
        // Validate required fields
        const { name, email, phone, password, username, language, referralCodeUsed, role } = body;
        if (!name || !email || !phone || !password || !username) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Missing required fields"
            }, {
                status: 400
            });
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Invalid email format"
            }, {
                status: 400
            });
        }
        // Validate password strength
        if (password.length < 8) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Password must be at least 8 characters"
            }, {
                status: 400
            });
        }
        // Create user
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$user$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUser"])({
            name,
            email,
            phone,
            password,
            username,
            language: language || "en",
            referralCodeUsed,
            role: role || "customer"
        });
        // Create session
        const deviceInfo = request.headers.get("user-agent") || "Unknown";
        const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown";
        const refreshToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$session$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSession"])(user._id.toString(), deviceInfo, ip);
        // Generate access token
        const accessToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateAccessToken"])(user);
        // Log event
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSecurityEvent"])(user._id.toString(), "USER_REGISTERED", {
            email,
            method: "email"
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            userId: user._id.toString(),
            token: accessToken,
            refreshToken,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                phone: user.phone,
                username: user.username,
                role: user.role,
                referralCode: user.referralCode
            }
        }, {
            status: 201
        });
    } catch (error) {
        console.error("[v0] Registration error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: error.message || "Registration failed"
        }, {
            status: 400
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__59010900._.js.map