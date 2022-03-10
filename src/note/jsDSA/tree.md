---
title: 树
date: 2021-06-30 10:08:11
categories:
 - 读书
tags:
 - javascript数据结构与算法
---
树是一种分层数据抽象模型，现实生活中常见的例子有：家谱，组织架构图。
根节点：位于顶部，没有父节点
内部节点：至少有一个子节点
外部节点：没有子节点
深度：节点到根节点的父节点数
键：节点的别称
边：指针引用

二叉树：节点最多只能有两个子节点

二叉搜索树：只允许在左侧节点存储比父节点小的值，右侧节点存储比父节点大的值。

        18
15              20

```js
class Node{
    constructor(key){
        this.key=key
        this.left//左侧子节点
        this.right//右侧子节点
    }
}

class BinarySearchTree{
    constructor(){
        this.root//根节点
    }
    toString(){
        const n=this.root

        function xh(node,str){
            while(node){
                str+='\r'
                const {left,right}=node
                xh(left)
                xh(right)
            }
        }

        xh(n,s)
    }

    insertNode(node,key){//插入非根节点的新节点
        if(key<node.key){
            if(!node.left){// 没有左侧子节点，直接赋值
                node.left=new Node(key)
            }else{// 有，继续调用
                this.insertNode(node.left,key)
            }
        }else{
            if(!node.right){
                node.right=new Node(key)
            }else{// 有，继续调用
                this.insertNode(node.right,key)
            }
        }
    }

    insert(key){// 插入一个新键
        if(!this.root){//空树
            this.root=new Node(key)
        }else{
            this.insertNode(this.root,key)
        }
    }

    // 中序遍历：以上行顺序访问bst所有节点的遍历方式，也就是从最小到最大的顺序访问所有节点
    // 应用：对树排序

    inOrderTraverseNode(node,callback){
        if(node){
            this.inOrderTraverseNode(node.left,callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right,callback)
        }
    }

    inOrderTraverse(callback){
        this.inOrderTraverseNode(this.root,callback)
    }

    preOrderTraverseNode(node,callback){
        if(node){
            callback(node.key)
            this.preOrderTraverseNode(node.left,callback)
            this.preOrderTraverseNode(node.right,callback)
        }
    }
    preOrderTraverse(callback){
        this.preOrderTraverseNode(this.root,callback)
    }

    postOrderTraverseNode(node,callback){
        if(node){
            this.postOrderTraverseNode(node.left,callback)
            this.postOrderTraverseNode(node.right,callback)
            callback(node.key)
        }
    }
    postOrderTraverse(callback){
        this.postOrderTraverseNode(this.root,callback)
    }

    minNode(node){
        let min=node
        while(min&&min.left){//最小值在左下角
            min=min.left
        }
        return min
    }
    min(){
        return this.minNode(this.root)
    }

    maxNode(node){
        let max=node
        while(max&&max.right){
            max=max.right
        }
        return max
    }
    max(){
        return this.maxNode(this.root)
    }

    searchNode(node,key){
        if(!node) return false
        if(node.key==key){
            return true
        }else if(key<node.key){
            return this.searchNode(node.left,key)
        }else{
            return this.searchNode(node.right,key)
        }
    }
    search(key){
        return this.searchNode(this.root,key)
    }
}
```