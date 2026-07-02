// Run: npx tsx src/scripts/cleanup-users-keep-admin.ts
// Deletes every user except admin1@taskhive.com and clears their auth sessions/accounts.

import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/skillswap"
const ADMIN_EMAIL = "admin1@taskhive.com"

async function cleanup() {
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db()

  const admin = await db.collection("user").findOne({ email: ADMIN_EMAIL })
  if (!admin) {
    console.error(`❌ Admin not found (${ADMIN_EMAIL}). Run seed.ts first.`)
    await client.close()
    process.exit(1)
  }

  const adminId = admin.id as string | undefined

  const userResult = await db.collection("user").deleteMany({
    email: { $ne: ADMIN_EMAIL },
  })

  const sessionFilter = adminId
    ? { userId: { $ne: adminId } }
    : {}
  const sessionResult = await db.collection("session").deleteMany(sessionFilter)

  const accountFilter = adminId
    ? { userId: { $ne: adminId } }
    : {}
  const accountResult = await db.collection("account").deleteMany(accountFilter)

  // Legacy/alternate collection name if present
  const legacyResult = await db.collection("users").deleteMany({ email: { $ne: ADMIN_EMAIL } })
  const legacyDeleted = legacyResult.deletedCount || 0

  const remaining = await db.collection("user").countDocuments()

  console.log(`✅ Removed ${userResult.deletedCount} user(s)`)
  console.log(`✅ Removed ${sessionResult.deletedCount} session(s)`)
  console.log(`✅ Removed ${accountResult.deletedCount} linked account(s)`)
  if (legacyDeleted) {
    console.log(`✅ Removed ${legacyDeleted} legacy users document(s)`)
  }
  console.log(`ℹ️  ${remaining} user(s) left in database (admin only)`)

  await client.close()
}

cleanup().catch((err) => {
  console.error("Cleanup failed:", err)
  process.exit(1)
})
