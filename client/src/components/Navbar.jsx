import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
          <span className="text-xl font-bold tracking-tight text-gray-900">AptitudeArena</span>
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">Features</a>
          <a href="#how" className="text-sm font-medium text-gray-600 hover:text-gray-900">How it works</a>
          <Link to="/" className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">Create Room</Link>
        </div>
      </nav>
    </header>
  );
}


