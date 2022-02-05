/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "",
  indexPath: "index.html",
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Key Ring",
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@pkg", resolve("./package.json"));
  },
  productionSourceMap: false,
};
