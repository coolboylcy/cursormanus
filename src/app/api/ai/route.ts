import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { generateResponse } from "@/lib/deepseek"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { prompt } = body

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 })
    }

    const response = await generateResponse(prompt)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("[AI_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 