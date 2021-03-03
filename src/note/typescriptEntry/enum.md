---
title: 枚举
date: 2021-03-01 21:20:20
categories:
 - 读书
tags:
 - typescript入门与实战
---

## 枚举

### 数值枚举

在定义数值型枚举时，可以为一个或多个枚举成员设置初始值。对于未指定初始值的枚举成员，其值为前一个枚举成员的值加1。数值型枚举是number类型的子类型，因此允许将数值型枚举类型赋值给number类型，反之亦然。

```ts
enum Direction {
    Up,        // 0
    Down,      // 1
    Left = 10, // 10
    Right,     // 11
}

const direction: Direction = Direction.Up;
const direction2: number = Direction.Up;
const d1: Direction = 0;  // Direction.Up
const d2: Direction = 10; // 不会产生错误
```
### 字符串枚举

不允许将string类型赋值给字符串枚举类型，这一点与数值型枚举是不同的。例如，下例中将字符串“'UP'”赋值给字符串枚举类型的常量direction将产生编译错误：

```ts
enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}

const direction: Direction = 'UP';
//    ~~~~~~~~~
//    编译错误！类型 'UP' 不能赋值给类型 'Direction'
```

### 异构枚举

在异构型枚举中，必须为紧跟在字符串枚举成员之后的数值型枚举成员指定一个初始值。下例中，ColorA枚举的定义是正确的，但是ColorB枚举的定义是错误的，必须为数值型枚举成员Black指定一个初始值。示例如下：
```ts
enum ColorA {
    Black,
    White = 'White',
}

enum ColorB {
    White = 'White',
    Black,
//  ~~~~~
//  编译错误！枚举成员必须有一个初始值
}
```