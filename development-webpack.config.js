const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/animation.js',
    output: {
        filename: 'animation.js',
        path: path.resolve(__dirname, 'dist'),
    },
};