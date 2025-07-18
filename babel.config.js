// odule.exports = {
//     presets: ['module:metro-react-native-babel-preset'],
//     plugins: [ 'react-native-reanimated/plugin'],
//   };
module.exports = function (api) {
    api.cache(true);
    return {
      presets: ["babel-preset-expo"],
      plugins: [
        "react-native-reanimated/plugin", // Required for drawer animations
        "expo-router/babel", // Required for Expo Router support
      ],
    };
  };
  