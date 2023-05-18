# OneAdmin - 统一管理台

## 1. 前言：有追求的 ITer

作为一个有追求的 ITer，虽然现在的日常工作与程序设计没有多大关系，但我还是拥有想要写出优秀的、有用的应用的想法。我可以把生活中遇到的场景作为需求，秉持“不管黑猫白猫，一点一点拼凑起我的应用王国 WyattAppRealm。不追求十全十美，只要求够用实用好用，抓住主要矛盾，以最小的代价实现既定目标。

## 2. 简介：运营管理前台的大杂烩

OneAdmin - 统一管理台，定位为 WyattAppRealm 系列应用中大一统的运营管理 PC 前端，主要通过 PC、iPad 浏览器进行访问。对于在生活中捕获到的场景需求，如果有需要做管理台，通通按模块集成到 OneAdmin 里面。这样一来，不需要每个应用都单独实现一套管理台，既方便使用，也方便集中管理。

## 3. 规范定义：无规矩不成方圆

### 3.1. 前后端接口规范

前后端接口交互包含两个阶段：前端请求后端、后端响应请求。对于第一阶段的前端请求后端动作，API 接口除了预先定义好的基础参数外，填入 3 个重要的参数：请求方法`method`（GET/POST 等，默认是 GET）、请求`url`、数据对象`data`（非必须）。对于第二阶段的后端响应请求动作，API 接口的返回除了基础参数，有 3 个重要的参数：成功标志`succ`（true/false）、响应信息`mesg`、响应数据对象`data`。如果后端向前端返回状态码，赋值在`data.code`参数。

## 4. 开发指南

### 4.1. 图标的使用

通过自定义的图标组件，支持三类图标：[ElementPlus 图标](https://element-plus.gitee.io/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88)；外部 SVG 图标；本地 SVG 图标。其中本地 SVG 图标已经存储在`src/assets/icons/svg`目录下，如需新增则添加到该目录。三类图标的使用方法分别如下：

```vue
<el-icon><avatar /></el-icon>
<svg-icon icon="https://ip:port/user.svg"></svg-icon>
<svg-icon icon="user"></svg-icon>
```

### 4.2. 快捷访问 store 变量

在 store 中使用了 getters，通过在 getters 中定义访问各个模块的 state 变量的快捷方式映射，即可通过`store.getters.XXXXX`快速访问相关 state 变量。
