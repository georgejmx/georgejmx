import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig([
    {
        input: "src/client/common.ts",
        output: {
            file: "assets/bundles/common.js",
            format: "iife",
        },
        plugins: [typescript(), nodeResolve()],
    },
    {
        input: "src/client/index.ts",
        output: {
            file: "assets/bundles/index.js",
            format: "iife",
        },
        plugins: [typescript(), nodeResolve()],
    },
    {
        input: "src/client/admin.ts",
        output: {
            file: "assets/bundles/admin.js",
            format: "iife",
            name: "admin",
        },
        plugins: [
            typescript(),
            nodeResolve({ preferBuiltins: true }),
            commonjs({
                include: /node_modules/,
                requireReturnsDefault: "auto",
            }),
        ],
    },
    {
        input: "src/client/story.ts",
        output: {
            file: "assets/bundles/story.js",
            format: "iife",
        },
        plugins: [typescript()],
    },
]);
