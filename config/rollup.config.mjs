import terser from "@rollup/plugin-terser"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

import fs from "fs-jetpack"
import aml from "../lib/parser.mjs"

fs.write("dist/module.mjs", aml.module)

export default [
    {
        input: "dist/module.mjs",
        output: {
            file: "dist/module.min.mjs",
            format: "esm"
        },
        plugins: [
            terser()
        ]
    },
    {
        input: "lib/preact.mjs",
        output: {
            file: "dist/preact.min.mjs",
            format: "esm"
        },
        plugins: [
            resolve(),
            commonjs(),
            terser()
        ]
    }
]
