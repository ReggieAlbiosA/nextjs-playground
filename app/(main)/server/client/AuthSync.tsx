'use client';

import { useEffect } from 'react';
export default function AuthSync() {
  useEffect(() => {
    const handler = (e: StorageEvent) => {

      if (e.key === 'auth-event') {
          const data = JSON.parse(e.newValue || '{}');
          if (data.event === 'signed-in') {
            setTimeout(() => {
            window.location.replace('/'); // Redirect to home page on login
          }, 4000);   
          }
          if (data.event === 'signed-out') {
            window.location.replace('/'); // Redirect to home page on logout
          }
      }

    };

    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('storage', handler);
    }
  }, []);

  return null;
}
