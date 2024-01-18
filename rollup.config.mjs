import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const extensions = [".js", ".ts"];

export default {
  input: "src/colorconverter.ts",
  output: [
    {
      file: "lib/bundles/colorconverter.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "lib/bundles/colorconverter.esm.min.js",
      format: "esm",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: "lib/bundles/colorconverter.umd.min.js",
      format: "umd",
      name: "colorconverter",
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    resolve({ extensions }),
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*.ts"],
      exclude: ["node_modules/**"],
    }),
  ],
};
