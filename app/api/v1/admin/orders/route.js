import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"

// GET - Fetch all orders
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const ordersCol = await getCollection("orders")
    const plansCol = await getCollection("plans")
    const skip = (page - 1) * limit

    const filter = {}
    if (status) filter.status = status
    if (search) {
      filter.$or = [{ orderId: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
    }

    const orders = await ordersCol
      .aggregate([
        { $match: filter },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $addFields: {
            planIdObj: { $toObjectId: "$planId" },
          },
        },
        {
          $lookup: {
            from: "plans",
            localField: "planIdObj",
            foreignField: "_id",
            as: "planDetails",
          },
        },
        {
          $lookup: {
            from: "agentorders",
            localField: "_id",
            foreignField: "orderId",
            as: "agentOrderDetails",
          },
        },
        {
          $addFields: {
            plan: { $arrayElemAt: ["$planDetails", 0] },
            agentOrder: { $arrayElemAt: ["$agentOrderDetails", 0] },
            customerEmail: {
              $ifNull: ["$email", { $arrayElemAt: ["$agentOrderDetails.customerEmail", 0] }],
            },
            customerPhone: {
              $ifNull: ["$phone", { $arrayElemAt: ["$agentOrderDetails.customerPhone", 0] }],
            },
          },
        },
        {
          $project: {
            planDetails: 0,
            agentOrderDetails: 0,
            planIdObj: 0,
          },
        },
      ])
      .toArray()

    const total = await ordersCol.countDocuments(filter)

    console.log(`[Admin Orders] Fetched ${orders.length} orders`)
    console.log("[Admin Orders] Sample order:", JSON.stringify(orders[0], null, 2))

    return NextResponse.json({
      success: true,
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[Admin Orders] Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST - Admin actions on orders (refund, cancel, retry)
export async function POST(request) {
  try {
    const { orderId, action, reason } = await request.json()

    const ordersCol = await getCollection("orders")
    const order = await ordersCol.findOne({ _id: new ObjectId(orderId) })

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    if (action === "cancel") {
      await ordersCol.updateOne(
        { _id: new ObjectId(orderId) },
        { $set: { status: "cancelled", cancelReason: reason, updatedAt: new Date() } },
      )
    } else if (action === "refund") {
      await ordersCol.updateOne(
        { _id: new ObjectId(orderId) },
        { $set: { status: "refunded", refundReason: reason, updatedAt: new Date() } },
      )
    }

    return NextResponse.json({ success: true, message: `Order ${action}ed successfully` })
  } catch (error) {
    console.error("[Admin Orders] Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
