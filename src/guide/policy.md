---
title: 策略模式
date: 2023-08-11 18:18:18
categories:
 - 前端
tags:
 - 设计模式
---

策略模式应该是前端使用最多的一种设计模式了，常用于处理多个if、else判断。如下代码：

```js
const handler=function(type){
    if(type==='a'){
        return 1
    }else if(type==='b'){
        return 2
    }else if(type==='c'){
        return 3
    }
}
```

以上代码多个if、else判断，实际业务中可能有更多。我们可以抽取if判断条件与代码块之中的通性，达到即使将来业务增加其他条件也无需去改动handler函数的目的。一个函数做一件事嘛。

很明显上面对应关系是1对应a、2对应b、3对应c。js中我们便可以写一个对象来代替这用映射关系，修改代码如下：

```js
const typeMap={
    a:1,
    b:2,
    c:3
}
const handler=function(type){
    return typeMap[type]
}
```

当然一些复杂的处理也是可以提取的，无非就是将1、2、3换成函数而已。

```js
const typeMap={
    a(){},
    b(){},
    c(){}
}
const handler=function(type){
    return typeMap[type]()
}
```