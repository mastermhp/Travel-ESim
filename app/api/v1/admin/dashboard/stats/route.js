import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"

export async function GET() {
  try {
    const ordersCol = await getCollection("orders")
    const agentsCol = await getCollection("agents")
    const countriesCol = await getCollection("countries")

    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

    const totalRevenue = await ordersCol
      .aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
      ])
      .toArray()

    const lastMonthRevenue = await ordersCol
      .aggregate([
        { $match: { paymentStatus: "paid", createdAt: { $lt: lastMonth } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
      .toArray()

    const revenue = totalRevenue[0]?.total || 0
    const prevRevenue = lastMonthRevenue[0]?.total || 0
    const revenueChange = prevRevenue > 0 ? (((revenue - prevRevenue) / prevRevenue) * 100).toFixed(1) : 0

    // Total Orders
    const totalOrders = await ordersCol.countDocuments()
    const lastMonthOrders = await ordersCol.countDocuments({ createdAt: { $lt: lastMonth } })
    const ordersChange =
      lastMonthOrders > 0 ? (((totalOrders - lastMonthOrders) / lastMonthOrders) * 100).toFixed(1) : 0

    // Active Agents
    const activeAgents = await agentsCol.countDocuments({ status: "approved" })
    const lastMonthAgents = await agentsCol.countDocuments({ status: "approved", createdAt: { $lt: lastMonth } })
    const agentsChange =
      lastMonthAgents > 0 ? (((activeAgents - lastMonthAgents) / lastMonthAgents) * 100).toFixed(1) : 0

    // Countries
    const totalCountries = await countriesCol.countDocuments({ active: true })

    const revenueByCountry = await ordersCol
      .aggregate([
        { $match: { paymentStatus: "paid" } },
        { $lookup: { from: "plans", localField: "planId", foreignField: "_id", as: "plan" } },
        { $unwind: "$plan" },
        { $group: { _id: "$plan.country", revenue: { $sum: "$amount" }, count: { $sum: 1 } } },
        { $sort: { revenue: -1 } },
        { $limit: 10 },
      ])
      .toArray()

    const monthlyRevenue = await ordersCol
      .aggregate([
        { $match: { paymentStatus: "paid", createdAt: { $gte: new Date(now.getFullYear(), now.getMonth() - 6, 1) } } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            revenue: { $sum: "$amount" },
            orders: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ])
      .toArray()

    // Order status distribution
    const ordersByStatus = await ordersCol.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]).toArray()

    const topAgents = await ordersCol
      .aggregate([
        { $match: { paymentStatus: "paid" } },
        { $lookup: { from: "agents", localField: "userId", foreignField: "_id", as: "agent" } },
        { $unwind: { path: "$agent", preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: "$userId",
            agentName: { $first: "$agent.name" },
            revenue: { $sum: "$amount" },
            orders: { $sum: 1 },
          },
        },
        { $sort: { revenue: -1 } },
        { $limit: 5 },
      ])
      .toArray()

    return NextResponse.json({
      success: true,
      stats: {
        revenue: { value: revenue, change: revenueChange },
        orders: { value: totalOrders, change: ordersChange },
        agents: { value: activeAgents, change: agentsChange },
        countries: { value: totalCountries },
      },
      charts: {
        revenueByCountry,
        monthlyRevenue,
        ordersByStatus,
        topAgents,
      },
    })
  } catch (error) {
    console.error("[Admin Dashboard] Error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
