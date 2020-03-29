const rewireAliases = require("react-app-rewire-aliases");
const { paths } = require("react-app-rewired");
const path = require("path");

/* config-overrides.js */
module.exports = function override(config, env) {
  // eslint-disable-next-line no-param-reassign
  config = rewireAliases.aliasesOptions({
    "-": path.resolve(__dirname, `${paths.appSrc}/`),
    public: path.resolve(__dirname, `public/`),
  })(config, env);
  return config;
};
