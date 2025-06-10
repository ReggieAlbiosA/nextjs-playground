'use client';

import { useState, useEffect } from 'react';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export default function AuthSimulation() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');

  // Check authentication status on initial component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/cookies', { method: 'GET' });
        const data = await response.json();
        setAuthStatus(data.isAuthenticated ? 'authenticated' : 'unauthenticated');
      } catch (error) {
        console.error('Failed to check auth status:', error);
        setAuthStatus('unauthenticated');
      }
    };

    checkAuthStatus();
  }, []);

  const handleSimulateLogin = async () => {
    setAuthStatus('loading');
    try {
      await fetch('/api/cookies', { method: 'POST' });
      // Reload the page to allow the server to read the new cookie
      window.location.reload();
    } catch (error) {
      console.error('Failed to simulate login:', error);
      setAuthStatus('unauthenticated');
    }
  };

  const handleSimulateSignout = async () => {
    setAuthStatus('loading');
    try {
      await fetch('/api/cookies', { method: 'DELETE' });
      // Reload for the server to recognize the cookie is gone
      window.location.reload();
    } catch (error) {
      console.error('Failed to simulate signout:', error);
      setAuthStatus('authenticated'); // Revert if the API call fails
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Cookie Authentication Demo</h1>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', fontSize: '1.2rem' }}>
        <p>Authentication Status:</p>
        <div
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor:
              authStatus === 'authenticated'
                ? '#28a745'
                : authStatus === 'unauthenticated'
                ? '#dc3545'
                : '#6c757d',
          }}
        >
          {authStatus.toUpperCase()}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={handleSimulateLogin}
          disabled={authStatus === 'authenticated' || authStatus === 'loading'}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#007bff',
            color: 'white',
            opacity: authStatus === 'authenticated' || authStatus === 'loading' ? 0.5 : 1,
            pointerEvents: authStatus === 'authenticated' || authStatus === 'loading' ? 'none' : 'auto'
          }}
        >
          Simulate Login
        </button>

        <button
          onClick={handleSimulateSignout}
          disabled={authStatus === 'unauthenticated' || authStatus === 'loading'}
          style={{  
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#ff4d4d',
            color: 'white',
            opacity: authStatus === 'unauthenticated' || authStatus === 'loading' ? 0.5 : 1,
            pointerEvents: authStatus === 'unauthenticated' || authStatus === 'loading' ? 'none' : 'auto'
          }}
        >
          Simulate Signout
        </button>
      </div>
    </div>
  );
}