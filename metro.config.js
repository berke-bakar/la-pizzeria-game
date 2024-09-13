// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
};

config.resolver.sourceExts.push('js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs', 'svg');
config.resolver.assetExts = [...config.resolver.assetExts.filter((ext) => ext !== 'svg'), 'glb', 'gltf', 'png', 'jpg', 'ttf'];

module.exports = config;
