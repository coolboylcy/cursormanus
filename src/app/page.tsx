import Link from "next/link"
import AgentChat from '@/components/AgentChat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          CursorManus AI Assistant
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Your intelligent AI assistant powered by advanced language models.
          Ask me anything or let me help you with your tasks!
        </p>
        <AgentChat />
      </div>
    </main>
  )
}
