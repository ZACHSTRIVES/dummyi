const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const semi = require('@douyinfe/semi-next').default({
    /* the extension options */
});

/** @type {import('next').NextConfig} */
const nextConfig = semi({
    i18n: {
        locales: ['en', 'zh-CN', 'ja-JP'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    transpilePackages: ['@douyinfe/semi-ui', '@douyinfe/semi-icons', '@douyinfe/semi-illustrations'],
    webpack(config) {
        config.plugins.push(
            new MiniCssExtractPlugin(),
        );
        return config;
    },
});

module.exports = nextConfig
