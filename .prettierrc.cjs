const sapphirePrettierConfig = require("@sapphire/prettier-config");

module.exports = {
    ...sapphirePrettierConfig,
    tabWidth: 4,
    useTabs: false,
    singleQuote: false,
    overrides: [
        ...sapphirePrettierConfig.overrides,
        {
            files: ["*.md"],
            options: {
                printWidth: 120,
                proseWrap: "always"
            }
        }
    ]
};
