---
title: css之flex
date: 2021-06-06
categories:
 - 前端
tags:
 - css
 - flex
---

之前写过一篇介绍grid的文章，也懒了好久，今天来聊一聊flex吧。

## display:flex

使用flex首先要将容器的`display`属性设置为`flex`或`inline-flex`。使其转换为flex容器。

- flex：块状felx
- inline-flex：内联flex

首先我们先准备一套容器备用：

```html
<div class="flex">
    <div class="item i1">1</div>
    <div class="item i2">2</div>
    <div class="item i3">3</div>
    <div class="item i4">4</div>
    <div class="item i5">5</div>
    <div class="item i6">6</div>
    <div class="item i7">7</div>
    <div class="item i8">8</div>
    <div class="item i9">9</div>
</div>
```

```css
.flex .item{
    width: 100px;
    border: 1px solid blue;
}
```

此时，页面的样子是：

![初始容器](/images/flex/初始容器.png)

然后，我们将.flex的display设置为flex，

```css
.flex{
    display: flex;
}
```

页面变为

![初始容器](/images/flex/flex容器.png)

为什么会这样呢？其实是当元素被设置为flex容器时，会有一些默认的属性和值生效。其中导致子`div`——`.item`,也可称他们为flex元素，变成横向排列的的属性时`flex-direction`。他的默认值是`row`，即横向排列。既然说到这里了，那么接下来就介绍他吧。

在这之前呢，先来了解两个概念：轴和起止线

## 轴和起止线

flex容器有两根轴，主轴和交叉轴。其中主轴由`flex-direction`的值决定。默认值`row`表示主轴是从左到右。起止线分别位于左右两边，左起右止（本文只讨论ltr的情况，rtl与之左右相反，右起左止）。交叉轴方向为从上到下，起止线为上起下止。了解这个以后我们就可以继续了。

## flex-direction

flex-direction有四个值，分别是：

- row               主轴从左到右，交叉轴从上到下
- row-reverse       主轴从右到左，交叉轴从上到下
- column            主轴从上到下，交叉轴从左到右
- column-reverse    主轴从下到上，交叉轴从左到右

下面是四种值的对应表现：

![direction](/images/flex/direction.gif)

flex容器的默认值除了`flex-direction:row`之外，还有：

- 元素从主轴起始线开始。
- 元素在主轴方向不会被拉伸——元素属性`flex-grow:0`，但可以缩小——元素属性`flex-shrink:1`。 
- 元素在交叉轴上会被拉伸——容器属性`align-items: stretch`;
- 元素不会换行——容器属性`flex-wrap:nowrap`
- `flex-basis:auto`

接下来我们就来一一认识他们吧。

## flex-shrink

flex-shrink可以定义元素的缩小规则，值为非负整数，默认值为1。为了看到效果，我们先把容器的宽度设置为小于总元素的值

```css
.flex{
    display: flex;
    width: 600px;
}
```

效果如图：

![shrink](/images/flex/shrink1.gif)

可以看到，所有元素立马缩小了，宽度依然保持相等。因为所有元素的`flex-shrink`的值都是默认值1，所以他们缩小的比例也是相同的。如果更改其中某个元素的值呢？

```css
.i1{
    flex-shrink: 2;
}
.i2{
    flex-shrink: 3;
}
```

为了方便计算，我们先去除`border`，来看一下吧：

![shrink2](/images/flex/shrink2.gif)

可以看到`i1`的宽度为50，`i2`为25，其他均为75，这是怎么算出来的呢。原始元素总长度为`100*9=900`，现在容器长度为600。相差300。缩小的范围就在相差的300px之中，具体计算规则为：300除以总shrink的和值。上面为`2+3+1*7`，其他7个为默认值1。300除以12等于25。再用元素的初始宽度减去（shrink的值乘以25），所以`i1`的宽度为 `100-25*2=50`,同理`i2`为`100-25*3=25`。总结后为：

`元素初始宽度-（原始所有元素宽度-现在所有元素宽度）/所有元素总shrink和值*元素shrink值`

但是当这个值非常小的时候，元素会保留它的最小宽度（示例中文字宽度）。

如果`flex-shirink`值为0，则不会缩小。

