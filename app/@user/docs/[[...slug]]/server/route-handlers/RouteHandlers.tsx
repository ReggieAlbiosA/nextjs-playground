import LivePriceData from "./LivePriceData";
import AuthSimulation from "./client/AuthSimulation";

export function RouteHandlers({ pageTitle }: { pageTitle: string }) {
  return (
    <section className="w-full max-w-6xl px-4 py-8 mx-auto space-y-12">
      <header className="space-y-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-transparent md:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text">
          {pageTitle}
        </h1>
        <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
      </header>

      <section className="space-y-6">
        <div className="p-8 border shadow-lg card-bg rounded-2xl border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Rendering Modes
            </h2>
          </div>
          <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Explore live examples of different rendering modes in Next.js. Watch how SSG, ISR, and SSR handle data fetching with distinct caching strategies.
          </p>
          <div className="relative">
            <div className="absolute opacity-25 -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur"></div>
            <div className="relative">
              <LivePriceData />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="p-8 border shadow-lg card-bg rounded-2xl border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Cookie Management
            </h2>
          </div>
          <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Cookies are essential for storing user preferences, authentication tokens, and session data. Experience how they work in practice with our interactive demo.
          </p>
          <div className="relative">
            <div className="absolute opacity-25 -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur"></div>
            <div className="relative">
              <AuthSimulation />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}