import { getDb } from "../db"

export const CountryModel = {
  collection: "countries",

  async create(countryData) {
    const db = await getDb()
    const country = {
      ...countryData,
      active: countryData.active !== undefined ? countryData.active : true,
      supported: countryData.supported !== undefined ? countryData.supported : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const result = await db.collection(this.collection).insertOne(country)
    return { ...country, _id: result.insertedId }
  },

  async findAll(query = {}) {
    const db = await getDb()
    return db.collection(this.collection).find(query).sort({ name: 1 }).toArray()
  },

  async findByCode(code) {
    const db = await getDb()
    return db.collection(this.collection).findOne({ code: code.toUpperCase() })
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

  async getActiveCountries() {
    return this.findAll({ active: true, supported: true })
  },

  async countByRegion() {
    const db = await getDb()
    return db
      .collection(this.collection)
      .aggregate([
        { $match: { active: true } },
        { $group: { _id: "$region", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray()
  },
}
