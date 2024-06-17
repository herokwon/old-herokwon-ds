import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from "autoprefixer";
import cssimport from "postcss-import";
import pkg from "./package.json" assert { type: "json" };
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const extensions = ['.mjs', '.js', '.jsx', '.ts', '.tsx'];

const config = [
    {
        input: 'index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
            }, {
                file: pkg.module,
                format: 'es',
                sourcemap: true,
                exports: 'named',
            }
        ],
        external: [/@babel\/runtime/],
        plugins: [
            alias({
                entries: [
                    {
                        find: '@public',
                        replacement: resolve(__dirname, 'public'),
                    },
                    {
                        find: '@',
                        replacement: resolve(__dirname, 'src'),
                    },
                ],
            }),
            babel({
                babelHelpers: 'runtime',
                exclude: 'node_modules/**',
                extensions,
                presets: ['@babel/preset-react'],
            }),
            commonjs({
                include: 'node_modules/**',
                extensions: extensions,
            }),
            image(),
            json({
                compact: true,
            }),
            peerDepsExternal(),
            postcss({
                extensions: ['.css'],
                minimize: true,
                plugins: [
                    cssimport(),
                    autoprefixer(),
                ],
            }),
            nodeResolve({
                extensions,
            }),
            terser(),
            typescript({
                tsconfig: './tsconfig.json',
            }),
        ],
    },
];

export default config;