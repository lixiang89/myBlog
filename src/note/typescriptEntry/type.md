---
title: 类型
date: 2021-04-16 14:26:26
categories:
 - 读书
tags:
 - typescript入门与实战
 - typescript
 - ts
---

### 数组类型

```ts
const arr2:(string|number)[]=['1','2','3']
const arr3:Array<number|string>=['1','2']
```

ts无法推断出是否存在数组越界的情况，因此访问不存在的元素时，还是会得到声明的元素类型。

```ts
let ele:number|string=arr3[4]
console.log(typeof ele) // 'undefined'
```

### 元祖类型

元祖中访问越界元素时会编译报错

```ts
const p:[number,string,object]=[1,'2',new Date()]
let ele=p[4]//编译错误

// 但是不指定类型的话不会报错
const p2=[1,'2',new Date()]
let ele2=p2[4]// 编译通过
```

#### 可选元素

类型后面跟问号——？表示可选

```ts
const p:[number,string?]=[1,'2']
const x:[number,string?]=[1]
```
可选元素的元祖`length`相当于是一个联合类型。如：`p.length:1|2`

#### 剩余元素

```ts
const p:[number,...string[]]=[1,'2','3']
```

剩余元素的元祖长度是不固定的，因此越界也不会报错。

元祖是数组的子类型，所以下面的写法是成立的

```ts
let arr:Array<number|string|object>=p
```

### Object/object

Object 除了null和undefined都可以赋值给Object类型
object/{} 不允许读取和修改自定义属性

```ts
const obj:object={foo:0}
obj.toString()
obj.foo// 编译错误
```

可以使用类型断言绕过多余属性的检查

```ts
const obj1:{x:number,y:number}={x:1,y:2,z:3}//报错
const obj2:{x:number,y:number}={x:1,y:2,z:3} as {x:number,y:number}//通过
```

通过将值赋值给一个变量，再赋值给目标变量也可绕过检查

```ts
const obj3={x:1,y:2,z:3}
const obj4:{x:number,y:number}=obj3
```

### 函数类型

```ts
function fn(x:number,y?:number,z=0){
    if(y==undefined) return-1
    return x+y+z
}
```

y为可选参数
z为默认参数，z后面不跟类型的话ts会根据默认参数自动推断类型。默认参数在最后，传不传参都不会报错:`fn(1)`

#### 参数解构
```ts
function f0({a,b}:{a:number,b?:number}){
    return a+(b??0)
}
f0({a:1})
```

#### 函数字面量

```ts
let f3:(x:number)=>number=function(a:number){return a}
```

声明中的参数名和实际参数名可以不同（x、a）

#### 签名

```ts
let f5:{(x:number):number}=(x:number)=>x
```

因为函数其实也是对象，这种写法可以处理一些特殊情况：

```ts
function f6(x:number){return x}
f6.version='1.0'

let f7:{
    (x:number):number,
    version:string
}=f6
```

#### 重载

```ts
// 函数声明，没有函数体
function add(x:number,y:number):number
function add(x:number[],y:number[]):number
function add(x:number,y:number[]):number

function add(x:number|number[],y:number|number[]):number{
    if(Array.isArray(x)){
        x=x.reduce((t,m)=>t+m,0)
    }
    if(Array.isArray(y)){
        y=y.reduce((t,m)=>t+m,0)
    }
    return x+y
}

add(1,[2,5])
add(1,2)
add([1,3],[2,4])
add([1,2],9)//报错，没有声明x数组，y数字的情况。
```

#### this

this参数是一个可选参数，若存在，则必须作为第一个形参。this的类型即为函数体重this的类型。

```ts
function pro(this:{a:number},a:number){
    this.a=a
}
```

如果没有this形参，则不能再函数体中使用this（noImplicitThis可修改）


### 接口

```ts
// 属性签名
interface Props{
    x:number
}
//调用签名
interface Func{
    (msg?:string):string
}
//构造签名
interface Contruct{
    new (p?:string):string
}
// 方法签名
interface Func{
    fn(s:string):string
    fn:{(s:string):string}
    fn:(s:string)=>string
}
//索引签名
interface Index{
    [prop:string]:number //字符串索引
    [num:string]:number //数值索引
}
```

一个接口中只能定义一个字符串索引签名或数值索引签名，当两者同时存在时，数值索引的类型必须能够赋值给字符串索引。数值索引签名所表示的属性集合是字符串索引属性集合的子集。

```ts
interface Idx{
    [prop:string]:0|1
    [prop:number]:number // 错误，number范围大于 0|1
}
```

```ts
// 可选签名
interface Op{
    a?:string
}

// 所有重载方法签名必须同时为可选或必选
interface Foo{
    a():void
    a?(x:boolean):boolean//报错
}
//只读属性
interface A{
    readonly x:string
}
```

#### 接口继承

子接口同名属性必须兼容父接口中同名属性的类型，如下报错

```ts
interface Style{
    color:string
}
interface Shape extends Style{
    color:number
}
```

如果继承多个接口，那么父接口中的同名属性类型必须完全相同，否则报错。

```ts
interface S1{
    a:number
}
interface S2{
    a:string
}
interface S3 extends S1,S2{} //报错
// 如果可以兼容多个父接口，是不会报错的
interface S4 extends S1,S2{
    a:any
}
```

### Type

简单理解就是一个篮子，可以放入多个不同类型

### Class

非声明不会被提升，同js。

非空类型断言`!`，可通知编译器该成员变量已经进行初始化，避免编译错误。

```ts
class cls{
    a!:number
    init(){
        this.a=1
    }
    constructor(){
        this.init()
    }
}
```

get/set的可访问性要一致，get返回类型要和set的参数类型一致。

```ts
class cls2{
    private _radius:number=0
    public get radius():number{
        return this._radius
    }
    public set radius(val:number){
        if(val>0) this._radius=val
    }
}
```

#### 参数成员

在构造函数参数列表中，为形参添加任何一个访问修饰符或readonly修饰符，该形参就会称为参数成员，进而被声明为类的成员变量。

```ts
class Cls3{
    constructor(public x:number){}
}
const cls3=new Cls3(0)
cls3.x// 0
```

#### 抽象类

抽象类中抽象成员不能声明为private

#### 类 类型

类声明会引入一个新的命名类型，即与类同名的类 类型。类 类型标识实例类型，它由类的实例成员类型构成。

```ts
class Cls4{
    radius:number
    area():number{
        return Math.PI*this.radius*radius
    }
}

interface Cls4Type{
    radius:number
    area():number
}

const a:Cls4=new Cls4()
const b:Cls4Type=new Cls4()
```

在定义一个类时，实际上我们定义了一个构造函数。也可以称为构造函数类型。我们可以使用new运算符和该构造函数来创建类的实例。在该类型中也包含了类的静态成员类型。

```ts
01 class A {
02     static x: number = 0;
03     y: number = 0;
04 }
05 
06 // 类类型，即实例类型
07 const a: A = new A();
08 
09 interface AConstructor {
10     new (): A;
11     x: number;
12 }
13 
14 // 类构造函数类型
15 const b: AConstructor = A;

```