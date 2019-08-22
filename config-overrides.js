const {override,addWebpackAlias,useEslintRc,fixBabelImports,addDecoratorsLegacy } = require('customize-cra')
const path = require('path')

// 覆盖create-react-app的默认配置
module.exports = override(
    // 添加路径别名
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src/'),
    }),

    // 配置eslinit
    useEslintRc(),

    // 配置UI组件的按需加载
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),    

    // 添加装饰器语法 
    addDecoratorsLegacy()
)