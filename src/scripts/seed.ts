// Run: npx tsx src/scripts/seed.ts
// Seeds only the required admin account (per assignment spec).

import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/skillswap"

async function seed() {
  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db!

  const adminEmail = "admin1@taskhive.com"
  const existing = await db.collection("user").findOne({ email: adminEmail })

  if (!existing) {
    await db.collection("user").insertOne({
      name: "Admin",
      email: adminEmail,
      role: "admin",
      image: "",
      skills: [],
      bio: "",
      hourlyRate: 0,
      isBlocked: false,
      verified: false,
      onboardingCompleted: true,
      createdAt: new Date(),
    })
    console.log("✅ Admin account created:", adminEmail)
  } else {
    console.log("ℹ️  Admin account already exists:", adminEmail)
  }

  await mongoose.disconnect()
}

seed()
