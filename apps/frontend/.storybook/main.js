const svgr = require("vite-plugin-svgr");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  reactOptions: {
    fastRefresh: true,
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    // Commented out due to a bug https://github.com/eirslett/storybook-builder-vite/issues/242
    // "@storybook/addon-interactions"
  ],
  framework: "@storybook/react",
  core: {
    builder: "storybook-builder-vite",
  },
  // Storybook Vite builder does NOT read vite.config.ts, instead
  // it offers this hook where we can hack the config together
  async viteFinal(config, { configType }) {
    config.plugins = [svgr(), ...config.plugins];
    return config;
  },
};
