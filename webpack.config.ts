import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { fileURLToPath } from 'url';

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface WebpackConfig extends WebpackConfiguration {
  devServer?: DevServerConfiguration;
}

const config: WebpackConfig = {
  entry: './src/Main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-react'] },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/[name][ext][query]' },
      },
      {
        test: /\.svg$/i,
        oneOf: [
          { issuer: /\.[jt]sx?$/, use: ['@svgr/webpack'] },
          {
            type: 'asset/resource',
            generator: { filename: 'assets/[name][ext][query]' },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  plugins: [
  new HtmlWebpackPlugin({ template: './src/index.html', inject: false }),
  new CopyWebpackPlugin({
    patterns: [
      { 
        from: 'public', 
        to: '', 
        globOptions: {
          ignore: ['index.html'], // ignore your index.html
        },
      },
    ],
  }),
],
  devServer: {
  static: [
      { directory: path.join(__dirname, 'dist') },
      { directory: path.join(__dirname, 'public') }, // serve public/ directly
    ],
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
};

export default config;
