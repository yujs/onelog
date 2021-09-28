import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const extensions = [".ts"];

export default [
  {
    input: "src/base.ts",
    output: {
      file: "lib/onelog.min.js",
      format: "iife",
    },
    plugins: [
      babel({
        exclude: "./node_modules/**",
        extensions,
      }),
      terser(),
    ],
  },
];
