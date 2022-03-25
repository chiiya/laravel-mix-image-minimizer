const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ManifestPlugin = require("./ManifestPlugin.js");

class ImageMinimizer {
  name() {
    return ["images"];
  }

  dependencies() {
    return [
      "@squoosh/lib",
      "copy-webpack-plugin",
      "image-minimizer-webpack-plugin",
    ];
  }

  register(options = {}) {
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
    this.webpOptions = options.webpOptions || {
      encodeOptions: {
        webp: {
          quality: 90,
        },
      },
    };
    this.squooshOptions = options.squooshOptions;
  }

  webpackConfig(webpackConfig) {
    webpackConfig.optimization.minimizer =
      webpackConfig.optimization.minimizer || [];
    webpackConfig.optimization.minimizer.push(
      new ImageMinimizerPlugin({
        deleteOriginalAssets: false,
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: this.squooshOptions,
        },
        generator: this.webp
          ? [
              {
                type: "asset",
                filename: "[path][name][ext]",
                implementation: ImageMinimizerPlugin.squooshGenerate,
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
