// Run: npx tsx src/scripts/cleanup-mock.ts
// Removes seeded mock users/tasks (example.com) from the database.

import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/skillswap"

async function cleanup() {
  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db!

  const mockUsers = await db.collection("user").find({ email: /@example\.com$/ }).toArray()
  const mockEmails = mockUsers.map((u) => u.email)

  if (mockEmails.length) {
    await db.collection("tasks").deleteMany({ client_email: { $in: mockEmails } })
    await db.collection("proposals").deleteMany({
      $or: [{ freelancer_email: { $in: mockEmails } }, { client_email: { $in: mockEmails } }],
    })
    await db.collection("user").deleteMany({ email: { $in: mockEmails } })
    console.log(`✅ Removed ${mockEmails.length} mock users and related data`)
  } else {
    console.log("ℹ️  No mock users found")
  }

  await mongoose.disconnect()
}

cleanup()
