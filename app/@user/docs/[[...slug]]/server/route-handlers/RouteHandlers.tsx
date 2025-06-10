import LivePriceData from "./client/LivePriceData";
import AuthSimulation from "./client/AuthSimulation";
import APIServiceSimulation from "./client/APIServiceSimulation";

export function RouteHandlers({ pageTitle }: { pageTitle: string }) {
  return (
    <section className="w-full space-y-8">
      <header>
        <h1 className="text-4xl tracking-tight font-extold lg:text-5xl">
          {pageTitle}
        </h1>
      </header>

      <section>
        <div>
          <h2 className="text-2xl font-bold">Rendering Modes</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            This section provides live examples of different rendering modes in Next.js by fetching data from an API route. The prices for ISR and SSR will update based on their caching strategies.
          </p>
        </div>
        <LivePriceData />
      </section>

      <section>
        <div>
          <h2 className="text-2xl font-bold">Cookies</h2>
          {/* FIXED: Replaced user's with user&apos;s */}
          <p className="text-lg text-gray-600 dark:text-gray-400">Cookies are small pieces of data stored on the user&apos;s device by the web server. They are often used to track user preferences, authentication, and session information.</p>
        </div>
        <AuthSimulation />
      </section>

      <section>
        <div>
          <h2 className="text-2xl font-bold">Headers</h2>
          {/* FIXED: Replaced user's with user&apos;s */}
          <p className="text-lg text-gray-600 dark:text-gray-400">Headers are key-value pairs that are sent with each request to the server. They provide additional information about the request, such as the user&apos;s IP address, user agent, and other metadata.</p>
        </div>
        <APIServiceSimulation />
      </section>
    </section>
  );
}