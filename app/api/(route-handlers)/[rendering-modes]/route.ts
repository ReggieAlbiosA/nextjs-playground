import { NextRequest, NextResponse } from 'next/server';

// ✅ Force Node.js runtime — avoids Binance blocking Edge functions
export const runtime = 'nodejs';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ 'rendering-modes': string }> }
) {
  const { 'rendering-modes': mode } = await params;

  const binanceApiUrl = 'https://api3.binance.com/api/v3/ticker/price?symbol=BTCUSDT';

  const fetchOptions = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Accept': 'application/json',
    }
  };

  try {
    const fetchBinance = async (fetchConfig: RequestInit) => {
      const response = await fetch(binanceApiUrl, fetchConfig);
      if (!response.ok) {
        throw new Error(`Binance API responded with status: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return parseFloat(data.price);
    };

    switch (mode) {
      case 'ssg': {
        const price = await fetchBinance({
          ...fetchOptions,
          cache: 'force-cache',
        });
        return NextResponse.json({ type: 'SSG', price });
      }

      case 'isr': {
        const price = await fetchBinance({
          ...fetchOptions,
          next: { revalidate: 10 },
        });
        return NextResponse.json({ type: 'ISR', price });
      }

      case 'ssr': {
        const price = await fetchBinance({
          ...fetchOptions,
          cache: 'no-store',
        });
        return NextResponse.json({ type: 'SSR', price });
      }

      default: {
        return NextResponse.json({ error: 'Invalid rendering mode' }, { status: 400 });
      }
    }
  } catch (error) {
    console.error(`[API Route Error - ${mode}]:`, error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch price data', details: message },
      { status: 500 }
    );
  }
}
