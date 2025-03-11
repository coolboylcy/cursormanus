export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">关于 CursorManus</h1>
          <p className="text-xl text-gray-600">一个充满创意和智慧的 AI 助手项目</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">项目背景</h2>
            <p className="text-gray-600">
              CursorManus 是一个基于最新 AI 技术的智能助手平台。项目名称中的"Cursor"代表光标，象征着数字世界的导航；
              "Manus"是拉丁语中"手"的意思，暗示着这个 AI 助手就像您的得力助手一样。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">技术栈</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">前端技术</h3>
                <ul className="mt-2 text-gray-600 space-y-1">
                  <li>• Next.js 14</li>
                  <li>• React</li>
                  <li>• Tailwind CSS</li>
                  <li>• TypeScript</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">后端技术</h3>
                <ul className="mt-2 text-gray-600 space-y-1">
                  <li>• Prisma</li>
                  <li>• PostgreSQL</li>
                  <li>• NextAuth.js</li>
                  <li>• DeepSeek API</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">特色功能</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✦</span>
                智能对话：基于 DeepSeek API 的自然语言交互
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✦</span>
                临时访客：独特的"Chris的朋友"快速访问模式
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✦</span>
                安全可靠：支持 GitHub 账号登录和临时账号管理
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✦</span>
                响应式设计：完美适配各种设备屏幕
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">联系作者</h2>
            <div className="flex items-center justify-center space-x-2 text-gray-600 bg-gray-50 p-4 rounded-lg">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.502 19.525c1.524-1.105 2.498-2.738 2.498-4.554 0-3.326-3.237-6.023-7.229-6.023s-7.229 2.697-7.229 6.023c0 3.327 3.237 6.024 7.229 6.024.825 0 1.621-.117 2.36-.33l.212-.032c.139 0 .265.043.384.111l1.583.914.139.045c.133 0 .241-.108.241-.241l-.039-.176-.326-1.215-.025-.154c0-.162.08-.311.213-.402zm-12.827-17.228c-4.791 0-8.675 3.236-8.675 7.229 0 2.178 1.168 4.139 2.997 5.464.147.104.243.276.243.471l-.03.184-.391 1.458-.047.211c0 .16.13.29.289.29l.168-.054 1.899-1.097c.142-.082.293-.133.46-.133l.255.038c.886.255 1.842.397 2.832.397l.476-.012c-.188-.564-.291-1.158-.291-1.771 0-3.641 3.542-6.593 7.911-6.593l.471.012c-.653-3.453-4.24-6.094-8.567-6.094zm5.686 11.711c-.532 0-.963-.432-.963-.964 0-.533.431-.964.963-.964.533 0 .964.431.964.964 0 .532-.431.964-.964.964zm4.82 0c-.533 0-.964-.432-.964-.964 0-.533.431-.964.964-.964.532 0 .963.431.963.964 0 .532-.431.964-.963.964zm-13.398-5.639c-.639 0-1.156-.518-1.156-1.156 0-.639.517-1.157 1.156-1.157.639 0 1.157.518 1.157 1.157 0 .638-.518 1.156-1.157 1.156zm5.783 0c-.639 0-1.156-.518-1.156-1.156 0-.639.517-1.157 1.156-1.157.639 0 1.157.518 1.157 1.157 0 .638-.518 1.156-1.157 1.156z"/>
              </svg>
              <span className="font-mono text-lg">cooky_leung</span>
              <span className="text-sm text-gray-500">(欢迎来聊天，每次只需5块钱！)</span>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              * 项目持续更新中，欢迎提供建议和反馈 *
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 