import React from 'react';
import Link from 'next/link';
import Counter from './Test';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-6 py-8 mx-auto">
        {/* Navigation Box */}
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-white border rounded-lg shadow-md">
            <div className="flex space-x-6">
              <Link
                href="/experimenting-with-template/page-1"
                className="px-4 py-2 text-white transition-colors duration-200 bg-blue-500 rounded hover:bg-blue-600"
              >
                Page 1
              </Link>
              
              <Link
                href="/experimenting-with-template/page-2"
                className="px-4 py-2 text-white transition-colors duration-200 bg-blue-500 rounded hover:bg-blue-600"
              >
                Page 2
              </Link>
              <Counter />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}