const mix = require("laravel-mix");
const ImageMinimizer = require("./src/ImageMinimizer.js");

mix.extend("images", new ImageMinimizer());
