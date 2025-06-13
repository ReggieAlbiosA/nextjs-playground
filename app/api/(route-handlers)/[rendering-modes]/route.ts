import { NextRequest, NextResponse } from 'next/server';

// --- Main GET Handler ---
export async function GET(
  _req: NextRequest,
  { params }: { params: { 'rendering-modes': string } }
) {
  const mode = params['rendering-modes'];
  const binanceApiUrl = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';

  // Define the fetch options that will be used.
  // The User-Agent header is the key to fixing the production error.
  const fetchOptions: RequestInit = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
  };

  try {
    switch (mode) {
      case 'ssg': {
        // Statically generate by forcing the cache.
        const response = await fetch(binanceApiUrl, {
          ...fetchOptions, // Spread the base options
          cache: 'force-cache'
        });
        if (!response.ok) throw new Error(`Binance API error: ${response.statusText}`);
        const data = await response.json();
        return NextResponse.json({ type: 'SSG', price: parseFloat(data.price) });
      }

      case 'isr': {
        // Revalidate every 10 seconds.
        const response = await fetch(binanceApiUrl, {
          ...fetchOptions, // Spread the base options
          next: { revalidate: 10 }
        });
        if (!response.ok) throw new Error(`Binance API error: ${response.statusText}`);
        const data = await response.json();
        return NextResponse.json({ type: 'ISR', price: parseFloat(data.price) });
      }

      case 'ssr': {
        // Fetch fresh on every request.
        const response = await fetch(binanceApiUrl, {
          ...fetchOptions, // Spread the base options
          cache: 'no-store'
        });
        if (!response.ok) throw new Error(`Binance API error: ${response.statusText}`);
        const data = await response.json();
        return NextResponse.json({ type: 'SSR', price: parseFloat(data.price) });
      }

      default: {
        return NextResponse.json({ error: 'Invalid rendering mode' }, { status: 400 });
      }
    }
  } catch (error) {
    // Log the actual error on the server for better debugging
    console.error(`[API Route Error - ${mode}]:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch price data', details: errorMessage }, { status: 500 });
  }
}