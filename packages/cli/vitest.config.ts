import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["src/**/*.spec.ts"],
    maxWorkers: 2,
    maxConcurrency: 2,
    testTimeout: 2500,
    setupFiles: ["test/setup.ts"],
  },
});
