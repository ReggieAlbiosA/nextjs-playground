import { NextRequest, NextResponse } from 'next/server';

// Ensure your environment variable is named CMC_API_KEY in your .env file
const CMC_API_KEY = process.env.CMC_API_KEY;

if (!CMC_API_KEY) {
  throw new Error("Missing CoinMarketCap API Key. Please set the CMC_API_KEY environment variable.");
}

type CacheOptions = RequestInit['cache'] | { revalidate: number };

/**
 * Fetches the latest BTC price from CoinMarketCap with a specified cache strategy.
 * @param cacheOptions - The caching strategy ('no-store' or { revalidate: number }).
 * @returns The price of BTC as a number.
 */
async function fetchCMCPrice(cacheOptions: CacheOptions): Promise<number> {
  const fetchOptions: RequestInit = {
    headers: {
      'X-CMC_PRO_API_KEY': CMC_API_KEY as string,
    },
    next: typeof cacheOptions === 'object' ? cacheOptions : undefined,
    cache: typeof cacheOptions === 'string' ? cacheOptions : undefined,
  };

  // FIX: Using the correct 'quotes' endpoint to fetch a specific symbol (BTC)
  const response = await fetch(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC',
    fetchOptions
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`CoinMarketCap API Error (${response.status}): ${errorBody}`);
    throw new Error(`Failed to fetch from CoinMarketCap with status: ${response.status}`);
  }

  const data = await response.json();
  const price = data?.data?.BTC?.quote?.USD?.price;

  if (typeof price !== 'number') {
    throw new Error("Price data from CoinMarketCap API is not in the expected format.");
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
        // SSG returns a static, hardcoded value.
        const price = await fetchCMCPrice('force-cache'); // Use static cache for SSG
        return NextResponse.json({ type: 'SSG', price });
      }
      case 'isr': {
        const price = await fetchCMCPrice({ revalidate: 10 }); // 10-second revalidation
        return NextResponse.json({ type: 'ISR', price });
      }
      case 'ssr': {
        const price = await fetchCMCPrice('no-store'); // Fetch fresh every request
        return NextResponse.json({ type: 'SSR', price });
      }
      default: {
        return NextResponse.json({ error: 'Invalid rendering mode' }, { status: 400 });
      }
    }
  } catch (error) {
    console.error(`[API Route Error - ${mode}]:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch price data', details: errorMessage }, { status: 500 });
  }
}
