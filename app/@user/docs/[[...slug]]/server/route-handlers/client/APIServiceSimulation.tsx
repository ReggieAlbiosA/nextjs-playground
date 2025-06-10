// app/page.tsx
'use client';

import { useState } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  theme: string;
  lastLogin: string;
}

export default function DevDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  // This function simulates the developer fetching the data.
  const handleFetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    setProfile(null);

    // As the developer, I am building the headers according to your API's documentation.
    const requestHeaders = new Headers();
    requestHeaders.append('X-Client-ID', 'dashboard-web-app');
    requestHeaders.append('X-App-Version', '1.7.2'); // This version is valid (>= 1.5.0)

    try {
      // I am now calling YOUR API endpoint.
      // Corrected from '/api/headers' to '/api/user-profile' to match our created API
      const response = await fetch('/api/user-profile', {
        method: 'GET',
        headers: requestHeaders, // Attaching the required custom headers.
      });

      const responseData = await response.json();

      if (!response.ok) {
        // If the API returns an error, I will display it to the user.
        throw new Error(`API Error (Status ${response.status}): ${responseData.error}`);
      }

      setProfile(responseData);

    } catch (err: unknown) { // FIXED: Use 'unknown' instead of 'any'
      // FIXED: Check if the error is an instance of Error before using it
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      {/* FIXED: Replaced ' with &apos; to escape the entity */}
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Developer&apos;s Dashboard</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        This page acts as a client consuming your custom header-protected API.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <button onClick={handleFetchProfile} disabled={isLoading} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#6e44ff', color: 'white', border: 'none', borderRadius: '8px' }}>
          {isLoading ? 'Loading Profile...' : 'Fetch User Profile'}
        </button>
      </div>

      {error && (
        <div style={{ padding: '1rem', backgroundColor: '#ffebee', border: '1px solid #c62828', color: '#c62828', borderRadius: '8px' }}>
          <strong>Failed to fetch profile:</strong>
          <p style={{ margin: '0.5rem 0 0', fontFamily: 'monospace' }}>{error}</p>
        </div>
      )}

      {profile && (
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ marginTop: 0, color: '#6e44ff' }}>Welcome, {profile.name}!</h3>
          <ul>
            <li><strong>User ID:</strong> {profile.id}</li>
            <li><strong>Email:</strong> {profile.email}</li>
            <li><strong>Location:</strong> {profile.location}</li>
            <li><strong>Theme Preference:</strong> {profile.theme}</li>
            <li><strong>Last Login:</strong> {new Date(profile.lastLogin).toLocaleString()}</li>
          </ul>
        </div>
      )}
    </div>
  );
}