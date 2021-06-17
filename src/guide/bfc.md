---
title: 实现一个useObserver，mobx数据变化时反馈给react函数组件
date: 2021-05-01
categories:
 - 前端
tags:
 - mobx
 - react
publish: false
---

由于项目的种种原因，导致不能升级`mobx-react`，无法使用`useObserver`，但是又想使用函数组件，故自己撸了一个。现有空记录下。

## 响应数据变化

之前写过一篇文章介绍了mobx响应数据变化的一些内置函数，那么既然要实现当mobx数据变化时反馈给react函数组件的功能，那么就要使用这些函数，来回顾下

- autorun 无条件，只要监视函数中使用到mobx的数据便会触发，主要用于记录日志。
- when 有监视函数，返回一个布尔值，true时会触发第二个函数
- reaction 有监视函数，返回需要监视的字段，当返回的字段变化时会触发第二个函数。

通过上述描述可以确定reaction比较适合，通过自定义hook将变化的数据设置为state并返回。即可触发组件更新，来实现下：

```js
import { toJS, reaction } from "mobx"
import { useState, useEffect } from "react"

//函数接收一个监视函数，即为reaction的第一个参数。
function useObserver(observerFunc){
    //拿到初始的数据
    let state=observerFunc()
    //转换为js后保存到useState中
    const [res,setRes]=useState(toJS(state));
    //使用reaction来处理，当数据变化时设置res
    reaction(observerFunc,s=>{setRes(s)})
    return res
}
```

