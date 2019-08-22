const proxy = require('http-proxy-middleware')


module.exports = function(app){   
    app.use(
        proxy(
            '/xiaoshi/api',
            {
                /* 
                    如果这里是/xiaobu/api
                    当你的axios请求路径是/xiaobu/api/goods/swiper
                    会自动转换成http://localhost:8888/xiaobu/api/goods/swiper
                    再把/xiaobu/api改成空
                    最后的结果就是http://localhost:8888/goods/swiper
                */ 
                target: 'http://47.94.224.74:8888',
                changeOrigin: true,
                pathRewrite: {
                    '^/xiaoshi/api': ''
                }
            }              
        )
    )
    app.use(
        proxy(
            '/item/api',
            {
                target: 'https://m.yohobuy.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/item/api': ''
                }
            }              
        )
    ) 
}