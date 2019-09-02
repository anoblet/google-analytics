import typescript from "rollup-plugin-typescript";

export default {
  input: "./src/Component.ts",
  output: {
    file: "dist/google-analytics.js",
    format: "esm"
  },
  plugins: [typescript()]
};
