import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadQRCodeToCloudinary(qrBuffer, orderId) {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "esim-qr-codes",
          public_id: `qr_${orderId}`,
          resource_type: "image",
          format: "png",
        },
        (error, result) => {
          if (error) {
            console.error("[Cloudinary] Upload error:", error)
            reject(error)
          } else {
            console.log("[Cloudinary] Upload successful:", result.secure_url)
            resolve(result.secure_url)
          }
        },
      )

      uploadStream.end(qrBuffer)
    })
  } catch (error) {
    console.error("[Cloudinary] Error uploading QR code:", error)
    throw error
  }
}

export { cloudinary }
