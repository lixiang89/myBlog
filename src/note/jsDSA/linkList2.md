---
title: 双向链表
date: 2021-06-29 12:00:01
categories:
 - 读书
tags:
 - javascript数据结构与算法
 - 链表
---

原节点基础上多一个记录上一节点的prev
```js
class DoublyNode extends Node{
    constructor(element,next,prev){
        super(element,next)
        this.prev=prev
    }
}

class DoublyLinkedList extends LinkedList{
    constructor(){
        this.tail //尾部
    }
    push(element){
        const node=new DoublyNode(element)
        let current=this.head
        if(current){
            while(current.next){
                // 相比单向多记录一个数据
                const t=current
                current=current.next
                current.prev=t
            }
            current.next=node
            node.prev=current
            this.tail=node
        }else{
            this.head=node
            this.tail=node
        }
        this.count++
    }
    insert(element,index){
        if(index>=0&&index<=this.count){
            const node=new DoublyNode(element)
            let current=this.head
            if(indexx==0){
                if(!current){//空链表
                    this.head=node
                    this.tail=node
                }else{
                    node.next=current
                    current.prev=node
                    this.head=node
                }
                this.count++
            }else if(index==this.count){
                tis.push(element)
            }else{
                current=this.getElementAt(index)
                let {prev,next}=current
                node.next=current
                node.prev=prev
                prev.next=node

                this.count++
            }
        }
    }
}
```