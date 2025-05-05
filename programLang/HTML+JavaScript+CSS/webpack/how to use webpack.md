# webpack记录
## 安装webpack并配置
配置文件为`webpack.config.js`，示例配置如下：
```javascript
//webpack.config.js
//npm install webpack webpack-cli -D

//解析文件路径
const path = require('path')
//打包html文件
//npm install html-webpack-plugin -D
const HtmlPlugin = require('html-webpack-plugin')
//分离css文件
//npm install mini-css-extract-plugin -D
const MiniCssPlugin = require('mini-css-extract-plugin')
//打包vue
//npm install vue   //生产用
//npm install vue-loader vue-template-compiler vue-style-loader -D
const { VuePluginLoader } = require('vue-loader')
//打包react
//npm install react react-dom  //生产用
//npm install @babel/core babel-loader @babel/preset-env @babel/preset-react -D

module.exports={
    //mode:[production|development|none]??production
    mode:'development',
    //npm install webpack-dev-server -D
    devserver:{
        //启动server时同时启动浏览器打开当前页面
        open:true,
        host:127.0.0.1,
        port:5500,
        //启动时index.html所在目录
        contentBase:path.resolve(_dirname,'dist')
    },
    entry:path.resolve(_dirname,'./src/index.js'),
    output:{
        path:path.resolve(_dirname,'dist'),
        filename:'js/bundle.js'
    }
    plugins:[
        new HtmlPlugin({
            //打包html的模板文件
            template:'./src/index.html'
        }),
        new MiniCssPlugin({filename:'css/bundle.css'}),
        new VueLoaderPlugin(),
    ],
    module:{
        rules:[
            //
            //VUE打包
            //不知道为啥放在后面会报错找不到vue的loader
            { test: /\.vue$/, loader: 'vue-loader' },
            //
            //CSS相关打包
            //npm install style-loader css-loader -D
            // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.css$/, use: [MiniCssPlugin.loader, 'css-loader'] },
            //npm install style-loader css-loader node-sass sass-loader -D
            {
                //这里的publicPath默认为webpackOptions.output，相对路径为相对于MiniCssPlugin实例化时指定的目录
                //test: /\.scss$/, use: ['style-loader', 
                //                      {loader: 'css-loader',options: { esModule: false }},
                //                       'sass-loader']
                test: /\.scss$/, use: [{ loader: MiniCssPlugin.loader, options: { publicPath: '../' } }, {
                    loader: 'css-loader',
                    options: { esModule: false }
                }, 'sass-loader'],
            },
            //npm install style-loader css-loader less less-loader -D
            //{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.less$/, use: [MiniCssPlugin.loader, 'css-loader', 'less-loader'] },
            //
            //img相关
            //npm install file-loader url-loader html-loader -D
            {
                test: /\.(jpg|png|gif)$/, loader: 'url-loader',
                options: {
                    limit: 20480,
                    name: '[name].[ext]',
                    outputPath: 'img',
                    //webpack5需要设置，否则无法索引图片
                    esModule: false
                },
                //      webpack5新特性
                //      test: /\.jpg/,
                //      type: 'asset/resource',
            },
            //处理html文件中的图片的src或url
            { test: /\.html$/, loader: 'html-loader', options: { esModule: false } },
            //处理react
            { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/ },
        ]
    }
}
```
```javascript
//.babelrc.js
module.exports={
    preset:['@babel/preset-env','@babel/preset-react']
}
```
