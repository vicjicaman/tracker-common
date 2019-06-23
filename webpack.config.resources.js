const pkgjson = require("./package.json");
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');

const generateExternals = (pkgs) => {

  let peers = _.keys(pkgjson.peerDependencies);

  let genpkg = {};
  for (var i = 0; i < peers.length; i++) {
    const val = peers[i];

    genpkg[val] = {
      root: val,
      commonjs2: val,
      commonjs: val,
      amd: val,
      umd: val,
      ...pkgs[val]
    };

  }

  return genpkg;
}






module.exports = (env = {}) => {

  const _TARGET = "web";
  const __ANALYZE__ = env.analyze;
  const __DEV__ = env.development;
  const __PROD__ = env.production || __ANALYZE__;

  if (__PROD__ === __DEV__) {
    throw new Error("Production or development configuration must be selected");
  }

  let _ENV = null;
  if (__PROD__) {
    _ENV = 'production';
  }

  if (__DEV__) {
    _ENV = 'development';
  }

  /****************************************************************************/
  let entry = {};
  entry['resources'] = __dirname + '/res/index.jsx';
  entry = {
    ...entry
  };


  /****************************************************************************/
  let plugins = [
    new ManifestPlugin(),
    new ExtractTextWebpackPlugin('style.css')
  ];

  if (__PROD__) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  if (__DEV__) {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.NoEmitOnErrorsPlugin());
  }

  if (__ANALYZE__) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  /***************************************************************************/
  let rules = [{
    test: /\.jsx$/,
    loader: 'babel-loader',
    include: [path.resolve(__dirname, 'src')]
  }];

  rules.push({
    test: /\.(css)$/,
    loaders: ExtractTextWebpackPlugin.extract({
      fallback: 'style-loader', // in case the ExtractTextPlugin is disabled, inject CSS to <HEAD>
      use: [{
          loader: 'css-loader', // translates CSS into CommonJS modules
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader', // Run post css actions
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          }
        }
      ]
    })
  });

  rules.push({
    test: /\.(scss)$/,
    loaders: ExtractTextWebpackPlugin.extract({
      fallback: 'style-loader', // in case the ExtractTextPlugin is disabled, inject CSS to <HEAD>
      use: [{
          loader: 'css-loader', // translates CSS into CommonJS modules
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader', // Run post css actions
          options: {
            sourceMap: true,
            plugins: function() { // post css plugins, can be exported to postcss.config.js
              return [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')
              ];
            }
          }
        },
        {
          loader: 'sass-loader', // compiles SASS to CSS
          options: {
            sourceMap: true
          }
        }
      ]
    })
  });
  rules.push({
    test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    loader: 'file-loader?name=fonts/[name].[ext]'
  });

  /***************************************************************************/
  let node = {};

  /***************************************************************************/
  let externals = generateExternals({
    react: {
      root: 'React'
    }
  });

  return {
    target: _TARGET,
    entry,
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      libraryTarget: 'umd'
    },
    module: {
      rules
    },
    plugins,
    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules'
      ],
      extensions: ['.js', '.jsx', '.json']
    },
    devtool: (__DEV__) ? 'cheap-module-source-map' : false,
    externals,
    node
  };
}
