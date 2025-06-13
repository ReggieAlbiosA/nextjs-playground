// app/api/[rendering-modes]/route.ts
import { NextRequest, NextResponse } from 'next/server';

type CacheOptions = { revalidate: number } | undefined;

/**
 * Fetches the latest BTC price from Binance's REST API with a specified cache strategy.
 */
async function fetchBinancePrice(cacheOptions: CacheOptions): Promise<number> {
  // Binance API endpoint for a specific symbol's price
  const response = await fetch(
    'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT',
    {
      // The 'next' object is how Next.js handles caching and revalidation
      next: cacheOptions,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch from Binance with status: ${response.status}`);
  }

  const data = await response.json();
  const price = parseFloat(data.price);

  if (isNaN(price)) {
    throw new Error("Price data from Binance API is not in the expected format.");
  }

  return price;
}

// --- Main GET Handler ---
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ 'rendering-modes': string }> }
) {
  const resolvedParams = await params;
  const mode = resolvedParams['rendering-modes'];

  try {
     switch (mode) {
      case 'ssg': {
        // Using 'force-cache' for SSG
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT', { cache: 'force-cache' });
        const data = await response.json();
        const price = parseFloat(data.price);
        return NextResponse.json({ type: 'SSG', price });
      }
      case 'isr': {
        // ISR still REQUIRES the 'next.revalidate' object
        const price = await fetchBinancePrice({ revalidate: 10 });
        return NextResponse.json({ type: 'ISR', price });
      }
      case 'ssr': {
        // Using 'no-store' for SSR
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT', { cache: 'no-store' });
        const data = await response.json();
        const price = parseFloat(data.price);
        return NextResponse.json({ type: 'SSR', price });
      }
      // ... default case
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch price data', details: errorMessage }, { status: 500 });
  }
}