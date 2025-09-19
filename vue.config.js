const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new CompressionPlugin({
        test: /\.(js|css|html|svg)$/,
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8,
      }),

      new ImageMinimizerPlugin({
        minimizer: {
          // Les options de configuration de l'optimiseur d'images
          implementation: ImageMinimizerPlugin.sharpMinify,

          options: {

            encodeOptions: {

              jpeg: {
                quality: 90,
                 mozjpeg: true
              },
              png: {
                quality: 90,
              },
                 jpg: {
                quality: 90,
              },
            },

          },
        },
      }),

    ],
  },
  // Ajouter la clé "chainWebpack" pour définir le drapeau
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      args[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = true;
      return args;
    });
  },

  devServer: {
   
    open: true, // Ouvrir automatiquement le navigateur
    hot: true, // Activer le rechargement à chaud,
  },
  
};