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

  const getStatusConfig = () => {
    switch (authStatus) {
      case 'authenticated':
        return {
          color: 'from-green-500 to-emerald-500',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          textColor: 'text-green-800 dark:text-green-200',
          icon: '✓',
          label: 'Authenticated'
        };
      case 'unauthenticated':
        return {
          color: 'from-red-500 to-rose-500',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          textColor: 'text-red-800 dark:text-red-200',
          icon: '✗',
          label: 'Unauthenticated'
        };
      default:
        return {
          color: 'from-gray-400 to-gray-500',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-700',
          textColor: 'text-gray-700 dark:text-gray-300',
          icon: '⟳',
          label: 'Loading'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="p-8 border shadow-lg card-bg rounded-2xl border-gray-200/50 dark:border-gray-700/50">
      <div className="space-y-8 text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 8A6 6 0 006 8v2a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2v-6a2 2 0 00-2-2V8zm-7-2a1 1 0 11-2 0 1 1 0 012 0zm-3 4a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Authentication Demo
          </h3>
        </div>

        {/* Status Display */}
        <div className="space-y-4">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            Current Authentication Status
          </p>
          
          <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl ${statusConfig.bgColor} ${statusConfig.borderColor} border-2`}>
            <div className={`w-10 h-10 bg-gradient-to-r ${statusConfig.color} rounded-full flex items-center justify-center text-white font-bold text-lg ${authStatus === 'loading' ? 'animate-spin' : ''}`}>
              {statusConfig.icon}
            </div>
            <div className="text-left">
              <div className={`text-lg font-bold ${statusConfig.textColor}`}>
                {statusConfig.label}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {authStatus === 'authenticated' && 'Session is active'}
                {authStatus === 'unauthenticated' && 'No active session'}
                {authStatus === 'loading' && 'Checking status...'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={handleSimulateLogin}
            disabled={authStatus === 'authenticated' || authStatus === 'loading'}
            className={`
              group relative px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform
              ${authStatus === 'authenticated' || authStatus === 'loading' 
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
              }
            `}
          >
            <div className="flex items-center gap-2">
              {authStatus === 'loading' ? (
                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              <span>Simulate Login</span>
            </div>
            {!(authStatus === 'authenticated' || authStatus === 'loading') && (
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl group-hover:opacity-100 -z-10"></div>
            )}
          </button>

          <button
            onClick={handleSimulateSignout}
            disabled={authStatus === 'unauthenticated' || authStatus === 'loading'}
            className={`
              group relative px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform
              ${authStatus === 'unauthenticated' || authStatus === 'loading' 
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
              }
            `}
          >
            <div className="flex items-center gap-2">
              {authStatus === 'loading' ? (
                <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
              )}
              <span>Simulate Logout</span>
            </div>
            {!(authStatus === 'unauthenticated' || authStatus === 'loading') && (
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-red-600 to-pink-700 rounded-xl group-hover:opacity-100 -z-10"></div>
            )}
          </button>
        </div>

        {/* Info Panel */}
        <div className="p-4 mt-8 border rounded-lg bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h5 className="mb-1 font-semibold text-amber-900 dark:text-amber-100">Demo Notice</h5>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                This demo simulates authentication using HTTP cookies. The page will reload after login/logout to demonstrate server-side cookie handling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}