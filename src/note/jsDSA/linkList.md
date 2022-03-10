---
title: 链表
date: 2021-06-24 15:00:33
categories:
 - 读书
tags:
 - javascript数据结构与算法
 - 链表
---

链表存储有序的元素集合，但不同于数组，链表中的每个元素都由一个存储元素本身的节点和一个指向下一个元素的引用组成。

```
head -> node {
                value,
                next-> node{
                            value,
                            next -> ...
                            }
            }
```

链表里添加或删除元素不需要移动其他元素，但是查找元素要从头开始。

### 链表

定义一个链表

```js
// 节点
class Node{
    constructor(element){
        this.element=element
        this.next=undefined
    }
}

class LinkedList{
    constructor(){
        this.count=0//记录元素数量
        this.head;//第一个元素
    }
}
```

实现一些常用方法

### push(element) 向链表尾部添加元素
```js
    push(element){
        const node=new Node(element)
        let current
        if(this.head){// 处理不会空的情况
            current=this.head
            // 循环找最后一个元素
            while(current.next){
                current=current.next
            }
            // current没有next循环结束，此时current就是最有一个元素
            current.next=node
        }else{
            this.head=node
        }
        this.count++
    }
```
### getElementAt(index) 获取指定位置的元素

```js
    getElementAt(index){
        if(index>=0&&index<=this.count){// 链表大小范围
            let node=this.head
            for(let i=0;i<index;i++){
                // 赋值的是next，所以不需要循环到index
                node=node.next
            }
            return node
        }
    }
```
### indexOf(element) 返回元素索引，没有返回-1
```js
    indexOf(element){
        let current=this.head;
        for(let i=0;i<this.count;i++){
            if(current.element===element){
                return i
            }else{
                current=current.next
            }
        }
    }
```
### removeAt(index) 删除指定位置元素
```js
    removeAt(index){
        if(index>=0&&index<this.count){
            let current=this.head
            if(index==0){// 如果删除第一个元素，head指向下一个
                this.head=current.next
            }else{
                let previous //储存删除元素的前一个yuans
                for(var i=0;i<index;i++){//少循环一次，找到的是要删除元素的上一个
                    previous=current
                    current=curernt.next // 循环结束时为要删除的元素
                }
                // 接下来把上一个元素的next指向下一个元素，要删除的元素自然而然就没了
                previous.next=current.next
            }
            this.count--
            return current.element
        }
    }
```
### remove(element) 删除元素

有了上面的，这里直接调用内部方法即可。

```js
    remove(element){
        this.removeAt(this.indexOf(element))
    }
```
### insert(element,index) 向指定位置添加元素
```js
    insert(element,index){
        if(index>=0&&index<this.count){
            const node = new Node(element)
            let current=this.head
            if(index==0){//在头部插入
                node.next=current
                this.head=node
            }else{
                const previous=this.getElementAt(index-1)//拿到前一位
                current=previous.next //当前位置替换
                previous.next=node 
                node.next=current
            }
            this.count++
        }
    }
```

### size() 获取元素个数

```js
    size(){
        return this.count
    }
```


