---
title: css之层级——z-index
date: 2020-10-20
categories:
 - 前端
tags:
 - css
 - z-index
---

## 前言

最近在项目中使用antd的级联组件时，发现选择完选项后，文本框中并没有出现东西，但是呢`placeholder`不见了，并且鼠标悬浮到文本框上时最右侧的`x`却显示了。这说明值是有了的，只是没显示在页面上，于是乎`f12`审查元素，发现确实有东西了，如图：

![有值却没显示](/images/cssLevel/有值不显示.png)

于是逐个审查，发现作为第二个元素的`input`被设置了定位导致的，遂有此文，重新学习并记录。

## 层级

网页除了x、y轴之外，还有一条z轴，可以理解成是页面到屏幕前的你这条线（or叠十八罗汉），元素之间相互覆盖就有了层级的概念

### 常见元素

首先来看下常见元素的层级情况，代码如下：

```css
.less>*{
    width: 300px;
    height: 300px;
}
.block{
    background: cadetblue;
    margin-top: -350px;
    margin-left: 10px;
}
.inline{
    display: inline-block;
    background: cyan;
    margin-top: 100px;
    margin-left: 100px;
}
.float{
    float: left;
    background: chocolate;
    margin-top: -340px;
    margin-left: 150px;
}
.position{
    position: absolute;
    top: 0;
    left: 250px;
    background: brown;
}
.position2{
    top: -200px;
    left: 60px;
    position: relative;
    background: blueviolet;
    z-index: 1;
}
.position3{
    z-index: -1;
    background: bisque;
    left: 30px;
}
```

```html
<div class="less">
    <span class="inline">inline</span>
    <div class="block">block</div>
    <div class="float">float</div>
    <div class="position">position</div>
    <div class="position2">position2-relative</div>
</div>
```

效果如图：

![常见元素层级](/images/cssLevel/常见元素层级.png)

可以看到各个元素覆盖情况从下到上依次是：`block->float->inline(-block)->position`。

为什么没写position2呢？其实所有的`position`元素同属一个等级，position2覆盖在position上，是因为在HTML中position2在position的后面。如果将position2和position替换位置，在block后另一个block2会怎样呢？

```css
.block2{
    background: darkorange;
    margin-top: -270px;
    margin-left: 50px;
}
```

```html
<span class="inline">inline</span>
<div class="block">block</div>
<div class="block2">block2</div>
<div class="float">float</div>
<div class="position2">position2-relative</div>
<div class="position">position</div>
```

![同等级元素](/images/cssLevel/同等级元素.png)

可以看到，同等级的元素是根据在HTML中的位置而后来居上的。

### z-index属性

除了默认的层级顺序外，还可以使用`z-index`属性来改变元素的层级顺序。给位于上方position2元素添加`z-index:1`，并在最后新增一个position3且设置`z-index:-1`来观察元素层级的变化。

![z-index属性的影响](/images/cssLevel/z-index属性的影响.png)

可以看到，`-1`的元素层级是低于block元素的，而`1`的元素覆盖在了未设置`z-index`的元素之上。由此，层级从下到上应该是`position的z-index负值->block->float->inline(-block)->positon未设置z-index->position的z-index正值`。如果在其他元素上添加`z-index`属性会发生什么呢？事实上并没有什么效果，其他几种元素依然如上图所示，待在原来的层级一动不动。

那么z-index属性到底在哪些元素上会生效呢？本文列举一些常见的属性：

- position值不为static的元素
- flex、grid的子元素
- opacity值小于1
- transform、filter的值不为none

下面我们验证一下常用的`flex`元素

```css
.flex{
    display: flex;
    border: 1px solid red;
    width: 300px;
    margin: 50px;
}
.flex>div{
    width: 100px;
    height: 100px;
    flex-shrink: 0;
}

.flex0{
    background: blue;
    z-index: 0;
}

.flex-1{
    background: green;
    z-index: -1;
    margin-left: -50px;
    margin-top: -30px;
}

.flex1{
    background: yellow;
    z-index: 1;
    margin-left: -120px;
    margin-top: -60px;
}
```

```html
<div class="flex">
    <div class="flex0">0</div>
    <div class="flex-1">-1</div>
    <div class="flex1">1</div>
</div>
```

![flexbox的z-index](/images/cssLevel/flexbox的z-index.png)

可以看到确实是按照`z-index`从小到大的顺序依次叠加。

所以最终的顺序是：`z-index有效且为负值->block->float->inline(-block)->z-index有效且未设置->z-index有效且为正值`

本文代码：[css层级](http://yishuihe.gitee.io/blog/code/css层级.html)

 > 参考：[理解z-index](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index)

最后附上一张经典的css层级图：

![css层级](/images/cssLevel/经典层级图.jpg)

## 后记

在解决问题之后呢，闲来无事就去antd官网试了下将`input`设置为相对定位后发现选择的值依然可见，遂脑中问号四起，为啥我们的就被覆盖了呢？再次仔细审查后发现，原来是有人将所有的`input`都设置了一个纯白色的内阴影，我……