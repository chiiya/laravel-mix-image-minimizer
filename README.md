<br />
<div align="center">
  <p align="center">
    <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/license-MIT-green.svg"></a>
    <a href="https://www.npmjs.com/package/@chiiya/laravel-mix-imagemin" target="_blank"><img src="https://img.shields.io/npm/v/@chiiya/laravel-mix-imagemin.svg"></a>
    <a href="https://prettier.io" target="_blank"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat"></a>
  </p>

  <strong>
    <h2 align="center">Laravel Mix Imagemin</h2>
  </strong>

  <p align="center">
    Laravel Mix plugin for optimizing images using imagemin.
  </p>

  <p align="center">
    <strong>
    <a href="#installation">installation</a>
      &nbsp; &middot; &nbsp;
      <a href="#usage">usage</a>
      &nbsp; &middot; &nbsp;
      <a href="#options">options</a>
    </strong>
  </p>
</div>
<br />

## Installation

<pre>npm i --save-dev <a href="https://www.npmjs.com/package/@chiiya/laravel-mix-imagemin">@chiiya/laravel-mix-imagemin</a></pre>

## Usage
Require it in your `webpack.mix.js` file, then pass it a valid [`copy-webpack-plugin`](https://webpack.js.org/plugins/copy-webpack-plugin/)
config:

```js
require('@chiiya/laravel-mix-imagemin');

mix
  .imagemin({
    patterns: [
      {
        from: '**/*',
        to: 'images',
        context: 'resources/images',
      },
    ],
  });
```

## Options

The `mix.imagemin` function accepts two parameters: options for the [`copy-webpack-plugin`](https://webpack.js.org/plugins/copy-webpack-plugin/)
and options for the [`imagemin-webpack-plugin`](https://github.com/Klathmon/imagemin-webpack-plugin).

```js
require('@chiiya/laravel-mix-imagemin');

mix
  .imagemin({
    patterns: [
      {
        from: '**/*',
        to: 'images',
        context: 'resources/images',
      },
    ],
  }, {
    pngquant: {
      quality: '95-100'
    }
  });
```
