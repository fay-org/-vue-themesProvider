import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

const config: webpack.Configuration = {
  devtool: 'eval',
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
}

export default config
