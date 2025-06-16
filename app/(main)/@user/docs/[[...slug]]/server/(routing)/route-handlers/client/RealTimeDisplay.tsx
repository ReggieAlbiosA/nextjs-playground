'use client';

import { useLivePrice } from './LivePriceContext';

const formatPrice = (price: number | null) => {
  if (price === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export function RealTimeDisplay() {
  const { livePrice, isConnected } = useLivePrice();

  return (
    <div className="text-center lg:text-left">
      <div className="flex items-center justify-center gap-2 lg:justify-start">
        <div className="font-mono text-xl font-bold text-transparent transition-all duration-300 bg-gradient-to-r from-sky-600 to-cyan-600 dark:from-sky-400 dark:to-cyan-400 bg-clip-text">
          {formatPrice(livePrice)}
        </div>
        <div 
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isConnected 
              ? 'bg-cyan-500 animate-pulse shadow-cyan-500/50 shadow-sm' 
              : 'bg-red-500 shadow-red-500/50 shadow-sm'
          }`}
        ></div>
      </div>
    </div>
  );
}