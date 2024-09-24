import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

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
]);
