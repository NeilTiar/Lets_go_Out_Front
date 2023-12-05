const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
  
  devServer: {
    open: true, // Ouvrir automatiquement le navigateur
    hot: true, // Activer le rechargement à chaud,
   
  },
});