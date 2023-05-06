const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const semi = require('@douyinfe/semi-next').default({
    /* the extension options */
});

/** @type {import('next').NextConfig} */
const nextConfig = semi({
    transpilePackages: ['@douyinfe/semi-ui', '@douyinfe/semi-icons', '@douyinfe/semi-illustrations'],
    webpack(config) {
        config.plugins.push(
            new MiniCssExtractPlugin(),
        );
        return config;
    },
});

module.exports = nextConfig
