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
"[project]/Downloads/travel-e-sim-system/app/api/v1/admin/dashboard/stats/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/db.js [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const ordersCol = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("orders");
        const agentsCol = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("agents");
        const countriesCol = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"])("countries");
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const totalRevenue = await ordersCol.aggregate([
            {
                $match: {
                    paymentStatus: "paid"
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    },
                    count: {
                        $sum: 1
                    }
                }
            }
        ]).toArray();
        const lastMonthRevenue = await ordersCol.aggregate([
            {
                $match: {
                    paymentStatus: "paid",
                    createdAt: {
                        $lt: lastMonth
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]).toArray();
        const revenue = totalRevenue[0]?.total || 0;
        const prevRevenue = lastMonthRevenue[0]?.total || 0;
        const revenueChange = prevRevenue > 0 ? ((revenue - prevRevenue) / prevRevenue * 100).toFixed(1) : 0;
        // Total Orders
        const totalOrders = await ordersCol.countDocuments();
        const lastMonthOrders = await ordersCol.countDocuments({
            createdAt: {
                $lt: lastMonth
            }
        });
        const ordersChange = lastMonthOrders > 0 ? ((totalOrders - lastMonthOrders) / lastMonthOrders * 100).toFixed(1) : 0;
        // Active Agents
        const activeAgents = await agentsCol.countDocuments({
            status: "approved"
        });
        const lastMonthAgents = await agentsCol.countDocuments({
            status: "approved",
            createdAt: {
                $lt: lastMonth
            }
        });
        const agentsChange = lastMonthAgents > 0 ? ((activeAgents - lastMonthAgents) / lastMonthAgents * 100).toFixed(1) : 0;
        // Countries
        const totalCountries = await countriesCol.countDocuments({
            active: true
        });
        const revenueByCountry = await ordersCol.aggregate([
            {
                $match: {
                    paymentStatus: "paid"
                }
            },
            {
                $lookup: {
                    from: "plans",
                    localField: "planId",
                    foreignField: "_id",
                    as: "plan"
                }
            },
            {
                $unwind: "$plan"
            },
            {
                $group: {
                    _id: "$plan.country",
                    revenue: {
                        $sum: "$amount"
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    revenue: -1
                }
            },
            {
                $limit: 10
            }
        ]).toArray();
        const monthlyRevenue = await ordersCol.aggregate([
            {
                $match: {
                    paymentStatus: "paid",
                    createdAt: {
                        $gte: new Date(now.getFullYear(), now.getMonth() - 6, 1)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$createdAt"
                        },
                        month: {
                            $month: "$createdAt"
                        }
                    },
                    revenue: {
                        $sum: "$amount"
                    },
                    orders: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]).toArray();
        // Order status distribution
        const ordersByStatus = await ordersCol.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: {
                        $sum: 1
                    }
                }
            }
        ]).toArray();
        const topAgents = await ordersCol.aggregate([
            {
                $match: {
                    paymentStatus: "paid"
                }
            },
            {
                $lookup: {
                    from: "agents",
                    localField: "userId",
                    foreignField: "_id",
                    as: "agent"
                }
            },
            {
                $unwind: {
                    path: "$agent",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$userId",
                    agentName: {
                        $first: "$agent.name"
                    },
                    revenue: {
                        $sum: "$amount"
                    },
                    orders: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    revenue: -1
                }
            },
            {
                $limit: 5
            }
        ]).toArray();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            stats: {
                revenue: {
                    value: revenue,
                    change: revenueChange
                },
                orders: {
                    value: totalOrders,
                    change: ordersChange
                },
                agents: {
                    value: activeAgents,
                    change: agentsChange
                },
                countries: {
                    value: totalCountries
                }
            },
            charts: {
                revenueByCountry,
                monthlyRevenue,
                ordersByStatus,
                topAgents
            }
        });
    } catch (error) {
        console.error("[Admin Dashboard] Error:", error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__3d77ced8._.js.map