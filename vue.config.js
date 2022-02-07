/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-key-ring/" : "/",
  outputDir: "docs",
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
  pwa: {
    name: "KeyringApp",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      orientation: "portrait",
      UIStatusBarStyle: "UIStatusBarStyleBlackOpaque",
      StatusBarBackground: "#000000",
    },
  },
};
