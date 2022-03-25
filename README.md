# Laravel Mix Image Minimizer
[![Latest Version on NPM](https://img.shields.io/npm/v/@chiiya/laravel-mix-image-minimizer.svg?style=flat-square)](https://npmjs.com/package/@chiiya/laravel-mix-image-minimizer)
[![npm](https://img.shields.io/npm/dt/@chiiya/laravel-mix-image-minimizer.svg?style=flat-square)](https://www.npmjs.com/package/@chiiya/laravel-mix-image-minimizer)
[![Software License](https://img.shields.io/npm/l/@chiiya/laravel-mix-image-minimizer.svg?style=flat-square)](LICENSE)

This extension adds support for [image-minimizer-webpack-plugin](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/) 
to [Laravel Mix](https://github.com/JeffreyWay/laravel-mix). It uses the [squoosh](https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh) 
implementation, since imagemin [is not maintained anymore](https://github.com/imagemin/imagemin/issues/385).

## Installation

```
npm i -D @chiiya/laravel-mix-image-minimizer
```

## Usage

Require the extension inside your `webpack.mix.js` and use it like so:

```js
const mix = require('laravel-mix');
require('@chiiya/laravel-mix-image-minimizer');

mix.images({
  webp: true,
});
```

## Options

| Name             | Type            | Default                                                      | Description                                                  |
| ---------------- | --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `patterns`       | `Array<Object>` | `[{ from: "**/*", to: "images", context: "resources/images" }]` | `pattern` option as supported by the `copy-webpack-plugin`   |
| `webp`           | `Boolean`       | `false`                                                      | If enabled, additional `webp` versions of all images will be generated |
| `squooshOptions` | `Object`        | `undefined`                                                  | Custom `squoosh` configuration for image minification        |
| `copyOptions`    | `Object`        | `{ patterns: options.patterns }`                             | Additional configuration for the `copy-webpack-plugin`       |
| `webpOptions`    | `Object`        | `{ encodeOptions: { webp: { quality: 90 }}}`                 | Custom `squoosh` configuration for generating webp images    |


