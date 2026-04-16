import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "node",
    include: ["lib/**/*.test.{ts,tsx}", "components/**/*.test.{ts,tsx}"],
    // Content pipeline tests need real FS. Keep single-threaded to avoid
    // module-level cache cross-test pollution.
    pool: "forks",
    poolOptions: { forks: { singleFork: true } },
  },
});
