import { babel } from "@rollup/plugin-babel";
// import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
const extensions = [".ts"];

export default [
  {
    input: "src/base.ts",
    output: {
      file: "lib/onelog.min.js",
      format: "iife",
    },
    plugins: [
      typescript(),
      babel({
        exclude: "./node_modules/**",
        extensions,
      }),
    ],
  },
];
