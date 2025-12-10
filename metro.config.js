const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuração ESSENCIAL para TurboModules
config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    // Forçar resolução correta dos módulos do React Native
    'react-native': require.resolve('react-native'),
    'react': require.resolve('react'),
  },
  resolveRequest: (context, moduleName, platform) => {
    // Resolver problemas com PlatformConstants
    if (moduleName === 'PlatformConstants') {
      return {
        filePath: require.resolve('react-native/Libraries/Utilities/PlatformConstants'),
        type: 'sourceFile',
      };
    }
    return context.resolveRequest(context, moduleName, platform);
  },
  sourceExts: [...config.resolver.sourceExts, 'cjs', 'mjs'],
};

config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
  // babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

module.exports = config;