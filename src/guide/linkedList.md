---
title: 链表
date: 2021-07-08
categories:
 - 数据结构
tags:
 - 链表
publish: false
---



链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。下图展示了一个链表的结构。

![链表结构](@images/linkedList/01.png)

链表中添加或删除元素不需要移动其他元素，但是查找元素要从头开始。既然知道了结构，那么就来实现一个链表吧。

首先，定义一下节点：

```js
class Node{
    constructor(element,next){
        this.element=element//元素
        this.next=next//指向下一个元素
    }
}
```

有了节点之后呢，就需要将他们串起来组成一个链表了

```js
class LinkedList {
    constructor() {
        this.count = 0; // 记录链表长度
        this.head = undefined; // 链表头部
    }
}
```