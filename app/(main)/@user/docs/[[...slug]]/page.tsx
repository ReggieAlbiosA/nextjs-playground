// app/docs/[[...slug]]/page.tsx

import React from 'react';
// NEW: Import the navigation data from the central file
import { buildingYourApplicationItems, apiReferenceItems, NavItem } from '@/lib/docs-navigation';

import { RouteHandlersPage } from './server/(routing)/route-handlers/RouteHandlers';


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

   // FIXED: Join the slug array to get the full path for comparison
  const fullSlug = resolvedParams.slug?.join('/') || '';
  // Fallback for all other pages
  return (
    <>
      {fullSlug === 'routing/route-handlers' && currentView === 'preview' ? (
        <RouteHandlersPage pageTitle={pageTitle} />
      ) : (
        <></> // Fallback for other pages
      )}
    </>
  );
}