// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs');
config.resolver.assetExts.push('glb', 'gltf', 'png', 'jpg', 'ttf');

module.exports = config;
