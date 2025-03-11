"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            糟糕，出错了！
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {error === "Configuration" && "服务器配置错误，请联系管理员"}
            {error === "AccessDenied" && "访问被拒绝，请确认您有权限访问"}
            {error === "Verification" && "验证链接无效或已过期"}
            {!error && "发生未知错误，请重试"}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex justify-center">
            <Link
              href="/"
              className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all"
            >
              返回首页
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              需要帮助？
              <Link href="/about" className="text-blue-600 hover:text-blue-500">
                联系作者
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 