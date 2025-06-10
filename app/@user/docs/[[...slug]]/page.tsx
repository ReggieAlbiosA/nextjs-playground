// app/docs/[[...slug]]/page.tsx

import React from 'react';
// NEW: Import the navigation data from the central file
import { buildingYourApplicationItems, apiReferenceItems, NavItem } from '@/lib/docs-navigation';
import { RouteHandlers } from './server/route-handlers/RouteHandlers';

function flattenRoutes(items: NavItem[]): string[] {
  const paths: string[] = [];

  items.forEach(item => {
    // Add the parent route, ensuring it's trimmed
    paths.push(item.url.trim());
    // If there are nested items, recursively flatten them too
    if (item.items) {
      paths.push(...flattenRoutes(item.items));
    }
  });

  return paths;
}

export async function generateStaticParams() {
  const allNavItems = [...buildingYourApplicationItems, ...apiReferenceItems];
  const allPaths = flattenRoutes(allNavItems);

  return allPaths.map(path => {
    // Clean the URL and split it into segments for the `slug` parameter
    // e.g., "/docs/routing/middleware" -> ["routing", "middleware"]
    const slug = path
      .replace('/docs/', '')
      .split('/')
      .filter(Boolean); // filter(Boolean) removes any empty strings from accidental slashes

    return { slug };
  });
}


const toTitleCase = (str: string) => {
  if (!str) return '';
  return str.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};


// --- THE MAIN ASYNC PAGE COMPONENT ---
export default async function DocsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ view?: 'codebase' | 'architecture' | 'preview' }>;
}) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const pageTitle = toTitleCase(resolvedParams.slug?.[resolvedParams.slug.length - 1] || 'Docs Home');
  const currentView = resolvedSearchParams.view || 'preview';

  if (resolvedParams.slug?.[resolvedParams.slug.length - 1] === 'route-handlers' &&
      currentView === 'preview') {
    
    return (
      <RouteHandlers pageTitle={pageTitle} />
    );
  }

  // Fallback for all other pages
  return (
    <section className="w-full space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {pageTitle}
        </h1>
      </header>
      <div className="p-8 border-2 border-dashed rounded-lg">
         <p className="text-lg text-gray-500 dark:text-gray-400">
            This is the <span className="font-semibold capitalize">{currentView}</span> view for &quot;{pageTitle}&quot;. Content is under construction.
         </p>
      </div>
    </section>
  );
}
