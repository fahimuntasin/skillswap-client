import { NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...data } = await req.json()
    if (!id) return NextResponse.json({ error: "User ID required" }, { status: 400 })
    const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/skillswap")
    await client.connect()
    const db = client.db()
    const result = await db.collection("user").updateOne({ id }, { $set: data })
    await client.close()
    if (result.matchedCount === 0) return NextResponse.json({ error: "User not found" }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
