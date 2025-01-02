# webpack-demo


```shell
npm init -y
```

安装依赖
```shell
npm i webpack webpack-cli webpack-dev-server 
style-loader css-loader  less less-loader postcss postcss-loader 
html-webpack-plugin cross-env mini-css-extract-plugin autoprefixer @babel/core 
@babel/preset-env bable-loader typescript ts-loader @babel/preset-typescript eslint eslint-webpack-plugin eslint-confing-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node @typescript-eslint/eslint-plugin --save
```

问答
![alt text](image.png)
![alt text](image-1.png)


图片格式
png、jpeg、bmp、svg，text， 在webpack4 需要引入 filter-loader
在webpack5 内置了， 
asset-modules 用于指定加载器的类型，也就是告诉webpack 该如何处理不同的类型文件
asset-modules
在默认情况下，使用asset/resource 类型的加载器会生成带有[hash][ext][query]后缀的文件名，如果需要自定义文件名，
可以通过设置output.assetModuleFilename属性设置
module.relues.parser.dataUrlCondition y用于限制文件大小的阙值

Asset Modules 类型通过添加4种新的模块类型替换了所有这些加载起
asset/resource 生成单独的文件并导出URl
asset/inline 导出图片的数据URL base64 内联，不需要请求，会加大文件体积
asset/source 导出图片的数据代码
asset 会输出文件和base64之间自动选择，可以设置文件大小限制来实现；单独文件会增加请求，不会增加文件体积，

压缩图片
image-webpack-loader 可以在webpack 打包过程中对图片进行优化和压缩，从而减少图片文件的大小，提高页面加载速度和响应速度
它的底层依赖于 imagemin 和 一系列的图像优化工具， 包括mozipeg、optipng、pnpquant、svgo、gifsicle和webp 等可以自动选择最优的优化工具对图片进行处理
optipng： 用于压缩PNG图片工具、
pnpquant： 同样用于压缩PNG图片，可以设置图片质量和压缩速度、
svgo： 用于压缩SVG图片，包含多个插件、
gifsicle： 用于压缩GIF图片
webp：用于压缩JPG/PNG 图片压缩并转换为webp图片格式
```shell
pnpm i image-webpack-loader --save
```
# 响应式图片
响应式图片是指能够根据 设备屏幕大小 和 分辨率 等因素动态调整显示大小和清晰度的图片
在不同设备上显示同一张图片时，响应式图片可以自动选择最优的图片版本，保证图片显示效果 一致性 和 优化网站性能
**responsive-loader** 是一个webpack的loader，用于实现图片响应式的功能，他可以根据设备屏幕大小和像素密度 等因素自动调整图片大小和清晰度，提高网站的用户体验和性能；

sizes: 指定不同尺寸的图片大小，
adapter： 指定图片处理库， 例如 sharp库 高性能图片处理库，自动调整图片大小和清晰度

image 属性里
srcset和size是HTML 中img 标签的两个属性，用于实现响应式图片的功能，可以根据设备屏幕大小，像素密度等因素自动选择最合适的图片大小，从而提高网站的用户体验和性能

srcset属性用于指定不同尺寸和清晰度的图片版本，它的值是一个以逗号分隔的图片列表；
size属性 用于加载指定图片在不同屏幕下的显示大小，

```shell
pnpm i responsive-loader sharp --save
```