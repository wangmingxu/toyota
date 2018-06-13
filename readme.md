#基于React16\React-Router4\Webpack4的前后端同构项目脚手架

**适用场景：该脚手架集成了react开发常用技术栈,且针对城市FM项目做了部分定制改动,但业务代码和脚手架代码已经做了良好的隔离,普遍适用于其他项目,有需要的小伙伴可以根据自己的项目情况进行配置和文件改动**

#### 写给Javascript使用者
本项目是Typescript版本,如果有需要使用js版本,请切换到分支master

#### Features Overview
本脚手架主要实现了以下功能:
- [x] webpack,包括开发环境下的热更新等功能,以及生产环境下的打包功能
- [x] 集成antd-mobile作为UI框架
- [x] babelrc配置,使用babel-plugin-env进行转码
- [x] 支持淘宝flexible移动端屏幕适配
- [x] 支持react-router4,支持browserRouter和HashRouter
- [x] 支持react-router过渡动画
- [x] 支持redux
- [x] 支持react-css-modules
- [x] 支持tinypng图片压缩
- [x] 支持代码分割,按需加载路由
- [x] 支持React服务端渲染
- [x] 支持服务端请求转发,包括token校验和user-agent校验,结合charles可轻松实现在开发环境调试App和微信
- [x] 支持Mock Server
- [x] 支持PWA离线应用
- [x] 客户端代码可在服务端复用,实现前后端同构

#### Installation 教程

1、 安装依赖包,已经解决了一些依赖包安装最新版可能出现的bug,如果还有问题,可以看相关社区的issue。
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
│   ├── App.js //处理App授权,获取token
│   ├── common.js //客户端通用业务
│   ├── config.js //wx-js-sdk lz-sdk配置
│   ├── babelHelpers.js //babel-helper抽离
│   ├── Actions //redux action
│   ├── Reducer //redux reducer
│   ├── HOC //高阶组件
│   ├── Page //Page组件
│   ├── Components //公共组件React组件
│   │   ├── Bundle.js //异步加载js组件,配合bundle-loader使用
│   │   ├── RouterView.js //路由组件
│   │   ├── RouterWrapper.js //路由包裹组件,处理在页面跳转时的逻辑
│   │   ├── Logo.js //业务组件
│   │   ├── xxxDialog.js //各种弹窗组件
│   ├── assets //存放图片文件 
│   ├── styles //存放less\css
│   ├── Store //创建redux store
│   ├── untils //一些工具方法
├── config //脚手架配置文件
│   ├── build.config.js //脚手架各环境配置项
│   ├── ftp.js //上传静态资源到cdn
│   ├── info.js //网站信息配置,如title,description
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
1. 服务端渲染和客户端渲染  
本脚手架支持纯客户端渲染(spa)和服务端渲染(ssr)两种模式,运行环境分为开发环境(dev)、预发环境(pre)、生产环境(prod),详细运行命令请参考[package.json](./package.json),服务端只做首屏渲染,后续的路由跳转由客户端完成,如果是服务端渲染,在dist目录会生成client和server(html在views中生成作为服务端渲染模版),如果是纯客户端渲染,会在dist中生成index.html入口文件和client目录静态资源。

2. 关于移动端适配  
使用flexible+postcss-pxtorem,这样可以让antd-moblie中的组件也跟着页面做自适应(因为antd中的组件都是以px为单位,这样无法根据设备做更好的自适应),因为是用了pxtorem,我们只需要在[postcss.config.js](./postcss.config.js)中配置好rem基准值(通常是设计稿宽度/10),在css代码中只需要正常按px单位编写代码即可

3. 样式需要统一放在styles目录中  
使用react-css-modules的时候发现css转换时生成的class类名中的hash部分跟react-css-modules的content配置有关,如果放在content以外的目录会出现生成的hash值不正确,所以将css相关的代码都放在styles目录中

4. Tinypng的使用  
因为tinypng每个月只可以免费调用500次api(在网页版不限次数),所以建议在项目正式打包前再进行图片压缩,而不是每次打包都调用

5. 服务端热更新  
当处于ssr模式时,服务端会复用一部分client的代码,因为node.js会把所有的js代码都被编译和缓存进内存了,这部分的代码是无法进行热更新的,如果修改了这部分的代码,必须重启node进程才能让服务端渲染生效,否则会出现客户端渲染和服务端渲染不同步的情况,可以采用类似nodemon wactch文件夹变动重启进程的方式,但是重启进程会销毁webpack complier实例,重新启动时又需要再重新进行webpack打包,时间开销比较大,本脚手架通过处理require.cache实现了node端的热更新,参考[server/server.dev.js](./server/server.dev.js)

6. 路由过渡动画  
react-router4基于hashchange和popstate事件实现,但是存在一个问题:浏览器的前进行为也会触发popstate事件,此时左右滑动这类路由过渡动画的切换方向就会出现问题,因此如果使用这类动画,应尽量避免使用history.forward去进行路由切换。本项目的默认使用左右滑动作为路由过渡动画,参考[client/Component/RouteWrapper.js](./client/Component/RouteWrapper.js)

7. 代码分割  
在生产环境且处于spa模式下默认启用路由按需加载功能,使用bundle-loader对client/Page目录下的js进行按需加载,如果要关闭此功能,请修改[config/build.config.js](./config/build.config.js)的codeSplit选项,因为服务端渲染模式需要同步运行js,所以无法进行按需加载。如果需要更加成熟的方案,请参考[react-loadable](https://www.npmjs.com/package/react-loadable)

8. 前后端渲染的html结构需保持一致  
React16采用ReactDOM.hydrate代替ReactDOM.render,当服务端渲染出来的html和客户端渲染出来的html不一致的时候会报`Warning: Expected server HTML to contain a matching <span> in <div>.`类似的错误，出现这种错误一般有以下原因:
- 客户端组件嵌套了高阶组件生成了其他html元素，比如ReactCSSTransitionGroup动画组件会默认生成一个span标签嵌套在组件上,这时服务端也需要增加一个span标签以保持一致(在最新的React v16.2.0中增加了React.Fragment组件,可以利用它来避免生成额外的标签)
- 客户端使用了异步加载或者页面是经过异步函数之后再显示的,比如获取授权之后,此时也会导致前后端渲染不一致,客户端应该尽量避免这种异步渲染


### 参考文档
[1] http://fex.baidu.com/blog/2015/05/nodejs-hot-swapping/  
[2] https://doc.webpack-china.org/concepts/  
[3] https://github.com/react-translate-team/react-router-CN