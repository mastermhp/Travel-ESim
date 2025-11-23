import { getDb } from "../db"

export const PlanModel = {
  collection: "plans",

  async create(planData) {
    const db = await getDb()
    const plan = {
      ...planData,
      active: planData.active !== undefined ? planData.active : true,
      isUnlimited: planData.isUnlimited || false,
      fairUseLimitGB: planData.fairUseLimitGB || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const result = await db.collection(this.collection).insertOne(plan)
    return { ...plan, _id: result.insertedId }
  },

  async findAll(query = {}) {
    const db = await getDb()
    return db.collection(this.collection).find(query).sort({ price: 1 }).toArray()
  },

  async findByCountry(countryCode) {
    const db = await getDb()
    return db
      .collection(this.collection)
      .find({ country: countryCode.toUpperCase(), active: true })
      .sort({ price: 1 })
      .toArray()
  },

  async findById(id) {
    const db = await getDb()
    const { ObjectId } = require("mongodb")
    return db.collection(this.collection).findOne({ _id: new ObjectId(id) })
  },

  async update(id, updateData) {
    const db = await getDb()
    const { ObjectId } = require("mongodb")
    const result = await db
      .collection(this.collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...updateData, updatedAt: new Date() } })
    return result.modifiedCount > 0
  },

  async delete(id) {
    const db = await getDb()
    const { ObjectId } = require("mongodb")
    const result = await db.collection(this.collection).deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  },

  async getPopularPlans(limit = 10) {
    const db = await getDb()
    return db.collection(this.collection).find({ active: true }).sort({ salesCount: -1 }).limit(limit).toArray()
  },

  async searchPlans(filters = {}) {
    const db = await getDb()
    const query = { active: true }

    if (filters.country) query.country = filters.country.toUpperCase()
    if (filters.minPrice) query.price = { ...query.price, $gte: Number.parseFloat(filters.minPrice) }
    if (filters.maxPrice) query.price = { ...query.price, $lte: Number.parseFloat(filters.maxPrice) }
    if (filters.minData) query.dataGB = { ...query.dataGB, $gte: Number.parseInt(filters.minData) }
    if (filters.maxData) query.dataGB = { ...query.dataGB, $lte: Number.parseInt(filters.maxData) }

    return db.collection(this.collection).find(query).sort({ price: 1 }).toArray()
  },
}
