import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import stylistic from "@stylistic/eslint-plugin";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"],   // ✔️ ignore global
  },
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      vue: pluginVue,
      "@stylistic": stylistic,
    },
    rules: {
      // tes règles custom
    },
  },
  pluginVue.configs["flat/recommended"],
  stylistic.configs["recommended"],
  prettier,
]);
