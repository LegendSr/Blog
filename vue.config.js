module.exports = {
  productionSourceMap: false,
  parallel: false,
  devServer:{
    proxy: {
      '/api':{
          // target: 'http://192.168.1.130:7100/',
          target:'http://localhost:8085/api/v1',
          changeOrigin: true,
          ws:true,
          pathRewrite:{
            '^/api': '/'
          }
      }
    }
  }

}
// 主出入口
// 楼层
// 通道
// 店铺
