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
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/Downloads/travel-e-sim-system/app/api/v1/admin/agents/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status") // pending, approved, rejected
        ;
        if (!status) {
            // Fetch all agents from agents collection
            console.log("[Admin] Fetching all agents");
            const agentsCol = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("agents");
            const agents = await agentsCol.aggregate([
                {
                    $lookup: {
                        from: "agentwallets",
                        localField: "_id",
                        foreignField: "agentId",
                        as: "wallet"
                    }
                },
                {
                    $unwind: {
                        path: "$wallet",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 1,
                        agentId: 1,
                        name: 1,
                        email: 1,
                        phone: 1,
                        status: 1,
                        commissionRate: 1,
                        businessName: 1,
                        businessAddress: 1,
                        idDocument: 1,
                        isBlocked: 1,
                        createdAt: 1,
                        balance: "$wallet.balance",
                        totalEarned: "$wallet.totalEarned"
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                }
            ]).toArray();
            console.log(`[Admin] Found ${agents.length} agents`);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                agents
            });
        }
        console.log("[Admin] Fetching agent applications with status:", status);
        const agentApplications = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("agentApplications");
        const filter = {
            status
        };
        const applications = await agentApplications.find(filter).sort({
            submittedAt: -1
        }).toArray();
        console.log(`[Admin] Found ${applications.length} agent applications`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            agents: applications
        });
    } catch (error) {
        console.error("[Admin] Error fetching agent applications:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const { agentId, action, commissionRate, currency, rejectionReason } = await request.json();
        console.log("[Admin] Processing agent application action:", {
            agentId,
            action
        });
        const agentApplications = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("agentApplications");
        const agents = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("agents");
        const agentWallets = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("agentWallets");
        const application = await agentApplications.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](agentId)
        });
        if (!application) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Application not found"
            }, {
                status: 404
            });
        }
        if (action === "approve") {
            const tempPassword = `Agent${Date.now().toString().slice(-6)}`;
            const newAgentId = `agent_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
            const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(tempPassword, 10);
            const newAgent = {
                agentId: newAgentId,
                name: application.name,
                email: application.email,
                password: hashedPassword,
                phone: application.phone,
                country: application.country,
                city: application.city,
                businessType: application.businessType,
                experience: application.experience,
                status: "approved",
                commissionRate: commissionRate || 5,
                currency: currency || "USD",
                referralCode: `REF${Date.now()}`,
                totalSales: 0,
                tier: "bronze",
                approvedAt: new Date(),
                createdAt: new Date()
            };
            const agentResult = await agents.insertOne(newAgent);
            console.log("[Admin] ✅ Agent created:", newAgentId);
            console.log("[Admin] 🔑 Temporary password:", tempPassword);
            await agentWallets.insertOne({
                agentId: agentResult.insertedId.toString(),
                balance: 0,
                reserved: 0,
                currency: currency || "USD",
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log("[Admin] 💰 Wallet created for agent:", newAgentId);
            await agentApplications.updateOne({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](agentId)
            }, {
                $set: {
                    status: "approved",
                    reviewedAt: new Date(),
                    agentId: newAgentId,
                    commissionRate: commissionRate,
                    currency: currency
                }
            });
            console.log("[Admin] ✅ Application approved:", application.email);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                agent: {
                    ...newAgent,
                    _id: agentResult.insertedId
                },
                tempPassword: tempPassword,
                message: `Agent approved. Temporary password: ${tempPassword}`
            });
        } else if (action === "reject") {
            await agentApplications.updateOne({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](agentId)
            }, {
                $set: {
                    status: "rejected",
                    reviewedAt: new Date(),
                    reviewNotes: rejectionReason || "Application rejected"
                }
            });
            console.log("[Admin] ❌ Application rejected:", application.email);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: "Application rejected",
                agent: {
                    email: application.email
                }
            });
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Invalid action"
            }, {
                status: 400
            });
        }
    } catch (error) {
        console.error("[Admin] Error processing application:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
async function PATCH(request) {
    try {
        const { agentId, updates } = await request.json();
        console.log("[Admin] Updating agent:", agentId, updates);
        const agents = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("agents");
        const result = await agents.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](agentId)
        }, {
            $set: {
                ...updates,
                updatedAt: new Date()
            }
        });
        if (result.matchedCount === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Agent not found"
            }, {
                status: 404
            });
        }
        console.log("[Admin] Agent updated");
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Agent updated successfully"
        });
    } catch (error) {
        console.error("[Admin] Error updating agent:", error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__14284ba1._.js.map