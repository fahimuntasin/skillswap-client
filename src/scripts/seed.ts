// Run: npx tsx src/scripts/seed.ts
// Seeds the required admin account (per assignment spec) so email/password login works.

import { MongoClient } from "mongodb"
import { auth } from "../lib/auth"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/skillswap"
const ADMIN_EMAIL = "admin1@taskhive.com"
const ADMIN_PASSWORD = "admin1@taskhive.com"
const ADMIN_NAME = "Admin"

function authHeaders() {
  const baseURL =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_CLIENT_URL ||
    "http://localhost:3000"

  const host = new URL(baseURL).host
  return new Headers({ host })
}

async function seedAdminCredential() {
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db()

  try {
    // If the admin document exists but Better Auth credentials don't,
    // recreate the credential by clearing the auth user + related collections.
    const existingAdmin = await db.collection("user").findOne({ email: ADMIN_EMAIL })

    if (existingAdmin?.id) {
      await db.collection("session").deleteMany({ userId: existingAdmin.id })
      await db.collection("account").deleteMany({ userId: existingAdmin.id })
    }

    await db.collection("user").deleteMany({ email: ADMIN_EMAIL })
    await db.collection("users").deleteMany({ email: ADMIN_EMAIL }).catch(() => {})

    await auth.api.signUpEmail({
      body: {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        // Better Auth additionalFields expected by the email/password sign-up type.
        image: "",
        skills: [],
        bio: "",
        hourlyRate: 0,
        isBlocked: false,
        onboardingCompleted: true,
        verified: false,
      },
      headers: authHeaders(),
    })

    await db.collection("user").updateOne(
      { email: ADMIN_EMAIL },
      {
        $set: {
          role: "admin",
          image: "",
          skills: [],
          bio: "",
          hourlyRate: 0,
          isBlocked: false,
          verified: false,
          onboardingCompleted: true,
        },
      }
    )

    console.log("✅ Admin login seeded:", ADMIN_EMAIL)
  } finally {
    await client.close()
  }
}

seedAdminCredential().catch((err) => {
  console.error("❌ Admin seed failed:", err)
  process.exit(1)
})
