#基于React16\React-Router4\Webpack3的前后端同构项目脚手架

**适用场景：该脚手架集成了react开发常用技术栈，且针对城市FM项目做了部分定制改动，但业务代码和脚手架代码已经做了良好的隔离，普遍适用于其他项目，有需要的小伙伴可以根据自己的项目情况进行配置和文件改动**

#### Feature
本脚手架主要实现了以下功能:
- [x] webpack，包括开发环境下的热更新等功能，以及生产环境下的打包功能
- [x] 引入antd-mobile作为UI框架
- [x] babelrc配置,使用babel-plugin-env进行转码
- [x] 支持淘宝flexible移动端屏幕适配
- [x] 支持react-router4
- [x] 支持redux
- [x] 支持react-css-modules
- [x] 支持tinypng图片压缩
- [x] 支持React服务端渲染
- [x] 支持服务端请求转发，包括token校验和user-agent校验,结合charles可轻松实现在开发环境调试App和微信
- [x] 支持Mock Server
- [x] 客户端代码可在服务端复用，实现前后端同构

#### Installation 教程

1、 安装依赖包，已经解决了一些依赖包安装最新版可能出现的bug，如果还有问题，可以看相关社区的issue。
```
npm install 或者cnpm install
```

2、运行项目。
 ```nodemon
 npm start
 ```

3、将会开启8080端口.
```nodemon
http://localhost:8080
```

#### 项目结构

```text
├── client //客户端目录
|   ├── index.js //客户端入口文件
│   ├── App.js //处理App授权
│   ├── common.js //客户端通用业务
│   ├── config.js //wx-js-sdk lz-sdk配置
│   ├── babelHelpers.js //babel-helper抽离
│   ├── Actions //redux action
│   ├── Reducer //redux reducer
│   ├── Page //Page组件
│   ├── Components //公共组件React组件
│   │   ├── Bundle.js //异步加载js组件，配合bundle-loader使用
│   │   ├── RouterView.js //路由组件
│   │   ├── RouterWrapper.js //路由包裹组件，处理在页面跳转时的逻辑
│   │   ├── Logo.js //业务组件
│   │   ├── xxxDialog.js //各种弹窗组件
│   ├── assets //存放图片文件 
│   ├── styles //存放less\css
│   ├── Store //创建redux store
│   ├── untils //一些工具方法
├── config //脚手架配置文件
│   ├── build.config.js //脚手架各环境配置项
│   ├── ftp.js //上传静态资源到cdn
│   ├── info.js //网站信息配置，如title,description
│   ├── tingpng.js //使用tinypng进行图片压缩
│   ├── webpack.config.base.js //基础webpack配置文件
│   ├── webpack.config.dev.js //开发环境webpack配置文件
│   ├── webpack.config.prod.js //生产环境webpack配置文件
├── dist //打包输出目录
│   ├── client //客户端代码打包输出
│   ├── server //ssr模式服务端代码打包输出
│   ├── index.html //spa模式下的入口html
│   ├── report.html //打包情况分析
├── proxy //服务端请求代理目录
├── server //服务端目录
│   ├── middlewares //express中间件
│   │   ├── auth.js //转发客户端传来的token和user-agent实现请求认证
│   │   ├── clientRoute.js //React服务端渲染的主要实现
│   ├── utils //工具函数
│   ├── server.dev.js //开发环境server入口
│   ├── server.prod.js //生产环境server入口
├── views //供服务端渲染的视图模版,webpack打包时由HtmlWebpackplugin生成
```
#### 使用说明
1. 服务端渲染和客户渲染  
本脚手架支持纯客户端渲染(spa)和服务端渲染(ssr)两种模式，可通过config/build.config.js中的isomorphic配置项进行配置，服务端只做首屏渲染，后续的路由跳转由客户端完成，如果是服务端渲染，在dist目录会生成client和server(html在views中生成作为服务端渲染模版),如果是纯客户端渲染，会在dist中生成index.html入口文件和client目录静态资源。

2. 关于移动端适配  
使用flexible+postcss-pxtorem,这样可以让antd-moblie中的组件也跟着页面做自适应(因为antd中的组件都是以px为单位，这样无法根据设备做更好的自适应)，因为是用了pxtorem,我们只需要在postcss.config.js中配置好rem基准值(通常是设计稿宽度/10),在css代码中只需要正常按px单位编写代码即可

3. 样式需要统一放在styles目录中  
使用react-css-modules的时候发现css转换时生成的class类名中的hash部分跟react-css-modules的content配置有关，如果放在content以外的目录会出现生成的hash值不正确，所以将css相关的代码都放在styles目录中

4. Tinypng的使用  
因为tinypng每个月只可以免费调用500次api(在网页版不限次数),所以建议在项目正式打包前再进行图片压缩，而不是每次打包都调用

5. 服务端无法热更新
在开发环境server中，当我们处于ssr模式时，会require一部分client的代码，因为所有的js代码都被编译和缓存进内存了，这部分的代码是无法进行热更新的，注意区分，首屏渲染完成之后是完全交给客户端的，所以渲染完成之后我们修改客户端代码可以进行热更新，但服务端require的代码已经在跑，是不会进行热更新的，修改代码刷新页面之后重新请求服务端进行渲染就有可能造成两端渲染的页面不同步，如果要同步的话必须重启node进程(类似nodemon watch文件变动然后重启node进程)，但是这样重启的话，需要重新进行webpack打包，需要等待的时间比较长，代价比较大,所以建议开发环境下开发页面时还是使用客户端渲染的形式

6. 路由过渡动画
- 脚手架中把路由过渡动画的cls放在store中进行统一管理
- 目前脚手架设定的默认过度cls为渐入渐出，可自行修改
- 开发脚手架时尝试进行左右滑动(对应路由的前进后退)的形式来进行路由过渡，虽然浏览器提供了hashchange和popstate这两个事件供我们进行路由回退的检测，但是实践发现，当这两个事件触发时，Router的render方法已经执行，把下一个新的route渲染出来了，此时已经无法修改其过渡样式，要实现左右滑动过渡，只能在Link上面监听onClick或者在props.history.push之前修改store中的cls为前进，然后每次Router update完成之后设置cls为回退，也就是把cls默认设置为回退，需要做前进操作前修改cls为前进