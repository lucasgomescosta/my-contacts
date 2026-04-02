import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["**/*.js", "**/*.cjs", "**/*.mjs"] },
  { files: ["**/*.json"], plugins: { json }, rules: { "react/jsx-filename-extensions": [1, { "extensions": [".js" , ".jsx"]}], "react/react-in-jsx-scope": "off", "import/prefer-default-export": "off"}, language: "json/json", extends: ["json/recommended"] },
]);
