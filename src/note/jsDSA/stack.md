---
title: 栈
date: 2021-06-24 11:00:00
categories:
 - 读书
tags:
 - javascript数据结构与算法
---

栈是一种遵从后进先出（LIFO）原则的有序集合。新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

```js
class Stack{
    constructor(){
        this.item=[]
    }
    push(ele){
        this.items.push(ele)
    }
    pop(){
        return this.items.pop()
    }
    peek(){// 栈顶
        return this.items[this.items.length-1]
    }
    isEmpty(){
        return this.items.length==0
    }
    clear(){
        this.items.length=0
    }
    size(){
        return this.items.length
    }
}
```