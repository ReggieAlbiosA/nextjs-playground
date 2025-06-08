// app/docs/[[...slug]]/page.tsx

import React, { Suspense } from 'react';

// --- Helper Functions ---

const formatPrice = (price: string | number) => {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numericPrice);
};

const toTitleCase = (str: string) => {
  if (!str) return '';
  return str.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// --- NEW: Granular Loading Skeleton for just the price value ---
function PriceValueSkeleton() {
  return (
    <div className="w-24 h-6 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse"></div>
  );
}

// --- NEW: A small async component to fetch and display a single price ---
async function FetchPrice({ mode }: { mode: 'ssg' | 'isr' | 'ssr' }) {
  // REVERTED: Using the environment variable directly as requested.
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

// --- REFACTORED: This component is now synchronous ---
// It renders the main card structure and uses Suspense internally.
function LivePriceData() {
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
        {/* Headers render immediately */}
        <div className="font-bold text-gray-500 dark:text-gray-400">Rendering Mode</div>
        <div className="font-bold text-right text-gray-500 dark:text-gray-400">Price (USD)</div>
        <div className="col-span-2 border-b border-gray-200 dark:border-gray-700"></div>
        
        {/* Map over the modes to render each row */}
        {modes.map((mode) => (
          <React.Fragment key={mode}>
            {/* The label renders immediately */}
            <div className="flex items-center font-medium text-gray-800 dark:text-gray-200">
              {modeLabels[mode]}
            </div>
            {/* The price value has its own Suspense boundary */}
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

// --- THE MAIN ASYNC PAGE COMPONENT ---
export default async function DocsPage({
  params,
  searchParams,
}: {
  // REVERTED: Using Promise types for props as requested.
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ view?: 'codebase' | 'architecture' | 'preview' }>;
}) {

  // REVERTED: Awaiting the props as requested.
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const pageTitle = toTitleCase(resolvedParams.slug?.[resolvedParams.slug.length - 1] || 'Docs Home');
  const currentView = resolvedSearchParams.view || 'preview';

  if (resolvedParams.slug?.[resolvedParams.slug.length - 1] === 'route-handlers' &&
      currentView === 'preview') {
    
    return (
      <section className="w-full space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {pageTitle}
          </h1>
        </header>

        <p className="text-lg text-gray-600 dark:text-gray-400">
          This section provides live examples of different rendering modes in Next.js by fetching data from an API route. The prices for ISR and SSR will update based on their caching strategies.
        </p>
        
        {/* No Suspense needed here anymore, as it's handled inside LivePriceData */}
        <LivePriceData />

      </section>
    );
  }

  // --- This is the fallback for all other pages ---
  return (
    <section className="w-full space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {pageTitle}
        </h1>
      </header>
      <div className="p-8 border-2 border-dashed rounded-lg">
         <p className="text-lg text-gray-500 dark:text-gray-400">
            This is the <span className="font-semibold capitalize">{currentView}</span> view for &quot;{pageTitle}&quot;. Content is under construction.
         </p>
      </div>
    </section>
  );
}
