// webpack.config.js
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // Other webpack configurations...
  externals: [nodeExternals()],
  node: {
    // Allow these core modules to be used in the server bundle
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
