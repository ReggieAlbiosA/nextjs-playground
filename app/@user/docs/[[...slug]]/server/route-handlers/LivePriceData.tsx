import React, { Suspense } from 'react';

const formatPrice = (price: string | number) => {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numericPrice);
};

function PriceValueSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 rounded-lg h-7 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
      <div className="w-4 h-4 bg-gray-300 rounded-full dark:bg-gray-600 animate-pulse"></div>
    </div>
  );
}

async function FetchPrice({ mode }: { mode: 'ssg' | 'isr' | 'ssr' }) {
  try {
    const response = await fetch(`${process.env.BETTER_AUTH_URL}/api/${mode}`, { cache: 'no-store' });
    if (!response.ok) {
      return (
        <div className="flex items-center gap-2">
          <div className="font-mono font-semibold text-red-500">Error</div>
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      );
    }
    const data = await response.json();
    return (
      <div className="flex items-center gap-2">
        <div className="font-mono text-2xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text">
          {formatPrice(data.price)}
        </div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    );
  } catch (error) {
    console.error(`Failed to fetch ${mode} price:`, error);
    return (
      <div className="flex items-center gap-2">
        <div className="font-mono font-semibold text-red-500">Failed</div>
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      </div>
    );
  }
}

export default function LivePriceData() {
  const modes: ('ssg' | 'isr' | 'ssr')[] = ['ssg', 'isr', 'ssr'];
  const modeData: { [key: string]: { label: string; description: string; color: string; icon: string } } = {
    ssg: {
      label: 'Static Site Generation',
      description: 'Pre-built at build time',
      color: 'from-blue-500 to-cyan-500',
      icon: '⚡'
    },
    isr: {
      label: 'Incremental Static Regeneration',
      description: 'Regenerates on demand',
      color: 'from-purple-500 to-pink-500',
      icon: '🔄'
    },
    ssr: {
      label: 'Server-Side Rendering',
      description: 'Rendered on each request',
      color: 'from-orange-500 to-red-500',
      icon: '🚀'
    },
  };

  return (
    <div className="p-8 border shadow-lg card-bg rounded-2xl border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center gap-3 mb-8">
        <div className="text-2xl">₿</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Live Bitcoin Price Data</h3>
        <div className="flex items-center gap-2 ml-auto text-sm text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Updates</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {modes.map((mode, index) => (
          <div key={mode} className="group">
            <div className={`relative p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 secondary-bg hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${modeData[mode].color} rounded-t-xl`}></div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${modeData[mode].color} flex items-center justify-center text-white text-xl font-bold`}>
                    {modeData[mode].icon}
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                      {modeData[mode].label}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {modeData[mode].description}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="mb-1 text-xs tracking-wide text-gray-400 uppercase dark:text-gray-500">
                    Current Price
                  </div>
                  <Suspense fallback={<PriceValueSkeleton />}>
                    <FetchPrice mode={mode} />
                  </Suspense>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Mode: {mode.toUpperCase()}</span>
                  <span>Updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 mt-8 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h5 className="mb-1 font-semibold text-blue-900 dark:text-blue-100">How it works</h5>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Each rendering mode fetches data differently. SSG shows cached data, ISR regenerates periodically, and SSR fetches fresh data on every request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}