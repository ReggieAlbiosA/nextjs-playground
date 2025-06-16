import React, { Suspense } from 'react';
import { LivePriceProvider } from './client/LivePriceContext';
import { RealTimeDisplay } from './client/RealTimeDisplay';

// --- Helper Functions and Sub-Components ---

const formatPrice = (price: string | number | null) => {
  if (price === null) return 'N/A';
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numericPrice);
};

function PriceValueSkeleton() {
  return (
    <div className="w-32 h-8 transition-colors duration-200 bg-gray-200/60 rounded-xl dark:bg-gray-700/60 animate-pulse backdrop-blur-sm"></div>
  );
}

// This async Server Component fetches the INITIAL data for each mode.
async function FetchPrice({ mode }: { mode: 'ssg' | 'isr' | 'ssr' }) {
  try {
    const apiUrl = `${process.env.BETTER_AUTH_URL}/api/${mode}`;
    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      return (
        <div className="px-3 py-2 text-sm font-medium text-red-600 transition-all duration-200 border rounded-lg border-red-200/60 bg-red-50/60 dark:text-red-400 dark:bg-red-900/20 dark:border-red-700/50 backdrop-blur-sm">
          Error
        </div>
      );
    }
    const data = await response.json();
    return (
      <div className="font-mono text-xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text">
        {formatPrice(data.price)}
      </div>
    );
  } catch (error) {
    console.error(`Failed to fetch ${mode} price:`, error);
    return (
      <div className="px-3 py-2 text-sm font-medium text-red-600 transition-all duration-200 border rounded-lg border-red-200/60 bg-red-50/60 dark:text-red-400 dark:bg-red-900/20 dark:border-red-700/50 backdrop-blur-sm">
        Failed
      </div>
    );
  }
}

// --- Main Page Component ---

export default function LivePriceDataPage() {
  const modes: ('ssg' | 'isr' | 'ssr')[] = ['ssg', 'isr', 'ssr'];
  const modeData: { [key: string]: { label: string; description: string; color: string; icon: string; lightColor: string } } = {
    ssg: {
      label: 'Static Site Generation',
      description: 'Fetched at build time',
      color: 'from-blue-500 to-cyan-500',
      lightColor: 'from-blue-600 to-cyan-600',
      icon: '⚡',
    },
    isr: {
      label: 'Incremental Regeneration',
      description: 'Regenerates every 10s',
      color: 'from-purple-500 to-pink-500',
      lightColor: 'from-purple-600 to-pink-600',
      icon: '🔄',
    },
    ssr: {
      label: 'Server-Side Rendering',
      description: 'Fetched on every request',
      color: 'from-orange-500 to-red-500',
      lightColor: 'from-orange-600 to-red-600',
      icon: '🚀',
    },
  };

  return (
    <LivePriceProvider>
      <div className="space-y-4">
        {/* Cards Grid */}
        {modes.map((mode, index) => (
          <div
            key={mode}
            className="relative overflow-hidden transition-all duration-300 bg-white border shadow-md group rounded-xl border-gray-200/60 dark:bg-gray-800/60 dark:border-gray-700/60 hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-transparent via-gray-50/40 to-transparent dark:via-gray-700/25 group-hover:opacity-100"></div>
            
            <div className="relative p-4 sm:p-6">
              <div className="grid items-center grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Left side: Icon and description */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl shadow-md bg-gradient-to-r ${modeData[mode].lightColor} dark:${modeData[mode].color} flex items-center justify-center text-white text-xl transform group-hover:scale-105 transition-transform duration-300`}>
                    {modeData[mode].icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {modeData[mode].label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {modeData[mode].description}
                    </p>
                  </div>
                </div>

                {/* Right side: Prices */}
                <div className="flex items-center justify-center gap-6 lg:justify-end">
                  {/* Initial Server-Rendered Value */}
                  <div className="text-center lg:text-right">
                    <div className="mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                      Initial ({mode.toUpperCase()})
                    </div>
                    <div className="p-3 transition-all duration-200 border rounded-xl border-gray-200/60 bg-gray-50/60 dark:bg-gray-700/50 dark:border-gray-600/60 backdrop-blur-sm">
                      <Suspense fallback={<PriceValueSkeleton />}>
                        <FetchPrice mode={mode} />
                      </Suspense>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300/60 dark:via-gray-600/60 to-transparent"></div>

                  {/* Live WebSocket Value */}
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center gap-1 mb-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400 lg:justify-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Live WebSocket
                    </div>
                    <div className="p-3 transition-all duration-200 border rounded-xl border-green-200/60 bg-gradient-to-r from-green-50/60 to-emerald-50/60 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700/60 backdrop-blur-sm">
                      <RealTimeDisplay />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Footer Info */}
        <div className="p-4 mt-6 transition-all duration-300 border rounded-xl border-gray-200/60 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm dark:border-gray-700/60 hover:shadow-md">
          <div className="space-y-3 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span><strong>Initial Value:</strong> Server render result</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span><strong>Live Feed:</strong> Real-time Binance stream</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              💡 Refresh the page to see how ISR and SSR values change over time
            </p>
          </div>
        </div>
      </div>
    </LivePriceProvider>
  );
}