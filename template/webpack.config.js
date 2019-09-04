const path = require('path')
const nodeExternals = require('webpack-node-externals')
const WebpackShellPlugin = require('webpack-shell-plugin')

const isProd = process.env.NODE_ENV === 'production'

const plugins = []

if (!isProd) {
  const filepath = path.join(__dirname, './dist/bundle.js')
  const nodemonShell = `nodemon --watch ${filepath} ${filepath}`
  plugins.push(new WebpackShellPlugin({ onBuildEnd: [nodemonShell] }))
}

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),

  mode: isProd ? 'production' : 'development',
  target: 'node',
  externals: nodeExternals(),

  node: {
    __filename: false,
    __dirname: false,
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    chunkFilename: 'chunk.[chunkhash:8].js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.js$/, loader: 'source-map-loader' },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
    extensions: ['.js', '.ts'],
  },

  optimization: {
    /**
     * minimize may have an impact on the orm framework
     * e.g. typeorm
     */
    minimize: false,
  },

  plugins,
}
