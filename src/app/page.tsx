import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-6xl font-bold text-center mb-8">
          Welcome to CursorManus
        </h1>
        <p className="text-2xl text-center mb-8">
          Your AI-powered agency partner
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
