import path from "node:path";
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [swc.vite()],
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "app"),
            "#": path.resolve(__dirname, "app", "services"),
        },
    },
    test:{
        include:["./app/**/*.test.ts"]
    }
});
