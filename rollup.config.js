import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const extensions = [".js", ".ts"];

export default {
  input: "src/colorconvertor.ts",
  output: [
    {
      file: "lib/bundles/color-convertor.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "lib/bundles/color-convertor.esm.min.js",
      format: "esm",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: "lib/bundles/color-convertor.umd.min.js",
      format: "umd",
      name: "color-convertor",
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
