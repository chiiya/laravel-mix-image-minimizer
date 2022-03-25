const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ManifestPlugin = require("./ManifestPlugin.js");

class ImageMinimizer {
  name() {
    return ["images"];
  }

  dependencies() {
    return ["copy-webpack-plugin", "image-minimizer-webpack-plugin"];
  }

  register(options = {}) {
    this.implementation = options.implementation || "squoosh";
    this.patterns = options.patterns || [
      {
        from: "**/*",
        to: "images",
        context: "resources/images",
      },
    ];
    this.copyOptions = Object.assign(
      { patterns: this.patterns },
      options.copyOptions || {}
    );
    this.webp = options.webp || false;
    this.webpOptions =
      options.webpOptions ||
      (this.implementation === "squoosh"
        ? {
            encodeOptions: {
              webp: {
                quality: 90,
              },
            },
          }
        : {
            plugins: ["imagemin-webp"],
          });
    this.options =
      options.options ||
      (this.implementation === "squoosh"
        ? undefined
        : {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          });
  }

  webpackConfig(webpackConfig) {
    webpackConfig.optimization.minimizer =
      webpackConfig.optimization.minimizer || [];
    webpackConfig.optimization.minimizer.push(
      new ImageMinimizerPlugin({
        deleteOriginalAssets: false,
        minimizer: {
          implementation:
            this.implementation === "squoosh"
              ? ImageMinimizerPlugin.squooshMinify
              : ImageMinimizerPlugin.imageminMinify,
          options: this.options,
        },
        generator: this.webp
          ? [
              {
                type: "asset",
                filename: "[path][name][ext]",
                implementation:
                  this.implementation === "squoosh"
                    ? ImageMinimizerPlugin.squooshGenerate
                    : ImageMinimizerPlugin.imageminGenerate,
                options: this.webpOptions,
                filter: (source, sourcePath) => {
                  if (
                    sourcePath.endsWith(".svg") ||
                    sourcePath.endsWith(".webp") ||
                    sourcePath.endsWith(".avif")
                  ) {
                    return false;
                  }

                  return true;
                },
              },
            ]
          : undefined,
      })
    );
  }

  webpackPlugins() {
    const CopyWebpackPlugin = require("copy-webpack-plugin");
    let { patterns, copyOptions } = this;

    return [new CopyWebpackPlugin(copyOptions), new ManifestPlugin(patterns)];
  }
}

module.exports = ImageMinimizer;
