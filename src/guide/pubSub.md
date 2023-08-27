---
title: 发布订阅模式
date: 2023-08-11 18:01:11
categories:
 - 前端
tags:
 - 设计模式
---

前端常使用的事件委托写法既是发布订阅模式，如下

```js
const fn=()=>{}
document.addEventListener('click',fn)
document.removeEventListener('click',fn)
```
自己动手实现一个
```js
const test = {
    names: {//存储事件
    // {[type]:[...fn]}
    },
    add(type, fn) {// 订阅事件
        if (!this.names[type]) this.names[type] = []
        this.names[type].push(fn)
    },
    remove(type, fn) {// 退订
        const handlers = this.names[type]
        if (handlers) {
            const i=handlers.indexOf(fn)
            if(i>-1){
                handlers.splice(i,1)
            }
        }
    },
    dispatch(type) {// 发布
        this.names[type]?.forEach((f)=>f())
    }
}

test.add('click', ()=>{
        console.log(1)
    }
)

test.add('click', ()=>{
        console.log(2)
    }
)

const fn111= ()=>{
    console.log(111)
}

test.add('input', ()=>{
        console.log(111)
    }
)


const fn222= ()=>{
    console.log(222)
}
test.add('input',fn222)

console.log(test)
test.remove('input',fn111)
test.remove('input',fn222)

test.dispatch('input')
test.dispatch('change')

```