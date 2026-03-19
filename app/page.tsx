import AIChatbot from "./components/ai-chatbot";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-200 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#491464] rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg sm:text-xl">MCU</span>
          </div>
          <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
            MCU AI Assistant
          </h1>
          <p className="text-xs sm:text-sm text-blue-600 font-medium hidden sm:block">
            Manila Central University
          </p>
          </div>
        </div>
        <a 
          href="https://mcu.edu.ph" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden lg:block text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm whitespace-nowrap"
        >
          Visit MCU Website →
        </a>
        </div>
      </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-[#491464] text-white py-8 sm:py-12 md:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          Welcome to MCU AI Assistant
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
          Your intelligent guide to Manila Central University. Ask about academics, 
          admissions, campus life, facilities, and more!
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
          <span className="bg-blue-500/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">📚 Academics</span>
          <span className="bg-blue-500/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">🎓 Admissions</span>
          <span className="bg-blue-500/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">🏫 Campus</span>
          <span className="bg-blue-500/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">🔬 Facilities</span>
          </div>
        </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="flex-1 py-8 sm:py-10 md:py-12 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full">
        <AIChatbot />
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-md border-t border-blue-200 py-6 sm:py-8 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 md:flex-row md:justify-between md:items-center md:gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm sm:text-base text-gray-600">
          Hon IT Director: Dir Carlo Benoya Monterey
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            © {new Date().getFullYear()} Manila Central University - AI Assistant
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
          <a 
          href="https://mcu.edu.ph" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 transition-colors"
          >
          Website
          </a>
          <a 
          href="https://mcu.edu.ph/privacy-policy/" 
          className="text-gray-600 hover:text-blue-600 transition-colors"
          >
          Privacy
          </a>
          <a 
          href="https://mcu.edu.ph/privacy-policy/" 
          className="text-gray-600 hover:text-blue-600 transition-colors"
          >
          Terms
          </a>
        </div>
        </div>
      </div>
      </footer>
    </div>
  );
}
