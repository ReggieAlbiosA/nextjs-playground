import React from 'react';
import { LayoutCounter } from './server/(file-system-convention)/template/client/LayoutCounter';
import Link from 'next/link';

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const isTemplateRoute = resolvedParams.slug?.includes('template');

  return (
    <>
      {isTemplateRoute ? (
        <div className="p-6 border border-green-500 border-dashed rounded-lg">
              <div className="p-4 rounded-t-lg bg-green-900/50">
                <h2 className="text-xl font-semibold text-green-300">/demo-layout/layout.tsx</h2>
                <p className="text-sm text-green-400">This component&apos;s state is preserved on navigation.</p>
                <LayoutCounter />
              </div>
        
              <nav className="flex p-4 my-4 space-x-4">
                <Link href="/docs/file-conventions/template/demo-layout?view=preview" className="text-blue-400 hover:text-blue-300">Go to Page One</Link>
                <Link href="/docs/file-conventions/template/demo-layout/page-two?view=preview" className="text-blue-400 hover:text-blue-300">Go to Page Two</Link>
              </nav>
        
              <div className="p-4 rounded-b-lg bg-black/30">
                {children}
              </div>
            </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}