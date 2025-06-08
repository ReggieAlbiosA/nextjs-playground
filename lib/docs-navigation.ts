// app/lib/docs-navigation.ts

// Define the NavItem type once, here.
export type NavItem = {
  title: string;
  url: string;
  icon?: string; // Assuming icon names are strings from IconMap
  items?: NavItem[];
};

export const buildingYourApplicationItems: NavItem[] = [
  {
    title: "Routing",
    url: "/docs/routing",
    icon: "Route",
    items: [
      { title: "Route Handlers", url: "/docs/routing/route-handlers" },
      { title: "Middleware", url: "/docs/routing/middleware" },
    ]
  },
  {
    title: "Data Fetching",
    url: "/docs/data-fetching",
    icon: "RefreshCcw",
    items: [
        { title: "Server Actions and Mutations", url: "/docs/data-fetching/server-actions" },
    ]
  },
  {
    title: "Deep Dive",
    url: "/docs/deep-dive",
    icon: "Droplets",
    items: [
        { title: "Caching", url: "/docs/deep-dive/caching" }
    ]
  }
];

export const apiReferenceItems: NavItem[] = [
  {
    title: "Directives",
    url: "/docs/api-reference/directives",
    icon: "CodeXml",
    items: [
      { title: "use client", url: "/docs/api-reference/directives/use-client" },
      { title: "use server", url: "/docs/api-reference/directives/use-server" },
    ]
  },
  {
    title: "Components",
    url: "/docs/api-reference/components",
    icon: "Blocks",
    items: [
      { title: "Font", url: "/docs/api-reference/components/font" },
      { title: "Image", url: "/docs/api-reference/components/image" },
      { title: "Link", url: "/docs/api-reference/components/link" },
      { title: "Script", url: "/docs/api-reference/components/script" },
    ]
  },
  {
    title: "File-system conventions",
    url: "/docs/api-reference/file-conventions",
    icon: "Files",
    items: [
      { title: "default.js", url: "/docs/file-conventions/default-js" },
      { title: "Dynamic Segments", url: "/docs/file-conventions/dynamic-segments" },
      { title: "error.js", url: "/docs/file-conventions/error-js" },
      { title: "generate-metadata.js", url: "/docs/file-conventions/generate-metadata-js" },
      { title: "instrumentation-client.js", url: "/docs/file-conventions/instrumentation-client-js" },
      { title: "Intercepting Routes", url: "/docs/file-conventions/intercepting-routes" },
      { title: "layout.js", url: "/docs/file-conventions/layout-js" },
      { title: "loading.js", url: "/docs/file-conventions/loading-js" },
      { title: "mdx-components.js", url: "/docs/file-conventions/mdx-components-js" },
      { title: "middleware.js", url: "/docs/file-conventions/middleware-js" },
      { title: "not-found.js", url: "/docs/file-conventions/not-found-js" },
      { title: "page.js", url: "/docs/file-conventions/page-js" },
      { title: "Parallel Routes", url: "/docs/file-conventions/parallel-routes" },
      { title: "public", url: "/docs/file-conventions/public" },
      { title: "route.js", url: "/docs/file-conventions/route-js" },
      { title: "Route Groups", url: "/docs/file-conventions/route-groups" },
      { title: "Route Segment Config", url: "/docs/file-conventions/route-segment-config" },
      { title: "src", url: "/docs/file-conventions/src" },
      { title: "template.js", url: "/docs/file-conventions/template-js" },
      { title: "unauthorized.js", url: "/docs/file-conventions/unauthorized-js" },
      {
        title: "Metadata Files",
        url: "/docs/api-reference/metadata-files",
        icon: "FileJson2",
        items: [
          { title: "favicon, icon, and apple-icon", url: "/docs/api-reference/metadata-files/favicon-icon" },
          { title: "manifest.json", url: "/docs/api-reference/metadata-files/manifest-json" },
          { title: "opengraph-image", url: "/docs/api-reference/metadata-files/opengraph-image" },
          { title: "robots.txt", url: "/docs/api-reference/metadata-files/robots-txt" },
          { title: "sitemap.xml", url: "/docs/api-reference/metadata-files/sitemap-xml" },
        ]
      }
    ]
  },
];
