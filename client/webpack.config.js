const path = require('path');

module.exports = {
  // Mode of the build (development or production)
  mode: 'development',

  // Entry point for the application
  entry: './src/index.js', // Change this to the entry point of your app (e.g., index.tsx for TypeScript apps)

  // Output configuration
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // Resolving file extensions and modules
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],  // Add .mjs if necessary
    modules: [path.resolve(__dirname, 'src'), 'node_modules'], // Resolving from 'src' directory as well
  },

  // Module rules for handling different file types
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,  // Handles JavaScript and TypeScript files
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.mjs$/,  // Handles .mjs files (to resolve the framer-motion import issue)
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,  // Handles CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,  // Handles image files
        use: 'file-loader',
      },
    ],
  },

  // DevServer Configuration
  devServer: {
    contentBase: path.join(__dirname, 'public'),  // Pointing to the public folder for static files
    port: 3000,  // Port to run the dev server
    hot: true,  // Enable Hot Module Replacement
    watchOptions: {
      ignored: /C:\\DumpStack\.log\.tmp/  // Ignore locked files (for Windows users with EBUSY errors)
    },
  },

  // Source maps for easier debugging
  devtool: 'cheap-module-source-map',
};
