import { NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ status: "unhealthy", error: "Backend API is not responding" }, { status: 503 })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ status: "unhealthy", error: "Failed to connect to backend API" }, { status: 503 })
  }
}
