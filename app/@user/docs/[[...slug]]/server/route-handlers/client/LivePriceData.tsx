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
    <div className="w-24 h-6 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse"></div>
  );

}

async function FetchPrice({ mode }: { mode: 'ssg' | 'isr' | 'ssr' }) {
  try {
    const response = await fetch(`${process.env.BETTER_AUTH_URL}/api/${mode}`, { cache: 'no-store' });
    if (!response.ok) {
      return <div className="font-mono text-red-500">Error</div>;
    }
    const data = await response.json();
    return <div className="font-mono text-gray-900 dark:text-gray-50">{formatPrice(data.price)}</div>;
  } catch (error) {
    console.error(`Failed to fetch ${mode} price:`, error);
    return <div className="font-mono text-red-500">Failed</div>;
  }
}



export default function LivePriceData() {
  const modes: ('ssg' | 'isr' | 'ssr')[] = ['ssg', 'isr', 'ssr'];
  const modeLabels: { [key: string]: string } = {
    ssg: 'Static Site Generation (SSG)',
    isr: 'Incremental Static Regeneration (ISR)',
    ssr: 'Server-Side Rendering (SSR)',
  };

  return (
    <div className="p-6 mt-6 border rounded-lg bg-gray-50 dark:bg-gray-800/20">
      <h3 className="mb-4 text-xl font-semibold">Live BTC Price Data</h3>
      <div className="grid grid-cols-2 text-lg gap-x-8 gap-y-4">
        <div className="font-bold text-gray-500 dark:text-gray-400">Rendering Mode</div>
        <div className="font-bold text-right text-gray-500 dark:text-gray-400">Price (USD)</div>
        <div className="col-span-2 border-b border-gray-200 dark:border-gray-700"></div>
        {modes.map((mode) => (
          <React.Fragment key={mode}>
            <div className="flex items-center font-medium text-gray-800 dark:text-gray-200">
              {modeLabels[mode]}
            </div>
            <div className="flex items-center justify-end text-right">
              <Suspense fallback={<PriceValueSkeleton />}>
                <FetchPrice mode={mode} />
              </Suspense>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}