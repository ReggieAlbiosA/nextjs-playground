import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // This spread contains the default Next.js rules, including the original 'no-unused-vars' rule.
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ADD THIS OBJECT: We add a new object to the array to override the default rule.
  {
    rules: {
      // This specifically targets the rule we want to change.
      "@typescript-eslint/no-unused-vars": [
        "error", // Keep it as an error
        {
          // Add this configuration to ignore variables/arguments prefixed with an underscore.
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ]
    }
  }
];

export default eslintConfig;