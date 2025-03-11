"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">CursorManus</span>
            </Link>
          </div>

          <div className="flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sign Out
                </button>
                <div className="flex items-center space-x-2">
                  <img
                    src={session.user?.image || "/default-avatar.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">{session.user?.name}</span>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="text-gray-700 hover:text-gray-900"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 