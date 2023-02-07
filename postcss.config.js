const postcssPresetEnv = require("postcss-preset-env");
module.exports = {
  plugins: [
    require("autoprefixer")(),
    postcssPresetEnv({ stage: 0 }),
    require("postcss-pxtorem")({
      rootValue: 192,
      propList: ["*"],
    }),
  ],
};
