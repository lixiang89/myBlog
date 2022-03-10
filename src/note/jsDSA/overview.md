---
title: javascript简介
date: 2021-06-24 10:10:11
categories:
 - 读书
tags:
 - javascript数据结构与算法
---

数字与字符串比较：toNumber(字符串) 
- undfined->NaN 
- null-> 0
布尔值与任何类型：toNumber(布尔值)
对象和其他类型：  toPrimitive(对象)
- valueOf返回值为原始值，返回此值；toString返回值为原始值，返回此值。其他情况报错

> 参考
> [ecma](https://262.ecma-international.org/5.1/#sec-11.9.3) 
> [中文](https://lzw.me/pages/ecmascript/#203)
> [中文2](https://yanhaijing.com/es5/#203)