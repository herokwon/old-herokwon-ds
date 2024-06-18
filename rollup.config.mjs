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
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const extensions = ['.mjs', '.js', '.jsx', '.ts', '.tsx'];

const config = [
    {
        input: 'index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
                exports: 'named',
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
                        replacement: path.resolve(__dirname, 'public'),
                    },
                    {
                        find: '@',
                        replacement: path.resolve(__dirname, 'src'),
                    },
                ],
            }),
            babel({
                babelHelpers: 'runtime',
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                    '@babel/preset-typescript',
                ],
                extensions: extensions,
                exclude: 'node_modules/**',
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
                extensions: extensions,
            }),
            terser(),
            typescript({
                tsconfig: './tsconfig.json',
                exclude: ['node_modules', '**/*.stories.tsx']
            }),
        ],
    },
];

export default config;