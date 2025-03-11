import axios from "axios"

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY

if (!DEEPSEEK_API_KEY) {
  throw new Error("Missing DEEPSEEK_API_KEY environment variable")
}

const api = axios.create({
  baseURL: "https://api.deepseek.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
  },
})

export async function generateResponse(prompt: string) {
  try {
    const response = await api.post("/chat/completions", {
      model: "deepseek-chat",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    return response.data.choices[0].message.content
  } catch (error) {
    console.error("Error calling DeepSeek API:", error)
    throw error
  }
} 