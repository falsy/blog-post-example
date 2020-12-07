/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const extraNodeModules = {
  'external': path.resolve(__dirname + '/../external'),
};
const watchFolders = [
  path.resolve(__dirname + '/../external'),
];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        name in target 
          ? target[name] 
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  watchFolders,
};
