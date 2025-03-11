import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Chat } from "@/components/Chat"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Welcome, {session.user?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Chat />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <ul className="space-y-2">
              <li>
                <button className="text-blue-600 hover:underline">
                  New Project
                </button>
              </li>
              <li>
                <button className="text-blue-600 hover:underline">
                  View Analytics
                </button>
              </li>
              <li>
                <button className="text-blue-600 hover:underline">
                  Settings
                </button>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-600">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 