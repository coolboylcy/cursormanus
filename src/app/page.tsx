import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">
            欢迎来到 CursorManus
          </h1>
          <p className="text-2xl text-gray-600">
            你的 AI 智能助手伙伴
          </p>
          <div className="mt-4 text-lg text-blue-600 animate-bounce">
            你知道吗？Chris 真是一个大聪明蛋子～
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mt-8 space-y-4">
          <p className="text-lg text-gray-700">
            想和作者聊聊天？加微信私聊呀！
          </p>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.502 19.525c1.524-1.105 2.498-2.738 2.498-4.554 0-3.326-3.237-6.023-7.229-6.023s-7.229 2.697-7.229 6.023c0 3.327 3.237 6.024 7.229 6.024.825 0 1.621-.117 2.36-.33l.212-.032c.139 0 .265.043.384.111l1.583.914.139.045c.133 0 .241-.108.241-.241l-.039-.176-.326-1.215-.025-.154c0-.162.08-.311.213-.402zm-12.827-17.228c-4.791 0-8.675 3.236-8.675 7.229 0 2.178 1.168 4.139 2.997 5.464.147.104.243.243.243.471l-.03.184-.391 1.458-.047.211c0 .16.13.29.289.29l.168-.054 1.899-1.097c.142-.082.293-.133.46-.133l.255.038c.886.255 1.842.397 2.832.397l.476-.012c-.188-.564-.291-1.158-.291-1.771 0-3.641 3.542-6.593 7.911-6.593l.471.012c-.653-3.453-4.24-6.094-8.567-6.094zm5.686 11.711c-.532 0-.963-.432-.963-.964 0-.533.431-.964.964-.964.533 0 .964.431.964.964 0 .532-.431.964-.964.964zm4.82 0c-.533 0-.964-.432-.964-.964 0-.533.431-.964.964-.964.532 0 .963.431.963.964 0 .532-.431.964-.963.964zm-13.398-5.639c-.639 0-1.156-.518-1.156-1.156 0-.639.517-1.157 1.156-1.157.639 0 1.157.518 1.157 1.157 0 .638-.518 1.156-1.157 1.156zm5.783 0c-.639 0-1.156-.518-1.156-1.156 0-.639.517-1.157 1.156-1.157.639 0 1.157.518 1.157 1.157 0 .638-.518 1.156-1.157 1.156z"/>
            </svg>
            <span className="font-mono text-lg">cooky_leung</span>
            <span className="text-sm text-gray-500">(跟作者聊5块钱的天)</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="/dashboard"
            className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all"
          >
            开始体验
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 text-lg font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transform hover:scale-105 transition-all border border-gray-300"
          >
            了解更多
          </Link>
        </div>
      </div>
    </div>
  )
}
