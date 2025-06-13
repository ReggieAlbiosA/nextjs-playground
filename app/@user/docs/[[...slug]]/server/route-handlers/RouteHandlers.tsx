import LivePriceDataPage from "./LivePriceData";
import AuthSimulation from "./client/AuthSimulation";

export function RouteHandlersPage({ pageTitle }: { pageTitle: string }) {
  return (
    <section className="w-full max-w-6xl px-4 py-8 mx-auto space-y-8">
      {/* Header */}
      <header className="relative mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text sm:text-5xl">
          {pageTitle}
        </h1>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Explore powerful Next.js features through interactive examples
        </p>
      </header>

      {/* Rendering Modes Section */}
      <section className="relative overflow-hidden transition-all duration-300 bg-white border shadow-lg group rounded-2xl border-gray-200/50 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-sm hover:shadow-xl hover:-translate-y-1">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-transparent via-gray-50/30 to-transparent dark:via-gray-700/20 group-hover:opacity-100"></div>
        
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 transition-all duration-300 shadow-lg rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:scale-110">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Rendering Modes
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Live data fetching comparison
              </p>
            </div>
          </div>
          
          <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-300">
            Explore live examples of different rendering modes in Next.js. Watch how SSG, ISR, and SSR handle data fetching with distinct caching strategies.
          </p>
          
          <div className="relative">
            <LivePriceDataPage />
          </div>
        </div>
      </section>

      {/* Cookie Management Section */}
      <section className="relative overflow-hidden transition-all duration-300 bg-white border shadow-lg group rounded-2xl border-gray-200/50 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-sm hover:shadow-xl hover:-translate-y-1">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-transparent via-gray-50/30 to-transparent dark:via-gray-700/20 group-hover:opacity-100"></div>
        
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 transition-all duration-300 shadow-lg rounded-xl bg-gradient-to-r from-orange-500 to-red-500 group-hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Cookie Management
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Authentication & session handling
              </p>
            </div>
          </div>
          
          <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-300">
            Cookies are essential for storing user preferences, authentication tokens, and session data. Experience how they work in practice with our interactive demo.
          </p>
          
          <div className="relative">
            <AuthSimulation />
          </div>
        </div>
      </section>
    </section>
  );
}