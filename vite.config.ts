import { defineConfig, splitVendorChunkPlugin } from "vite";
import liveReload from "vite-plugin-live-reload";
import preact from "@preact/preset-vite";

import path from "path";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
    plugins: [
        liveReload([path.resolve(__dirname, "./resources/views/**/*.ejs")]),
        splitVendorChunkPlugin(),
        preact(),
    ],
    root: "resources",
    base: "/dist/",
    resolve: {
        // RESOURCES ALIAS
        alias: {
            "~": path.resolve(__dirname, "resources", "ts"),
            "#": path.resolve(__dirname, "resources", "ts", "services"),
        },
    },
    build: {
        outDir: path.resolve(__dirname, "public", "dist"),
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: path.resolve(__dirname, "resources", "ts", "main.ts"),
        },
    },
    server: {
        strictPort: true,
        port: Number(process.env.VITE_PORT),
        host: true,
    },
});
