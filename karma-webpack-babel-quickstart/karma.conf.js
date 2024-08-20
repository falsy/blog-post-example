module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    webpack: {
        mode: 'development',
        module: {
            rules: [{
              test: /\.js?$/,
              loader: 'babel-loader',
              options: {
                presets: ['env']
              },
              exclude: ['/node_modules']
            }]
        }
    },
    files: [
        { pattern: 'test/*Spec.js', watched: true },
    ],
    preprocessors: {
        'test/*Spec.js': ['webpack'],
    },
    exclude: [
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
