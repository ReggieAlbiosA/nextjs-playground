'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface PriceContextType {
  livePrice: number | null;
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastUpdated: Date | null;
}

const LivePriceContext = createContext<PriceContextType>({
  livePrice: null,
  isConnected: false,
  connectionStatus: 'disconnected',
  lastUpdated: null,
});

// The Public WebSocket URL for Binance's BTC/USDT trade stream
const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

export const LivePriceProvider = ({ children }: { children: React.ReactNode }) => {
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let reconnectTimeout: NodeJS.Timeout;
    
    const connect = () => {
      setConnectionStatus('connecting');
      console.log('🔄 Connecting to Binance WebSocket stream...');
      
      const ws = new WebSocket(BINANCE_WS_URL);

      ws.onopen = () => {
        console.log('✅ Successfully connected to Binance WebSocket stream.');
        setIsConnected(true);
        setConnectionStatus('connected');
      };

      ws.onclose = (event) => {
        console.log(`🔌 Disconnected from Binance WebSocket stream. Code: ${event.code}, Reason: ${event.reason}`);
        setIsConnected(false);
        setConnectionStatus('disconnected');
        
        // Auto-reconnect after 3 seconds unless it was a clean close
        if (event.code !== 1000) {
          console.log('🔄 Attempting to reconnect in 3 seconds...');
          reconnectTimeout = setTimeout(connect, 3000);
        }
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          // The payload from Binance for a trade stream has a 'p' property for the price
          if (message && message.p) {
            const newPrice = parseFloat(message.p);
            if (!isNaN(newPrice)) {
              setLivePrice(newPrice);
              setLastUpdated(new Date());
            }
          }
        } catch (error) {
          console.error('❌ Failed to parse WebSocket message from Binance:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('❌ Binance WebSocket error:', error);
        setIsConnected(false);
        setConnectionStatus('error');
      };

      // Return cleanup function
      return () => {
        clearTimeout(reconnectTimeout);
        if (ws.readyState === WebSocket.OPEN) {
          ws.close(1000, 'Component unmounting');
        }
      };
    };

    // Initial connection
    const cleanup = connect();

    // Cleanup function when component unmounts
    return cleanup;
  }, []); // Empty dependency array ensures this effect runs only once

  const contextValue = {
    livePrice,
    isConnected,
    connectionStatus,
    lastUpdated,
  };

  return (
    <LivePriceContext.Provider value={contextValue}>
      {children}
    </LivePriceContext.Provider>
  );
};

// Custom hook for easy consumption of the context
export const useLivePrice = () => {
  const context = useContext(LivePriceContext);
  
  if (!context) {
    throw new Error('useLivePrice must be used within a LivePriceProvider');
  }
  
  return context;
};