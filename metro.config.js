const { getDefaultConfig } = require('@expo/metro-config');
const defaultConfig = getDefaultConfig(__dirname);  // Note: Use __dirname, not _dirname
defaultConfig.resolver.sourceExts.push('cjs'); 
module.exports = defaultConfig;
