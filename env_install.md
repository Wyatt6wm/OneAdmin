# 安装 vue-cli 脚手架

版本：^4.5.13

```shell
npm config -g set registry https://registry.npm.taobao.org
npm config get registry
npm i -g @vue/cli@4.5.13
vue -V
```

# 创建 vue 项目

执行 create 命令：

```shell
vue create one-admin
```

项目初始化设置：

```shell
? Please pick a preset:
  Default ([Vue 2] babel, eslint)
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)
> Manually select features	// 手动选择预设配置

? Check the features needed for your project:
 (*) Choose Vue version
 (*) Babel	// 使用babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router	// 添加vue-router
 (*) Vuex	// 添加vues
>(*) CSS Pre-processors		// 使用CSS预处理器
 (*) Linter / Formatter		// 使用代码格式化工具
 ( ) Unit Testing
 ( ) E2E Testing

? Choose a version of Vue.js that you want to start the project with
  2.x
> 3.x

? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) y	// 路由使用history模式

? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use
arrow keys)
> Sass/SCSS (with dart-sass)	// 选择SCSS预处理器
  Sass/SCSS (with node-sass)
  Less
  Stylus

? Pick a linter / formatter config:
  ESLint with error prevention only
  ESLint + Airbnb config
> ESLint + Standard config	// 使用ESLint标准代码格式化方案
  ESLint + Prettier

? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection,
 and <enter> to proceed)
>(*) Lint on save		// 保存代码时自动格式化
 ( ) Lint and fix on commit (requires Git)

? Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
> In dedicated config files	// 单独的配置文件
  In package.json

? Save this as a preset for future projects? (y/N) n	// 不存此预设配置
```

# 升级 vue、vuex 和 vue-router

vue 版本：^3.2.8

vue-router 版本：^4.0.11

vuex 版本：^4.0.2

```shell
npm i --save vue@3.2.8 vue-router@4.0.11 vuex@4.0.2
```

# 安装 element-plus 前端 UI 框架

版本：^1.0.2-beta.28

执行 add 命令：

```shell
vue add element-plus
```

安装配置：

```shell
? How do you want to import Element Plus? (Use arrow keys)
> Fully import	// 全局导入
  Import on demand

? Do you want to overwrite the SCSS variables of Element Plus? (y/N) n	// 不覆盖ElementPlus的SCSS变量

? Choose the locale you want to load, the default locale is English (en)
  zh-tw
> zh-cn	// 简体中文
  en
  af-za
  ar
  bg
  ca
(Move up and down to reveal more choices)
```

# 升级 element-plus

版本：^2.0.4

```shell
npm i --save element-plus@2.0.4
```

# 安装 element-plus-icons-vue

版本：^2.1.0

```shell
npm i --save @element-plus/icons-vue
```

# 安装 svg-sprite-loader

版本：^6.0.9

```shell
npm i --save-dev svg-sprite-loader@6.0.9
```

# 安装 md5

版本：^2.3.0

```shell
npm i --save md5
```

# 安装 axios

版本：^1.3.4

```shell
npm i --save axios
```

# 安装 mockjs

版本：^1.1.0

```shell
npm i --save mockjs@1.1.0
```
