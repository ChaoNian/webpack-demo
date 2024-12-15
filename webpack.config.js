const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintPlugin = require("eslint-webpack-plugin");
const { options } = require("less");

// "build": "cross-env NODE_ENV=production webpack"
const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === "production";
module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/index.ts",
  // entry: ['./src/index1.js','./src/index2.js']
  // entry: {
  //     main: './src/index1.js'
  // },
  // entry: {
  //     entry1: './src/index1.js',
  //     entry2: './src/index2.js'
  // }
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: 'bundle.js',
    filename: "[name].js", // name 会自动识别为entry里的对象key
    clean: true, // 在新的打包之前清除历史文件
  },

  // 加载器

  // 服务配置
  devServer: {
    host: "localhost", // 主机名
    port: 9000, // 访问端口号
    open: true, // 构建结束后自动打开浏览器项目
    compress: true, // 启动gzip 压缩
    host: true, // 启动支持模块热替换
    watchFiles: [
      // 配置监听这些文件的变化，如果这些文件变化了，可以重新编译
      "src/**/*js",
    ], // 如果不配置watchFiles就监听所有文件
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
         test: /\.ts$/,
        //  use: [
        //   'ts-loader' // 缺点：加载慢
        //  ]
        use: [ // 推荐实践方式， 预设
          {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-typescript" // 复用，提高性能
              ],
              // 注意 预设和插件可以一起使用， 预设就是麦当劳套餐，插件就是某一件食品，不够吃就单独点餐
              // 单独设置插件
              "plugins": [
                // 装饰器的插件就需要单独在这里配置
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            // es5 转换为 es6
            loader: "babel-loader",
            options: {
              //设置参数
              // 预设，插件集， @babel/preset-env检测目标环境，进行转换，也可以设置单独文件.babelrc
              presets: ["@babel/preset-env"],
              // "plugins": [
              //   ["transform-es2015-arrow-functions", {"spec": true}],
              //   // ["transform-es2015-arrow-functions", {"spec": true}] 可以多个
              // ]
            },
          },
        ],
      },
      {
        test: /\.png$/,
        type: "asset", // 值🈶asset/line
        parser: {
          // 如果图片大小小于某个阙值，则base64,大于某个阙值输出单独文件；
          dataUrlCondition: {
            maxSize: 1024,
          },
        },
      },
      {
        test: /\.css$/, // 匹配的条件，一般是一个正则，用来匹配文件的路径
        use: [
          // use指定的转换的方
          // 通过style标签动态插入样式到HTML里面
          isProduction ? MiniCssExtractPlugin.loader : "style-loader", // 配置loader, 如果是生产环境，就miniCSS，否则使用style-loader
          // 作用是把CSS代码转换为js代码
          "CSS-loader",
          "postcss-loader", // 处理前缀
        ],
      },
      {
        test: /\.less$/, // 匹配的条件，一般是一个正则，用来匹配文件的路径
        use: [
          // use指定的转换的方
          // 通过style标签动态插入样式到HTML里面
          // 'style-loader',
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          // MiniCssExtractPlugin.loader, // 配置loader
          // 作用是把CSS代码转换为js代码
          "CSS-loader",
          "postcss-loader", // 处理前缀
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 根据这个html模版 构建出新的html
    }),
    new MiniCssExtractPlugin(), // 将css文件单独生成mini.css出来,解决js文件包含css代码，是的文件太大问题的手段
    /**
     * MiniCssExtractPlugin 好处
     * 1:把CSS文件提取到单独文件中
     * 2、减少main.js文件体积
     * 3、可以让减少CSS和JS 并行加载，提高加载效率，减少加载时间
     * 4.、 可以单独维护CSS，更清晰
     */
    new  EslintPlugin({
      extensions: ['.js', '.ts'] // 生效的文件
    })
  ],
};

/**
 * 预设，插件集， 使用ES6 特性时。
 * 1: 比如肩头函数，要把它从 ES6 转换ES5 ，需要编写对应的babel插件
 * 2、 为了方便，我们可以把插件进行打包， 称为一个预设preset
 */


