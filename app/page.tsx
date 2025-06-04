// app/your-page/page.tsx
import AnimatedCodeBlock from './server/components/AnimatedCodeBlock';

const tsCodeSnippet = [
  "export const auth = betterAuth({",
  "  database: new Pool({",
  "    connectionString: DATABASE_URL,",
  "  }),",
  "  emailAndPassword: {",
  "    enabled: true,",
  "  },",
  "  plugins: [",
  "    organization(),",
  "    twoFactor(),",
  "  ]",
  "})",
  "export const auth = betterAuth({",
  "  database: new Pool({",
  "    connectionString: DATABASE_URL,",
  "  }),",
  "  emailAndPassword: {",
  "    enabled: true,",
  "  },",
  "  plugins: [",
  "    organization(),",
  "    twoFactor(),",
  "  ]",
  "})",
];



export default function MyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-10">
      <h1 className="mb-8 text-3xl font-bold ">Animated Code Block</h1>
      <div className="w-full max-w-2xl mb-8">
        <AnimatedCodeBlock
          codeLines={tsCodeSnippet}
          language="typescript" // Specify the language
          fileName="auth.ts"
          codeAreaHeight="h-72"
          lineDelay={250} // Faster line appearance
        />
      </div>
    </div>
  );
}