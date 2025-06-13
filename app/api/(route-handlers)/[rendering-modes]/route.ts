import { NextRequest, NextResponse } from 'next/server';

// --- Main GET Handler ---
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ 'rendering-modes': string }> }
) {
  const { 'rendering-modes': mode } = await params;
  const binanceApiUrl = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';

  try {
    switch (mode) {
      case 'ssg': {
        // Using 'force-cache' to explicitly tell Next.js to cache this result indefinitely.
        // This is the core of Static Site Generation (SSG).
        const response = await fetch(binanceApiUrl, { cache: 'force-cache' });
        
        if (!response.ok) throw new Error(`Binance API error: ${response.status}`);

        const data = await response.json();
        const price = parseFloat(data.price);

        return NextResponse.json({ type: 'SSG', price });
      }

      case 'isr': {
        // NOTE: Time-based revalidation (ISR) REQUIRES the `next` object.
        // There is no `cache` string equivalent for this behavior.
        const response = await fetch(binanceApiUrl, { next: { revalidate: 10 } });
        
        if (!response.ok) throw new Error(`Binance API error: ${response.status}`);
        
        const data = await response.json();
        const price = parseFloat(data.price);
        
        return NextResponse.json({ type: 'ISR', price });
      }

      case 'ssr': {
        // Using 'no-store' to explicitly tell Next.js to fetch fresh data on every request.
        // This is the core of Server-Side Rendering (SSR).
        const response = await fetch(binanceApiUrl, { cache: 'no-store' });
        
        if (!response.ok) throw new Error(`Binance API error: ${response.status}`);

        const data = await response.json();
        const price = parseFloat(data.price);

        return NextResponse.json({ type: 'SSR', price });
      }

      default: {
        return NextResponse.json({ error: 'Invalid rendering mode' }, { status: 400 });
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch price data', details: errorMessage }, { status: 500 });
  }
}