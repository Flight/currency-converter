/* eslint-disable @typescript-eslint/naming-convention, eslint-comments/disable-enable-pair, no-underscore-dangle */
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on(
        "file:preprocessor",
        vitePreprocessor(path.resolve(__dirname, "./vite.config.ts"))
      );
    },
  },
});
