import { NextRequest, NextResponse } from 'next/server';

// --- Main GET Handler ---
export async function GET(
  _req: NextRequest,
  { params }: { params: { 'rendering-modes': string } }
) {
  const mode = params['rendering-modes'];

  // ** THE FIX: Using a more resilient, alternative Binance API endpoint **
  const binanceApiUrl = 'https://api3.binance.com/api/v3/ticker/price?symbol=BTCUSDT';

  // We will keep the User-Agent header as it is still best practice
  const fetchOptions = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
  };

  try {
    switch (mode) {
      case 'ssg': {
        const response = await fetch(binanceApiUrl, {
          ...fetchOptions,
          cache: 'force-cache'
        });
        if (!response.ok) {
          // Throw a more descriptive error
          throw new Error(`Binance API responded with status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return NextResponse.json({ type: 'SSG', price: parseFloat(data.price) });
      }

      case 'isr': {
        const response = await fetch(binanceApiUrl, {
          ...fetchOptions,
          next: { revalidate: 10 }
        });
        if (!response.ok) {
          throw new Error(`Binance API responded with status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return NextResponse.json({ type: 'ISR', price: parseFloat(data.price) });
      }

      case 'ssr': {
        const response = await fetch(binanceApiUrl, {
          ...fetchOptions,
          cache: 'no-store'
        });
        if (!response.ok) {
          throw new Error(`Binance API responded with status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return NextResponse.json({ type: 'SSR', price: parseFloat(data.price) });
      }

      default: {
        return NextResponse.json({ error: 'Invalid rendering mode' }, { status: 400 });
      }
    }
  } catch (error) {
    // Enhanced logging to capture the real error if it persists
    console.error(`[API Route Error - ${mode}]:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    // Add the underlying cause to the error response for better debugging
    let causeMessage = '';
    if (error instanceof Error && error.cause) {
      causeMessage = ` | Cause: ${JSON.stringify(error.cause)}`;
    }

    return NextResponse.json({
        error: 'Failed to fetch price data',
        details: `${errorMessage}${causeMessage}`
      },
      { status: 500 }
    );
  }
}