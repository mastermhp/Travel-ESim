import mongoose from "mongoose"

const planSchema = new mongoose.Schema(
  {
    country: { type: String, required: true, index: true },
    name: { type: String, required: true },
    dataGB: { type: Number, required: true },
    validityDays: { type: Number, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true, default: "USD" },
    costPrice: { type: Number },
    supplierId: { type: String, enum: ["esimgo", "esimaccess", "custom"], default: "custom" },
    supplierCode: { type: String }, // Provider-specific bundle/package code
    fallbackSupplierId: { type: String, enum: ["esimgo", "esimaccess", null] },
    fallbackSupplierCode: { type: String }, // Fallback provider code
    providerSynced: { type: Boolean, default: false }, // Whether synced from provider
    lastSyncedAt: { type: Date }, // Last time synced from provider
    isUnlimited: { type: Boolean, default: false },
    fairUseLimitGB: { type: Number },
    active: { type: Boolean, default: true, index: true },
    salesCount: { type: Number, default: 0 },
    isCustomPlan: { type: Boolean, default: false }, // Created by admin vs synced from provider
  },
  { timestamps: true },
)

planSchema.index({ country: 1, active: 1 })
planSchema.index({ price: 1 })

planSchema.statics.findAll = async function (filter = {}) {
  return this.find({ active: true, ...filter }).sort({ country: 1, price: 1 })
}

planSchema.statics.findByCountry = async function (countryCode) {
  return this.find({
    country: countryCode.toUpperCase(),
    active: true,
  }).sort({ price: 1 })
}

planSchema.statics.searchPlans = async function ({ minPrice, maxPrice, minData, maxData }) {
  const filter = { active: true }

  if (minPrice || maxPrice) {
    filter.price = {}
    if (minPrice) filter.price.$gte = Number.parseFloat(minPrice)
    if (maxPrice) filter.price.$lte = Number.parseFloat(maxPrice)
  }

  if (minData || maxData) {
    filter.dataGB = {}
    if (minData) filter.dataGB.$gte = Number.parseFloat(minData)
    if (maxData) filter.dataGB.$lte = Number.parseFloat(maxData)
  }

  return this.find(filter).sort({ price: 1 })
}

planSchema.statics.update = async function (id, updateData) {
  return this.findByIdAndUpdate(id, updateData, { new: true })
}

planSchema.statics.delete = async function (id) {
  return this.findByIdAndDelete(id)
}

if (mongoose.models.Plan) {
  delete mongoose.models.Plan
}

const Plan = mongoose.model("Plan", planSchema)

export { Plan, Plan as PlanModel }
export default Plan
