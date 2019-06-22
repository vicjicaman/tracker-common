const pkgjson = require("./package.json");
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');

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
  entry['web'] = __dirname + '/src/index.jsx';
  entry = {
    ...entry
  };


  /****************************************************************************/
  let plugins = [
    new webpack.IgnorePlugin(/css$/),
    /*new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(_ENV),
        "BUILD_TARGET": JSON.stringify(_TARGET)
      }
    })*/
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
      alias: {
        Actions: path.resolve(__dirname, 'src/comps/actions'),
        Queries: path.resolve(__dirname, 'src/comps/queries'),
        Routes: path.resolve(__dirname, 'src/comps/routes'),
        UI: path.resolve(__dirname, 'src/comps/ui'),
        PKG: path.resolve(__dirname, 'src/pkg'),
        Root: path.resolve(__dirname, 'src/root'),
        Utils: path.resolve(__dirname, 'src/utils')
      },
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules'
      ],
      extensions: ['.js', '.jsx', '.json']
    },
    devtool: (__DEV__) ? 'cheap-module-source-map' : false,
    externals
  };
}
