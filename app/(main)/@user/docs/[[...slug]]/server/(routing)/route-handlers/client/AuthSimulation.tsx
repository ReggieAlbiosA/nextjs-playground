'use client';

import { useState, useEffect } from 'react';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export default function StyledAuthSimulation() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');

  // This logic remains the same: it checks auth status on mount
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

  // Login/logout handlers also remain the same
  const handleSimulateLogin = async () => {
    setAuthStatus('loading');
    try {
      await fetch('/api/cookies', { method: 'POST' });
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
      window.location.reload();
    } catch (error) {
      console.error('Failed to simulate signout:', error);
      setAuthStatus('authenticated');
    }
  };

  // The config function is kept to manage dynamic styles
  const getStatusConfig = () => {
    switch (authStatus) {
      case 'authenticated':
        return {
          color: 'from-green-500 to-emerald-500',
          textColor: 'text-green-800 dark:text-green-200',
          icon: '✓',
          label: 'Authenticated'
        };
      case 'unauthenticated':
        return {
          color: 'from-red-500 to-rose-500',
          textColor: 'text-red-800 dark:text-red-200',
          icon: '✗',
          label: 'Unauthenticated'
        };
      default: // loading
        return {
          color: 'from-gray-400 to-gray-500',
          textColor: 'text-gray-700 dark:text-gray-300',
          icon: '⟳',
          label: 'Verifying'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    // This outer container mimics the card style from the price demo
    <div className="relative overflow-hidden transition-all duration-300 bg-white border shadow-md group rounded-xl border-gray-200/60 dark:bg-gray-800/60 dark:border-gray-700/60 hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm">
      <div className="relative p-6 space-y-6">
        
        {/* 1. Header Section - styled like the price demo's left side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 text-xl text-white transition-transform duration-300 transform shadow-md rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 group-hover:scale-105">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zm0 2a3 3 0 013 3v2H7V7a3 3 0 013-3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Authentication Status</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">HTTP Cookie-based Session</p>
          </div>
        </div>

        {/* 2. Status Display - The core UI from the original auth demo */}
        <div className="flex items-center justify-center p-4 transition-colors duration-200 border rounded-lg border-gray-200/60 bg-gray-50/60 dark:border-gray-600/60 dark:bg-gray-700/50">
           <div className={`w-10 h-10 bg-gradient-to-r ${statusConfig.color} rounded-full flex items-center justify-center text-white font-bold text-lg ${authStatus === 'loading' ? 'animate-spin' : ''}`}>
             {statusConfig.icon}
           </div>
           <div className="ml-4 text-left">
             <div className={`text-lg font-bold ${statusConfig.textColor}`}>
               {statusConfig.label}
             </div>
             <div className="text-sm text-gray-500 dark:text-gray-400">
               {authStatus === 'authenticated' && 'Session cookie is present'}
               {authStatus === 'unauthenticated' && 'No session cookie found'}
               {authStatus === 'loading' && 'Checking server...'}
             </div>
           </div>
        </div>
        
        {/* 3. Action Buttons - Kept the original style which is already high-quality */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={handleSimulateLogin}
            disabled={authStatus === 'authenticated' || authStatus === 'loading'}
            className="group relative px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform disabled:bg-gray-400/80 dark:disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-70 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Simulate Login
          </button>
          <button
            onClick={handleSimulateSignout}
            disabled={authStatus === 'unauthenticated' || authStatus === 'loading'}
            className="group relative px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform disabled:bg-gray-400/80 dark:disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-70 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Simulate Logout
          </button>
        </div>

      </div>
    </div>
  );
}