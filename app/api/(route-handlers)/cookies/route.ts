// app/api/auth/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const TOKEN_NAME = 'public-token';
const TOKEN_VALUE = 'test-token-123'; // A fixed value for demonstration

/**
 * @swagger
 * /api/auth:
 * get:
 * summary: Check authentication status
 * description: Verifies the presence and correctness of the authentication cookie using NextRequest.
 * responses:
 * 200:
 * description: Authentication status
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * isAuthenticated:
 * type: boolean
 */
export async function GET(_request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME);

  if (!token || token.value !== TOKEN_VALUE) {
    return NextResponse.json({ isAuthenticated: false }, { status: 200 });
  }

  return NextResponse.json({ isAuthenticated: true }, { status: 200 });
}

/**
 * @swagger
 * /api/auth:
 * post:
 * summary: Simulate user login
 * description: Sets a fixed authentication cookie using NextRequest.
 * responses:
 * 200:
 * description: Login successful
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 */
export async function POST(_request: NextRequest) {
  const cookieStore = await cookies();

  // Set the cookie
  cookieStore.set(TOKEN_NAME, TOKEN_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day in seconds
  });

  return NextResponse.json({ message: 'Login successful!' }, { status: 200 });
}

/**
 * @swagger
 * /api/auth:
 * delete:
 * summary: Simulate user signout
 * description: Revokes the authentication cookie using NextRequest.
 * responses:
 * 200:
 * description: Signout successful
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 */
export async function DELETE(_request: NextRequest) {
  const cookieStore = await cookies();

  // Delete the cookie
  cookieStore.delete(TOKEN_NAME);

  return NextResponse.json({ message: 'Signout successful!' }, { status: 200 });
}