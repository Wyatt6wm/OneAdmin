# OneAdmin - 统一管理台

## 1. 前言

作为一个有追求的 ITer，虽然现在的日常工作与程序设计没有多大关系，但我还是拥有想要写出优秀的、有用的应用的想法。我可以把生活中遇到的场景作为需求，秉持“不管黑猫白猫，一点一点拼凑起我的应用王国 WyattAppRealm。不追求十全十美，只要求够用实用好用，抓住主要矛盾，以最小的代价实现既定目标。

## 2. 简介

OneAdmin - 统一管理台，定位为 WyattAppRealm 系列应用中大一统的运营管理 PC 前端，主要通过 PC、iPad 浏览器进行访问。对于在生活中捕获到的场景需求，如果有需要做管理台，通通按模块集成到 OneAdmin 里面。这样一来，不需要每个应用都单独实现一套管理台，既方便使用，也方便集中管理。

## 3. 规范定义

### 3.1. 前后端接口规范

前后端接口交互包含两个阶段：前端请求后端、后端响应请求。对于第一阶段的前端请求后端动作，API 接口除了预先定义好的基础参数外，填入 3 个重要的参数：

- 请求方法`method`（GET/POST 等，默认是 GET）;
- 请求`url`;
- 数据对象`data`（非必须）。

对于第二阶段的后端响应请求动作，API 接口的返回除了基础参数，有 3 个重要的参数：

- 成功标志`succ`（true/false）;
- 响应信息`mesg`;
- 响应数据对象`data`。如果后端向前端返回状态码，赋值在`data.code`参数。

## 4. 开发指南

### 4.1. 图标的使用

OneAdmin 支持三类图标的使用：[ElementPlus 图标](https://element-plus.gitee.io/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88)；外部 SVG 图标；本地 SVG 图标。其中外部 SVG 图标和本地 SVG 图标都通过自定义组件`SvgIcon`进行支持，本地 SVG 图标已经存储在`src/assets/icons/svg`目录下，如需新增则需要将图标文件添加到该目录。三类图标的使用方法分别如下：

```vue
<el-icon><avatar /></el-icon>
<svg-icon icon="https://ip:port/user.svg"></svg-icon>
<svg-icon icon="user"></svg-icon>
```

### 4.2. 快捷访问 store 变量

在 store 中使用了 getters，通过在 getters 中定义访问各个模块的 state 变量的快捷方式映射，即可通过`store.getters.XXXXX`快速访问相关 state 变量。目前已经支持的 getters 列表：

- `store.getters.token`：Token 口令。
- `store.getters.profile`：个人信息。
- `store.getters.hasProfile`：true/false，是否已经存在个人信息。
- `store.getters.cssVar`：SCSS 中定义的样式参数。
- `store.getters.sidebarOpened`：菜单栏展开/收起标记。
- `store.getters.viewTagList`：页面标签列表。

## 5. 构建与部署

### 5.1. 项目构建

安装命令：

```shell
npm install --force
```

构建命令：

```shell
npm run build
```

构建完成后会在项目根目录下生成`dist`目录，这个目录及其下面的资源用来部署。

### 5.2. 项目部署

OneAdmin 应用基于 Nginx 运行。首先从 dockerhub 拉取 Nginx 镜像：

```shell
docker pull nginx:1.21.6
```

在云服务商为自己的域名申请免费 SSL 证书，下载证书文件（下载时选择服务器类型为 Nginx 即可），获得下面的 4 种文件上传到服务器的`/root/nginx/ssl_cert/`目录下：

- `域名_bundle.crt`证书文件
- `域名_bundle.pem`证书文件（可忽略该文件）
- `域名.csr`CSR 文件（提供给 CA 机构的文件，安装时可忽略该文件）
- `域名.key`私钥文件

执行命令运行 Nginx 容器，以达到以下的目的：

- 容器名叫`nginx`；
- 后台运行；
- 将容器`/etc/nginx/ssl_cert`用 rw 模式挂载到本地的`/root/nginx/ssl_cert`（SSL 证书同步）；
- 将容器`/etc/nginx/nginx.conf`用 rw 模式挂载到本地的`/root/nginx/nginx.conf`（配置文件同步）；
- 将容器`/usr/share/nginx/html`用 rw 模式挂载到本地的`/root/nginx/html`（静态网页同步）；
- 将容器`/var/log/nginx`用 rw 模式挂载到本地的`/root/nginx/log`（日志同步）；
- 映射端口：主机 80→nginx 容器 80，TCP 协议；主机 443→nginx 容器 443，TCP 协议；
- 除非手动停止容器，否则自动重启（比如重启 docker 系统服务后自动重启容器）；
- 时区设置成东 8 区（Asia/Shanghai）。

```shell
docker run --name nginx -d -v /root/nginx/ssl_cert:/etc/nginx/ssl_cert:rw -v /root/nginx/nginx.conf:/etc/nginx/nginx.conf:rw -v /root/nginx/html:/usr/share/nginx/html:rw -v /root/nginx/log:/var/log/nginx:rw -p 80:80/tcp -p 443:443/tcp --restart=unless-stopped -e TZ="Asia/Shanghai" nginx:1.21.6
```

将上一节中生成的`dist`目录拷贝到本地的`/root/nginx/html/one-admin`目录下。为 Nginx 生成配置文件`nginx.conf`并填入以下配置内容，上传到服务器``/etc/nginx/`目录下。

```shell
# 错误日志打印路径及日志级别
error_log  /var/log/nginx/error.log  notice;
# 进程ID文件路径
pid        /var/run/nginx.pid;

events {
    # 进程最大连接数
    worker_connections  1024;
}

http {
    # 访问日志打印路径
    access_log  /var/log/nginx/access.log;

    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        # 监听SSL访问端口443
        listen                     443 ssl;
        # 绑定SSL证书的域名
        server_name                admin.wyatt.run;
        # 下载的证书文件
        ssl_certificate            /etc/nginx/ssl_cert/admin.wyatt.run_bundle.crt;
        # 下载的私钥文件
        ssl_certificate_key        /etc/nginx/ssl_cert/admin.wyatt.run.key;
        # SSL会话超时时间
        ssl_session_timeout        5m;
        # SSL协议版本
        ssl_protocols              TLSv1.2 TLSv1.3;
        # SSL解密器，采用OpenSSL库理解的格式
        ssl_ciphers                ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        # 服务器cipher优先于客户端cipher
        ssl_prefer_server_ciphers  on;

        location / {
            root /usr/share/nginx/html/one-admin/dist;
            index index.html index.htm;
            try_files $uri $uri/ @router;
        }

        location @router {
            rewrite ^.*$ /index.html last;
        }
    }

    server {
        # 监听Web默认端口80
        listen  80;
        # 服务器域名
        server_name *.wyatt.run;
        # 301重定向http到https
        return 301 https://$host:$request_uri;
    }
}
```

重启 Nginx 容器即可完成部署，从客户端浏览器访问 OneAdmin：

```shell
docker restart nginx
```
