---
title: package.json中的depends
date: 2020-11-24
categories:
 - 前端
tags:
 - npm
---

最近几天上传了个npm包，自己`install`之后发现其所在`node_module`下的目录结构中也包含了一个`node_module`文件夹，如图：

![node_module文件夹下也有node_module](/images/packageJsonDepends/1.png)

为什么会这样呢，来试试我们常用的几个依赖

## dependencies

查询`package.json`后，发现是这样写的：

```json
"dependencies": {
    "mobx": "^4.15.5"
}
```

没错，这就是元凶。这会导致
- 如果项目中还未安装mobx，那么会在`node_module`安装所依赖的版本
- 如果项目中已安装其他版本的mobx，则会在`npm install`时，直接在自己的目录中安装指定的版本（`4.x`）

这就造成了多版本共存:

![两个版本的mobx](/images/packageJsonDepends/4.png)

> 可以先看下面的`devDependencies`，最后再来看此处

如果声明多个版本呢？

```json
"dependencies": {
    "mobx": "4.x||5.x"
}
```

> test-depend是为测试而上传的npm包，每个版本使用了不同的depends

经测：

- 先安装mobx，再安装test-depend，那么卸载test-depend时也不会卸载mobx
- 未安装mobx，安装test-depend时会自动安装mobx，卸载test-depend同时也会卸载mobx

个人还是不太喜欢。

## devDependencies

开发常用的依赖还有`devDependencies`，但在`npm install`时并不会有任何作用

```json
"devDependencies": {
    "mobx": "^4.15.7"
},
```

## peerDependencies

这个依赖项我们在平常的开发中很少会用到，但是在发布npm包时却非常有用

```json
"peerDependencies": {
    "mobx": "^4.15.7"
}
```

`peerDependencies`声明了自己开发的包的依赖，在安装包时并不会强制安装依赖，只是检查`node_module`文件夹下是否已有所依赖的包及版本是否匹配。如上所示，在安装这样一个包时，如果项目中没有安装mobx或安装的版本不对，则会给出提示：

![不匹配提示](/images/packageJsonDepends/3.png)

当然也可以指定多个版本，只要安装在指定的版本范围内即可

```json
"peerDependencies": {
    "mobx": "4.x||5.x"
}
```

## 附：depends的多种版本写法

```json
{
    "dependencies" :{ 
        "foo" : "1.0.0 - 2.9999.9999", // 指定版本范围
        "bar" : ">=1.0.2 <2.1.2", 
        "baz" : ">1.0.2 <=2.3.4", 
        "boo" : "2.0.1", // 指定版本
        "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0", 
        "asd" : "http://asdf.com/asdf.tar.gz", // 指定包地址
        "til" : "~1.2",  // 最近可用版本
        "elf" : "~1.2.3", 
        "elf" : "^1.2.3", // 兼容版本
        "two" : "2.x", // 2.1、2.2、...、2.9皆可用
        "thr" : "*",  // 任意版本
        "thr2": "", // 任意版本
        "lat" : "latest", // 当前最新
        "dyl" : "file:../dyl", // 本地地址
        "xyz" : "git+ssh://git@github.com:npm/npm.git#v1.0.27", // git 地址
        "fir" : "git+ssh://git@github.com:npm/npm#semver:^5.0",
        "wdy" : "git+https://isaacs@github.com/npm/npm.git",
        "xxy" : "git://github.com/npm/npm.git#v1.0.27",
    }
}
```
