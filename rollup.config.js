import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.js",
    output: {
      file: "lib/index.js",
      format: "es",
    },
    plugins: [
      babel({ babelHelpers: "bundled", exclude: "src/sensorsdata.es6.min.js" }),
    ],
  },
  {
    input: "src/index.iife.js",
    output: {
      file: "lib/qdama-onelog-js.min.js",
      format: "iife",
    },
    plugins: [
      babel({ babelHelpers: "bundled", exclude: "src/sensorsdata.es6.min.js" }),
      terser(),
    ],
  },
];
