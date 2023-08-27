---
title: 适配器模式
date: 2023-08-11 18:28:18
categories:
 - 前端
tags:
 - 设计模式
---

假如有这样一段逻辑用于计算物品价格。

```js
// 计算价格
const sum=function(price,count){
    return price*count
}
// 一些处理
const handler=function(fn,price,count){
    fn(price,count)
}
// 传入计算价格函数供其他地方使用
handler(sum,8,3)
```

然后某天为了促销而添加了打折商品。假设handler方法在多处使用而不能改动。那么为了兼容打折商品，我们可以写一个新的处理函数。

```js
// 处理打折产品
const discountAdapter=function(discount){
    // 原sum函数接收price和count，这里需保持一致
    return function(price,count){
        return discount*0.1*price*count
    }
}
// 设置折扣
const sum8=discountAdapter(8)

handler(sum8,5,5)
```

这样我们就可以在不改动原有handler函数的情况下去处理打折商品了。