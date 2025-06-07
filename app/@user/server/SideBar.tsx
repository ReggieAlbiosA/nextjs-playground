

// * client components
import { AppSidebar } from "./client/AppSidebar";
import { NavMain, type NavItem } from "./client/NavMain";

// Logo Component – Improved semantics
function SiteLogo() {
    return (
        <header className="relative flex items-center gap-3 px-4 py-4 border-b sm:px-6 sm:py-4 border-border/20">
            <div
                className="relative cursor-pointer group"
                aria-hidden="true"
            >
                {/* Hover glow */}
                <div className="absolute inset-0 transition-all duration-500 opacity-0 bg-gradient-to-br from-blue-500/15 to-indigo-500/15 rounded-xl blur-lg group-hover:opacity-100 group-focus:opacity-100" />
                <div className="relative p-2.5 sm:p-2 transition-all duration-300 border shadow-md rounded-xl border-white/40 dark:border-white/10 group-hover:shadow-lg group-hover:shadow-blue-400/15 dark:group-hover:shadow-blue-400/10 group-focus:shadow-lg group-focus:shadow-blue-400/15">
                    <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-br from-white/30 to-transparent dark:from-white/10 opacity-90" />
                    <svg
                        className="relative w-6 h-6 text-gray-800 transition-transform duration-300 dark:text-gray-100 sm:w-7 sm:h-7 drop-shadow-sm group-hover:scale-110 group-focus:scale-110"
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 256 256"
                        preserveAspectRatio="xMidYMid meet"
                        aria-hidden="true"
                    >
                        <g
                            transform="translate(0,256) scale(0.1,-0.1)"
                            stroke="none"
                            fill="currentColor"
                        >
                            <path d="M1556 2374 c-16 -9 -266 -191 -555 -404 -355 -262 -532 -399 -546 -422 -18 -30 -20 -54 -23 -310 -2 -153 0 -278 5 -278 4 0 201 144 436 320 467 349 467 349 518 294 24 -25 24 -26 27 -280 l3 -254 -25 -25 c-45 -45 -77 -35 -206 60 -63 47 -121 85 -129 85 -8 0 -90 -57 -182 -126 -167 -125 -169 -127 -169 -164 0 -52 12 -81 50 -118 29 -29 408 -325 488 -381 40 -28 98 -37 143 -22 54 18 468 339 504 389 l30 44 3 690 c3 812 14 735 -121 835 -46 34 -96 67 -111 73 -39 15 -106 12 -140 -6z" />
                        </g>
                    </svg>
                </div>
            </div>

            <div className="relative flex flex-col justify-center">
                <h1 className="flex items-baseline gap-x-1">
                    <span className="text-base font-bold tracking-tight text-gray-900 sm:text-lg dark:text-gray-50 bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-50 dark:to-gray-200">
                        Next.js
                    </span>
                    <span className="text-xs font-medium tracking-wide text-gray-500 sm:text-lg dark:text-gray-400">
                        Playground
                    </span>
                </h1>
            </div>
        </header>
    );
}

// --- DATA STRUCTURES FOR SIDEBAR ---

const buildingYourApplicationItems: NavItem[] = [
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

// --- CORRECTED SECTION ---
// All API-related items are now in a single array.
const apiReferenceItems: NavItem[] = [
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
            icon: "FileJson2", // We can give it an icon now
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

// --- NEW HELPER FUNCTION ---
// This recursive function traverses all nav items and appends the selected mode
// as a query parameter. This is a clean way to pass the view state.
const addModeToLinks = (items: NavItem[], mode: string): NavItem[] => {
    return items.map(item => {
        // Create a new item object to avoid mutation
        const newItem = { ...item };

        // Append the mode as a query parameter
        newItem.url = `${item.url}?view=${mode}`;

        // If there are nested items, recursively process them too
        if (item.items && item.items.length > 0) {
            newItem.items = addModeToLinks(item.items, mode);
        }

        return newItem;
    });
};

export function SideBar({ initialMode }: { initialMode: string }) {

      // --- MODIFICATION LOGIC ---
    // On the server, before rendering, we process the link arrays to add the
    // current mode to each URL.
    const modifiedBuildingItems = addModeToLinks(buildingYourApplicationItems, initialMode);
    const modifiedApiItems = addModeToLinks(apiReferenceItems, initialMode);

    return (
        <aside aria-label="Sidebar Navigation">
            <AppSidebar logo={<SiteLogo />} initialMode={initialMode}>

                <NavMain
                    items={modifiedBuildingItems}
                    sideBarGroupLabel="Building Your Application"
                />
                <NavMain
                    items={modifiedApiItems}
                    sideBarGroupLabel="API Reference"
                />

                    
            </AppSidebar>
        </aside>
    );
}
