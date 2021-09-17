import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { Configuration } from 'webpack'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const config: Configuration = {
  devtool: 'eval',
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
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
    new CssMinimizerPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
}

export default config
