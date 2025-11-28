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
"[project]/Downloads/travel-e-sim-system/lib/models/agent.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Agent",
    ()=>Agent,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const agentSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    userId: {
        type: String,
        index: true
    },
    agentId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        index: true
    },
    countryCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    businessType: {
        type: String,
        required: true
    },
    experience: {
        type: String
    },
    status: {
        type: String,
        enum: [
            "pending",
            "approved",
            "rejected",
            "suspended"
        ],
        default: "pending",
        index: true
    },
    commissionRate: {
        type: Number,
        default: 15,
        min: 0,
        max: 100
    },
    tier: {
        type: String,
        enum: [
            "bronze",
            "silver",
            "gold",
            "platinum"
        ],
        default: "bronze"
    },
    totalSales: {
        type: Number,
        default: 0
    },
    referralCode: {
        type: String,
        unique: true,
        index: true
    },
    payoutDetails: {
        method: {
            type: String,
            enum: [
                "bank_transfer",
                "mobile_money",
                "stripe",
                "crypto"
            ],
            default: "bank_transfer"
        },
        bankName: String,
        accountNumber: String,
        accountName: String,
        swiftCode: String,
        iban: String,
        mobileMoneyProvider: String,
        mobileMoneyNumber: String,
        cryptoAddress: String,
        cryptoCurrency: String
    },
    approvedBy: {
        type: String
    },
    approvedAt: {
        type: Date
    },
    rejectedReason: String,
    rejectedAt: Date
}, {
    timestamps: true
});
agentSchema.index({
    country: 1,
    status: 1
});
agentSchema.index({
    tier: 1,
    status: 1
});
if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Agent) {
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Agent;
}
const Agent = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Agent", agentSchema);
const __TURBOPACK__default__export__ = Agent;
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
"[project]/Downloads/travel-e-sim-system/lib/models/order.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Order) {
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Order;
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connection.models.Order;
}
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
            "mobile_money",
            "agent_cash",
            "agent_remote"
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
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Order", orderSchema);
}),
"[project]/Downloads/travel-e-sim-system/lib/models/agent-order.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AgentOrder",
    ()=>AgentOrder,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const agentOrderSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    agentId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Agent",
        required: true,
        index: true
    },
    orderId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Order",
        required: true,
        index: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String
    },
    planId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Plan",
        required: true
    },
    type: {
        type: String,
        enum: [
            "cash",
            "remote"
        ],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: [
            "pending",
            "paid",
            "failed"
        ],
        default: "pending",
        index: true
    },
    commissionAmount: {
        type: Number,
        required: true
    },
    commissionStatus: {
        type: String,
        enum: [
            "pending",
            "paid"
        ],
        default: "pending"
    },
    planPrice: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "USD"
    }
}, {
    timestamps: true
});
agentOrderSchema.index({
    agentId: 1,
    createdAt: -1
});
agentOrderSchema.index({
    paymentStatus: 1,
    commissionStatus: 1
});
if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.AgentOrder) {
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.AgentOrder;
}
const AgentOrder = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("AgentOrder", agentOrderSchema);
const __TURBOPACK__default__export__ = AgentOrder;
}),
"[project]/Downloads/travel-e-sim-system/lib/models/agent-wallet.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AgentWallet",
    ()=>AgentWallet,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const agentWalletSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    agentId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Agent",
        required: true,
        unique: true,
        index: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    reserved: {
        type: Number,
        default: 0,
        min: 0
    },
    currency: {
        type: String,
        default: "USD"
    },
    totalEarned: {
        type: Number,
        default: 0
    },
    totalWithdrawn: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.AgentWallet) {
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.AgentWallet;
}
const AgentWallet = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("AgentWallet", agentWalletSchema);
const __TURBOPACK__default__export__ = AgentWallet;
}),
"[project]/Downloads/travel-e-sim-system/lib/models/ledger-entry.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LedgerEntry",
    ()=>LedgerEntry,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const ledgerEntrySchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    agentId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: "Agent",
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: [
            "commission",
            "debit",
            "refund",
            "withdrawal",
            "adjustment"
        ],
        required: true,
        index: true
    },
    amount: {
        type: Number,
        required: true
    },
    balanceAfter: {
        type: Number,
        required: true
    },
    meta: {
        orderId: {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
            ref: "Order"
        },
        payoutId: {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
            ref: "Payout"
        },
        description: String
    }
}, {
    timestamps: true
});
ledgerEntrySchema.index({
    agentId: 1,
    createdAt: -1
});
if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.LedgerEntry) {
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.LedgerEntry;
}
const LedgerEntry = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("LedgerEntry", ledgerEntrySchema);
const __TURBOPACK__default__export__ = LedgerEntry;
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
"[project]/Downloads/travel-e-sim-system/app/api/v1/agent/orders/cash/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$agent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/agent.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/plan.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/order.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$agent$2d$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/agent-order.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$agent$2d$wallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/agent-wallet.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$ledger$2d$entry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/models/ledger-entry.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-e-sim-system/lib/queue.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
async function POST(request) {
    try {
        console.log("[Agent Cash Sale] Starting cash sale");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, process.env.JWT_SECRET || "your-secret-key");
        if (decoded.role !== "agent") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid agent token"
            }, {
                status: 403
            });
        }
        const agent = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$agent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Agent"].findById(decoded.id);
        if (!agent || agent.status !== "approved") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Agent not approved"
            }, {
                status: 403
            });
        }
        const { planId, customerEmail, customerPhone, customerName } = await request.json();
        console.log("[Agent Cash Sale] Agent:", agent.agentId);
        console.log("[Agent Cash Sale] Plan:", planId);
        console.log("[Agent Cash Sale] Customer:", customerEmail);
        const plan = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$plan$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Plan"].findById(planId);
        if (!plan || !plan.active) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Plan not found or inactive"
            }, {
                status: 404
            });
        }
        const commissionAmount = plan.price * agent.commissionRate / 100;
        console.log("[Agent Cash Sale] Plan price:", plan.price, plan.currency);
        console.log("[Agent Cash Sale] Commission rate:", agent.commissionRate + "%");
        console.log("[Agent Cash Sale] Commission amount:", commissionAmount);
        const orderId = `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const clientRequestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const order = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
            orderId,
            clientRequestId,
            userId: agent._id.toString(),
            userEmail: customerEmail,
            phoneNumber: customerPhone || agent.phone,
            planId: plan._id.toString(),
            amount: plan.price,
            currency: plan.currency,
            paymentMethod: "agent_cash",
            paymentStatus: "paid",
            status: "paid",
            provisionStatus: "pending",
            purchaseSource: "agent",
            agentId: agent._id.toString(),
            supplierId: plan.supplierId,
            supplierCode: plan.supplierCode,
            fallbackSupplierId: plan.fallbackSupplierId,
            metadata: {
                customerName,
                agentName: agent.name,
                saleType: "cash"
            }
        });
        await order.save();
        console.log("[Agent Cash Sale] Order created:", orderId);
        const agentOrder = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$agent$2d$order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AgentOrder"]({
            agentId: agent._id,
            orderId: order._id,
            customerEmail,
            customerPhone,
            planId: plan._id,
            type: "cash",
            paymentStatus: "paid",
            commissionAmount,
            commissionStatus: "pending",
            planPrice: plan.price,
            currency: plan.currency
        });
        await agentOrder.save();
        console.log("[Agent Cash Sale] Agent order created");
        let wallet = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$agent$2d$wallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AgentWallet"].findOne({
            agentId: agent._id
        });
        if (!wallet) {
            wallet = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$agent$2d$wallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AgentWallet"]({
                agentId: agent._id,
                balance: 0,
                reserved: 0,
                currency: plan.currency
            });
        }
        wallet.balance += commissionAmount;
        wallet.totalEarned += commissionAmount;
        await wallet.save();
        console.log("[Agent Cash Sale] Wallet updated, new balance:", wallet.balance);
        const ledger = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$ledger$2d$entry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LedgerEntry"]({
            agentId: agent._id,
            type: "commission",
            amount: commissionAmount,
            balanceAfter: wallet.balance,
            meta: {
                orderId: order._id,
                description: `Commission from cash sale - ${plan.name}`
            }
        });
        await ledger.save();
        console.log("[Agent Cash Sale] Ledger entry created");
        await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$models$2f$agent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Agent"].updateOne({
            _id: agent._id
        }, {
            $inc: {
                totalSales: 1
            }
        });
        console.log("[Agent Cash Sale] Total sales incremented");
        agentOrder.commissionStatus = "paid";
        await agentOrder.save();
        await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queueManager"].enqueue(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$lib$2f$queue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QUEUE_NAMES"].PROVISION_NORMAL, {
            orderId: order.orderId,
            planId: plan._id.toString(),
            userId: agent._id.toString()
        });
        console.log("[Agent Cash Sale] Job enqueued for provisioning");
        console.log("[Agent Cash Sale] Sale completed successfully");
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            orderId: order.orderId,
            agentOrderId: agentOrder._id.toString(),
            commission: commissionAmount,
            newBalance: wallet.balance,
            message: "Sale recorded successfully. eSIM will be provisioned shortly."
        });
    } catch (error) {
        console.error("[Agent Cash Sale] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$e$2d$sim$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to process sale",
            details: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__393b7fbd._.js.map