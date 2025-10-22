export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} AptitudeArena. All rights reserved.</p>
        <div className="flex items-center gap-6 text-sm">
          <a href="#" className="text-gray-500 hover:text-gray-700">Privacy</a>
          <a href="#" className="text-gray-500 hover:text-gray-700">Terms</a>
          <a href="#" className="text-gray-500 hover:text-gray-700">Contact</a>
        </div>
      </div>
    </footer>
  );
}


