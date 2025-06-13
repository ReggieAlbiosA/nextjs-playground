import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // ⛔ Avoid Edge — Binance blocks Edge

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol') || 'BTCUSDT';

  try {
    const response = await fetch(`https://api3.binance.com/api/v3/ticker/price?symbol=${symbol}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Binance error' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}
