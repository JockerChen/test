# <center> TypeScript项目部署过程梳理 </center>

## 1、文件夹相关说明

### dist:webpack打包工具生成的html、js文件路径

### src:typescript源码文件

### package.json npm相关配置脚本

### tsconfig.json typescript转换成js的相关配置文件

### webpack.config.js webpack相关的配置文件脚本

## 2、涉及到的相关包信息

### "@babel/core": "^7.14.8", //babel的核心包

### "@babel/preset-env": "^7.14.8", //babel预制环境

### "babel-loader": "^8.2.2",       //babel相关的webpack加载器

### "clean-webpack-plugin": "^4.0.0-alpha.0", //清除webpack生成dist文件缓存，每次都进行清除后直接生成

### "core-js": "^3.15.2",                     //babel对应的核心库

### "css-loader": "^6.2.0",                   //样式加载器

### "html-webpack-plugin": "^5.3.2",          //html webpack生成插件

### "less": "^4.1.1",                         //less库

### "less-loader": "^10.0.1",                 //less加载器

### "postcss": "^8.3.6",                      //针对CSS的兼容插件功能和BABEL功能类似，babel是兼容JS的，这个是兼容css的

### "postcss-loader": "^6.1.1",               //postcss加载器

### "postcss-preset-env": "^6.7.0",           //postcss预加载环境

### "style-loader": "^3.2.1",                 //样式加载器

### "ts-loader": "^9.2.3",                    //ts加载器

### "typescript": "^4.3.5",                   //TypeScript版本

### "webpack": "^5.45.1",                     //webpack

### "webpack-cli": "^4.7.2",                  //webpack脚手架

### "webpack-dev-server": "^3.11.2"           //webpack开发服务环境

*****

## 3、
