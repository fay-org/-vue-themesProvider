import * as path from 'path'
import * as webpack from 'webpack'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'

const config: webpack.Configuration = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    port: 9000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './example/index.html'),
    }),
  ],
}

export default config
