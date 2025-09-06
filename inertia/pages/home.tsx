import { PROJECT_NAME } from '#config/project';

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans">
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-6xl font-bold text-white mb-4">
          Hello, I'm <span className="text-purple-400">Sonny</span>✌️
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Fullstack Developer passionate
        </p>
        <div className="flex justify-center gap-2">
          <span className="px-4 py-2 bg-react text-white rounded-full text-sm">
            React
          </span>
          <span className="px-4 py-2 bg-typescript text-white rounded-full text-sm">
            TypeScript
          </span>
          <span className="px-4 py-2 bg-node text-white rounded-full text-sm">
            Node.js
          </span>
          <span className="px-4 py-2 bg-adonis text-white rounded-full text-sm">
            AdonisJS
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-4">About me</h2>
          <p className="text-gray-300 leading-relaxed">
            Passionate about web development, I create modern and performant
            applications using the latest technologies. My expertise covers the
            frontend and the backend to offer complete solutions.
          </p>
          <div className="flex gap-2 mt-4">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors border-none text-lg">
              Contact me
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-16">
        <p className="text-gray-400">
          © 2025 {PROJECT_NAME} - Fullstack Developer
        </p>
      </footer>
    </div>
  </div>
);

export default Home;
