const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// "build": "cross-env NODE_ENV=production webpack"
const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === "production";
module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/index.js",
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
    // 代理
    proxy: {
      '/api': ''
    }
  },

  module: {
    rules: [
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      // {
      //   test: /\.png$/,
      //   type: "asset", // 值🈶asset/line  asset 会输出文件和base64 之间自动选择
      //   parser: {
      //     // 如果图片大小小于某个阙值，则base64,大于某个阙值输出单独文件；
      //     dataUrlCondition: {
      //       maxSize: 1024 * 32,
      //     },
      //   },
      // },
      {
        test: /\.png$/,
        oneOf: [
          {
            // resourceQuery 是一个用于匹配请求资源的的URL 中查询字符串中,第一个不匹配下一个对象进行匹配
            resourceQuery: /sizes/,
            use: [
              {
                loader: "responsive-loader", // 这样配 所有的图片都会是响应式，但场景是指定某张图片需要响应式
                options: {
                  // sizes: [300,600, 1024], // 将图片切成三个规格 这里是写法1,这里写了后，在图片路径里就不用再写切片尺寸了
                  adapter: require("responsive-loader/sharp"),
                },
              },
            ],
          },
          {
            type: 'asset/resource'
          },
        ],
        // use: [
        //   {
        //     loader: 'responsive-loader', // 这样配 所有的图片都会是响应式，但场景是指定某张图片需要响应式
        //     options: {
        //       sizes: [300,600, 1024], // 将图片切成三个规格 这里是写法1,这里写了后，在图片路径里就不用再写切片尺寸了
        //       adapter: require('responsive-loader/sharp')
        //     }
        //   }
        // ]
      },
      // {
      //   test: /\.(jpe?g|png|svg|gif)$/i,
      //   options: {
      //     // 是否禁用图片优化和压缩
      //     disable: !isProduction, // 如果是生成环境不需要压缩
      //     mozipeg: {
      //       Progressive:true, // 是否开启渐进式JPEG，可以有效提升JPEG图片的加载速度
      //       quality: 65 // 压缩JPEG 图片的质量，取之范围为0到100， 值越大质量越好但文件越大
      //     },
      //     optipng: {
      //       enabled:true // 是否开启png 图片的优化，可以提升png加载速度
      //     },
      //     pnpquant: {
      //       // 压缩png图片的质量范围，取值范围1-1， 值越大质量越好，但文件越大
      //       // 第一个值表示压缩质量的下限，第二个值表示压缩的上限
      //       quality: [0.65, 0.9],
      //       speed: 4 // 压缩PNG的速度，取值范围1-10， 值越大速度越快但质量越低
      //     },
      //     svgo: {
      //       plugin: [ // 压缩svg的插件列表，这里包含removeViewBox，和cleanupIDs两个插件
      //         { // 用于删除SVG种的viewBox属性
      //           // viewBox 属性是用来指定svg视口范围，它的值是一个矩形框的坐标和宽高
      //           removeViewBox: false
      //         },
      //         {
      //           // 用于删除svg中 的无用的ID属性
      //           cleanupIDs: true

      //         }

      //       ]
      //     },
      //     gifsicle: {
      //       interlaced: true, // 是否开启gif 图片的隔行扫描，可以有效提升GIF图片和加载速度

      //     },
      //     webp: {

      //     },
      //   }
      // },
      {
        test: /\.ts$/,
        //  use: [
        //   'ts-loader' // 缺点：加载慢
        //  ]
        use: [
          // 推荐实践方式， 预设
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript", // 复用，提高性能
              ],
              // 注意 预设和插件可以一起使用， 预设就是麦当劳套餐，插件就是某一件食品，不够吃就单独点餐
              // 单独设置插件
              plugins: [
                // 装饰器的插件就需要单独在这里配置
              ],
            },
          },
        ],
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
    new EslintPlugin({
      extensions: [".js", ".ts"], // 生效的文件
    }),
    new CleanWebpackPlugin()
  ],
};

/**
 * 预设，插件集， 使用ES6 特性时。
 * 1: 比如肩头函数，要把它从 ES6 转换ES5 ，需要编写对应的babel插件
 * 2、 为了方便，我们可以把插件进行打包， 称为一个预设preset
 */
