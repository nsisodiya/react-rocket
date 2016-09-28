var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var LiveReloadPlugin = require("webpack-livereload-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var webpack = require("webpack");

//new UglifyJsPlugin({ sourceMap: false })
var baseConfig = {
  entry: {
    bundle: "./src/main.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  devServer: {
    headers: {"Access-Control-Allow-Origin": "*"}
  },
  eslint: {
    //fix: true,
    failOnWarning: false,
    failOnError: false,
    emitError: true,
    configFile: ".eslintrc",
    formatter: require("eslint/lib/formatters/stylish")
  },
  plugins: [
    new webpack.DefinePlugin({
      IN_BROWSER: true
    }),
    new ExtractTextPlugin("app.css", {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {from: "src/index.html"}])
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "eslint",
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel?presets[]=es2015,presets[]=react,presets[]=stage-0,plugins[]=transform-object-rest-spread",
          "if-loader"]
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        loader: ExtractTextPlugin.extract("style",
          "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]")
      },
      {
        test: /\.css$/,
        include: [/node_modules/],
        loader: ExtractTextPlugin.extract("style", "css")
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=1000&mimetype=image/svg+xml"
      }, {
        test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=1000&mimetype=image/svg+xml"
      }, {
        test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=1000&mimetype=image/gif"
      }, {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=1000&mimetype=image/png"
      }, {
        include: /\.json$/,
        loaders: ["json-loader"]
      }
    ]
  }
};
if (process.env.NODE_ENV === "production") {
  baseConfig.cache = false;
  baseConfig.debug = false;
  baseConfig["if-loader"] = "production";
//  baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
//    compress: false,
//    sourceMap: false
//  }));
} else {
  baseConfig.plugins.push(new LiveReloadPlugin({
    port: 36000
  }));
  baseConfig["if-loader"] = "dev";
  baseConfig.devtool = "inline-source-map";
  baseConfig.debug = true;
  baseConfig.cache = true;
}
module.exports = baseConfig;
