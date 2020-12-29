---
title: mobx常用方法梳理
date: 2020-11-26
categories:
 - 前端
tags:
 - mobx
 - react
---

使用react刚好一年，一直是用的mobx进行状态管理。前一段时间在使用mobx过程中突然发现最近所使用的方式都是有一定问题的，故重新梳理其使用方式。

> 本文适用mobx 4或5

mobx主要是创建响应式数据，然后当数据变化时通过一些方式来做出相应的处理，常用的方法有：

- observable
- toJS
- computed
- action

下面我们来一一介绍

> 以上方法支持直接调用或装饰器方式，本文以装饰器来介绍。
> 
> 如若不支持装饰器，则需安装`@babel/plugin-proposal-decorators`，并在`.babelrc`中配置
> 
> ```json
>   {
>       "plugins": [ 
>           [ 
>               "@babel/plugin-proposal-decorators",
>               {"legacy": true} 
>           ] 
>       ] 
>   }
> ```

## observable

将一个对象变为可观察对象，用法比较简单：

```javascript
import { observable } from 'mobx'

class Store{

    @observable
    obj={a:1}

    @observable
    num=1

}
```

经过observable装饰过的属性即可成为响应式数据，供之后使用。

> mobx@4使用的是`Object.defineProperty`，学过vue@2的应该明白上面代码中obj.a是可以监测的。如若要监测一个未定义的属性`obj.b`，这么写是无法监测的。可以使用官方提供的`extendObservable`来追加监测属性。

## toJS

将通过observable转换过的数据转回普通的js对象。以上面代码为前提，假设它导出了`export default new Store()`，那么在使用的地方通常可以这么写：

```javascript
import { toJS } from 'mobx'
import store from './store'

const jsObj=toJS(store)

```

`jsObj`已是普通的js对象，可在其他地方使用。

## computed

根据现有可观察值生成一个新的值（类比vue的计算属性或vuex的getter）。用法：

```javascript
import { observable, computed } from 'mobx'

class Store{
    @observable n=1

    @computed get nPlus1(){
        return this.n+1
    }
}
```

以上代码中的`nPlus1`在`n`变化时会重新计算，保持始终比`n`大1。那么怎么来改变`n`呢？那就要有请`action`了。

## action

用来修改可观察数据，仅限同步。（是否想到了vuex的mutation）

```javascript
import { observable, action } from 'mobx'

class Store{
    @observable order=1

    @action setOrder(val){
        this.order=val
    }
}
```

不建议直接更改`order`的值，在需要的地方通过调用`setOrder`来修改。

> 可以通过开启严格模式来禁止直接修改。`mobx.configure({enforceActions:true})`

## 异步修改状态

那么异步呢？实际开发中需要通过接口获取值来修改页面状态可是家常便饭。可通过以下几种方式来进行异步状态修改：

### 在需要修改状态的地方调用已有`action`

```javascript
import { observable, action } from 'mobx'

class Store{
    @observable order=1
    @observable order2=1

    @action setOrder(val){
        this.order=val
    }

    @action setOrder2(val){
        this.order2=val
    }

    async af(){
        const {no,no2}=await asyncFunc()
        this.setOrder(no)
        this.setOrder2(no2)
    }
}
```

上栗使用`async function`，`promise`在需要修改状态的地方调用已有`action`即可。

> 上面在`await`之前没有修改状态的话，是无需使用`action`包装的。之前一直有写，算是理解不到位了。

至此，已经可以很好的使用mobx了。使用react的话，配合mobx-react便可解决大部分问题。如果想要了解更多的话，继续往下看吧。

### runInAction

`runInAction`可以避免我们去定义很多的action来修改数据。数据的修改可以放心的用之包裹起来，修改上栗：

```javascript
import { observable, runInAction } from 'mobx'

class Store{
    @observable order=1
    @observable order2=1

    async af(){
        const {no,no2}=await asyncFunc()
        runInAction(()=>{
            this.order=no
            this.order2=no2
        })
    }
}
```

可以看到代码简洁了许多。

### flow

flow接收一个generator，代码也非常简洁，同时也更好阅读，官方推荐。来看下写法，修改上面代码：

```javascript
import { observable, flow } from 'mobx'

class Store{
    @observable order=1
    @observable order2=1

    doSth=flow(function * (){
        const {no,no2}=yeild asyncFunc()
        this.order=no
        this.order2=no2
    })
}
```

在需要的地方调用doSth即可

## 响应数据变化

到此为止已经可以定义和修改数据了，但是否少了些什么。数据变化后我们总要处理点什么吧，比如更新视图（没错，watch没跑了）。那就有请下面几位小伙伴啦。

### autorun

监测传入函数参数中用到的可观察数据：

```javascript
import { observable, action, autorun } from 'mobx'

class Store{
    @observable order=1
}

const store=new Store()

autorun(() => console.log(store.order));
```

上面代码当order变化时，便会触发传入autorun的函数，打印出新的order。因为autorun的函数入参中用到了order（store.order）

> 想要深入了解mobx会对哪些数据做出响应，可以参考：[MobX 会对什么作出反应?](https://cn.mobx.js.org/best/react.html)

### when

有条件的监测，接收两个参数均为函数，第一个函数返回true时便会执行第二个函数

`when(()=>someCondition,()=>{ /**doSth*/ })`

### reaction

可以自定义需要监测哪些字段，同样接受两个参数，第一个参数返回需要监测的字段，当其变化时便会执行第二个函数

```javascript
import { observable, reaction } from 'mobx'

class Store{
    @observable order=1
    @observable order2=2
}

const store=new Store()

reaction(()=>store.order,order => console.log(order));
```

上栗中只有order变化时才会打印，而order2则不被监测。在某些地方使用也很方便，比如将分页数据的页码作为第一个参数的返回值，从而在第二个函数中做翻页请求（别瞅hook）。

> 历史原因导致项目无法升级支持hook的mobx-react。为了拥抱hook，前段时间写了个小扩展，就是用的reaction。
> 可以在mobx数据变化时更新hook组件。有兴趣的可以看下：
> 
> [mobx-react-hook](https://github.com/lixiang89/mobx-react-hook)。

另外，这几个响应函数

- 会返回一个取消监测的函数`const disposer = autorun(()=>{})`，调用`disposer()`之后便可取消监测。可在组件销毁时使用。
- 比本文多一个入参，可配置响应函数的行为，位置在最后。

> 更多内容参见[mobx文档](https://cn.mobx.js.org/refguide/api.html)