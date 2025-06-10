import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Your API's requirement: Only versions 1.5.0 and above are supported.
const MINIMUM_SUPPORTED_VERSION = 1.5;

export async function GET(_request: NextRequest) {
  // Read the headers sent by the developer's client.
  // Header names are case-insensitive, so 'x-client-id' works.
  const headersList = await headers();
  const clientId = headersList.get('x-client-id');
  const appVersion = headersList.get('x-app-version');

  // --- Enforcing Your Rules ---

  // Rule 1: Check if the required headers are present.
  if (!clientId || !appVersion) {
    return NextResponse.json(
      { error: 'Bad Request: Missing required headers. Please include X-Client-ID and X-App-Version.' },
      { status: 400 }
    );
  }

  // Rule 2: Check if the app version is supported.
  const versionNumber = parseFloat(appVersion);
  if (isNaN(versionNumber) || versionNumber < MINIMUM_SUPPORTED_VERSION) {
    return NextResponse.json(
      { error: `Upgrade Required: App version ${appVersion} is no longer supported. Please upgrade to ${MINIMUM_SUPPORTED_VERSION} or higher.` },
      { status: 426 } // 426 Upgrade Required is a specific and fitting status code here.
    );
  }

  // --- If all rules are passed, return the protected data ---
  console.log(`Successful request from Client ID: ${clientId}, Version: ${appVersion}`);

  const userProfile = {
    id: 'user-12345',
    name: 'Alex Reyes',
    email: 'alex.reyes@example.com',
    location: 'Calumpit, Philippines',
    theme: 'dark',
    lastLogin: new Date().toISOString(),
  };

  return NextResponse.json(userProfile, { status: 200 });
}