// webpack.config.js
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const ElementPlus = require("unplugin-element-plus/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.export = {
    plugins: [
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        ElementPlus({
            importStyle: "less",
            useSource: true,
        }),
    ],
    // devServer: {
    //     host: "localhost",
    //     port: 8081,
    //     open: true,
    //     hotOnly: true, // 热更新
    //     // 设置代理
    //     proxy: {
    //         "^/api": {
    //             // 本地mock服务器
    //             target: "http://localhost:10808",
    //             changeOrigin: true,
    //             ws: false,
    //         },
    //         //如果项目中存在多个域名接口，可依次进行配置
    //     },
    // },
};