如果加上`border`要怎么计算呢？首先我们要用差值加上`border`的总和值——其实是`原始所有元素宽度-（现在所有元素宽度-border总和）`算出content的宽，最后在算出的值加上自己的`border`就行。如上例子就是：`300+18=318`，`318/12=26.5`，i1：`100-26.5*2+1+1=49`，i2：`100-26.5*3+1+1=22.5`。

## flex-grow

用于设置元素的放大规则，将多余空间按照`flex-grow`的总和值平分后加到原有元素上。上面说过`flex-grow`的默认值为0，不会放大。那么来更改几个元素看看吧：

```css
.flex{
    display: flex;
    width: 1200px;
}
.i1{
    flex-grow: 2;
}
.i2{
    flex-grow: 3;
}
```

总宽度1200，原始宽度900，多出300，分成`2+3=5`份，每份60px，所以`i1`的最终宽度为`100+60*2=220`，`i2`为`100+60*3=280`

![grow](/images/flex/grow.png)

## flex-basis

`flex-basis`可以设置元素在主轴方向上的大小。如`flex-direction`值为`row[-reverse]`，相当于`width`。`column[-reverse]`相当于`height`。当`flex-basis`（非`auto`）和`width`、`height`同时存在时，`flex-basis`的优先级更高。值为`auto`时则会使用`width`、`height`。上面例子都是默认值`auto`，这里就不赘述了。

![basis](/images/flex/basis.png)

当`flex-basis`值为0时，元素会保留其能显示最小宽度，其余空间均为剩余空间，可用于`flex-grow`或`flex-shrink`计算。

> 据说某些浏览器0会出现问题，可尝试使用0%替换。

## flex-wrap

用于控制当元素超出时是否换行。

- nowrap 不换行，默认值
- wrap 多行
- warp-reverse 多行，但交换交叉轴的起止点

我们改变flex容器的`flex-wrap`值来看下：

```css
.flex{
    display: flex;
    width: 600px;
    flex-wrap: wrap;
}
```

![wrap](/images/flex/wrap.gif)

## flex-flow

此为`flex-direction`和`flex-wrap`的缩写，如:`flex-flow:row wrap;`

## flex

为flex-grow/flex-shrink/flex-basis的缩写形式。如：`flex:1 1 0`，此属性有四种预定义属性：

- initial 相当于 0 1 auto
- auto  相当于 1 1 auto
- none  相当于 0 0 auto
- 数值 相当于 数值 1 0% 如：`flex:1` 为 1 1 0%

## order

值为整数，可以用来改变元素的顺序，默认值为0。小的值排在大的值前面。设置如下：

```css
.i1{
    order:2
}
.i3{
    order:-2
}
```

效果如图：

![order](/images/flex/order.png)

## gap

同`grid`的`gap`，用于设置两个元素之间的间距：

```css
.flex{
    gap:30px
}
```

效果如图：

![gap](/images/flex/gap.png)

## justify-content

用于设置元素在主轴上的对齐方式。(口是元素，—是空白)

- flex-start 主轴起始线对齐                         |口口口——————|
- flex-end 主轴终止线对齐                           |——————口口口|
- center 居中                                      |———口口口———|
- space-between 元素之间间距相同，左右元素挨着两边    |口———口———口|
- space-around 元素左右两侧有相同的间距              |—口——口——口—|
- space-evenly 元素之间、元素与边之间间距相同         |—口—口—口—|

## align-items

用于设置元素在交叉轴上的对齐方式。

- flex-start 交叉轴起始线对齐 
- flex-end 交叉轴终止线对齐
- center 居中
- stretch 拉伸补充，默认值。

`stretch`的效果可以将flex容器的高度设置为`100px`，此时可以看到元素的高度填满整个高度。但是元素如果设置有自己的大小限制的话，则不会拉伸。

![stretch](/images/flex/stretch.png)

## align-content

当有多行时，用于设置多行相对于容器的对齐方式，其值包含了上述`justify-content`和`align-items`的所有值。效果也是一样的，来浏览一下吧

![alignContent](/images/flex/alignContent.gif)

## align-self

用于控制单个元素的对齐方式。可覆盖`align-items`的值。

将容器`align-items`设置为`center`，`i1`的`align-self`设置为`flex-start`。效果如下：

![self](/images/flex/self.png)

> 经测，当多行时，`align-content`拥有高优先级，`align-self`不能覆盖其值。

呼~，可以愉快的去玩耍了。溜了溜了