---
title: css之grid布局
date: 2020-12-16
categories:
 - 前端
tags:
 - css
 - grid
publish: false
---

grid布局出了也好些时间了，但是之前为了兼容IE，一直都没有使用过。现在终于摆脱IE的束缚了，那么就愉快的使用起来吧。

grid类似table，但是更简单，也更灵活。当页面布局是多行多列的时候使用grid更方便，而且HTML结构也会更简单。比如经常要用到的form表单:

![form](/images/cssGrid/form.png)

这样的表单布局很常见，也有很多种实现方式，那么来看下用grid怎么实现吧：

```html
<form>
    <label>姓名</label>
    <input />
    <label>年龄</label>
    <input type="number"/>
    <label>职业</label>
    <input />
</form>
```

```css
form{
    width: 300px;
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 10px 30px;
    justify-items: end;
}
```

是不是很简洁呢，那么接下来就介绍一些grid的概念吧。先上图：

![grid](/images/cssGrid/grid.jpg)

grid的关键概念如图所示：

- 容器：display设置为grid或inline-grid的元素则为网格容器
- 网格线：即图中紫色虚线条
- 单元格：即四面均由网格线围起来的小格子
- 轨道：即两条平行且相邻的网格线之间的区域，可联想火车轨道
- 间距：轨道之间的距离，即图中粗紫色线（紫色阴影区域）
- 行：水平轨道
- 列：垂直轨道

图中代码如下：

```css
width: 300px;
height: 300px;
display: grid;
grid-template-columns: [c1] 100px [c2] 1fr [c3];
grid-template-rows: repeat(3,1fr);
gap: 10px 30px;
justify-items: end;
```

了解基本概念之后呢，是否迫切想知道怎么来定义这些东西呢，本文就来介绍一些本人常用的grid属性！

## display

构建容器

- grid：块状网格
- inline-grid：内联网格

## grid-template-columns(rows) 

### 定义行、列大小

grid-template-columns 用来定义垂直方向轨道大小（宽）
grid-template-rows    用来定义水平方向轨道大小（高）

每个轨道的大小由空格隔开，如上图中的代码等同于为：

```css
grid-template-columns: 100px 1fr;
grid-template-rows: 1fr 1fr 1fr;
```

columns的值就是两个，所以有两列。rows的值为三个，所以有三行。

> 单位fr的意思是将剩余的可用空间平分，如columns里有100px和1fr两列，意思就是第一列宽度为100px，第二列宽度为剩余全部宽度（因为只有一个fr），而rows的代码为三个1fr，那么就是三行的高度平分所有高度。

> 如果rows值为 1fr 2fr 3fr 呢？思考下吧。

原代码中的repeat(3,1fr)是什么意思呢？其实repeat函数的作用就是重复几次，参数第一个为重复次数，第二个为要重复的值。

### 网格线名称

先还原columns的代码

```css
grid-template-columns: [c1] 100px [c2] 1fr [c3];
```

中括号里的c1、c2、c3代表了网格线的名称，也就是我们可以给网格线起名，但它们不是必须的，rows里就没有写。

网格线的名称也可以是多个，中间用空格隔开，如：
```css
grid-template-columns: [c1L] 100px [c1R c2] 1fr [c3];
```

那么给网格线起名有什么用呢？先按下不表。继续看上图中的紫色阴影区域。

## column(row)-gap

gap定义网格轨道之间的间距，旧版浏览器需要在前面添加grid- 前缀

- column-gap：列轨道间距
- row-gap：行轨道间距
- gap：上述两个的综合写法，值依次为：row-gap column-gap

如上图代码为：
```css
gap: 10px 30px;
/* 等同于 */
row-gap: 10px;
column-gap: 30px;
```

好了，上图代码就剩justify-items: end;了，来看下吧。

## justify(align)-items

定义单元格的对齐方式

- justify-items：定义水平方向上的对齐方式
- align-items：  定义垂直方向上的对齐方式

值见下表：

|值|justify-items|align-items|
|-|-|-|
|start|左对齐|上对齐|
|end|右对齐|下对齐|
|center|居中|居中|
|stretch|宽度撑满|高度撑满|

更直观请看：

![对齐属性](/images/cssGrid/对齐.png)

> 实际是针对所有单元格的，图中只是展示一下，画的不咋地，意思一下。

## grid-column(row)-start/grid-column(row)-end

用于grid下属元素，定义在网格中始终位置：

- grid-column-start：定义在列轨道中的起始位置
- grid-column-end：  定义在列轨道中的结束位置
- grid-row-start：   定义在行轨道中的起始位置
- grid-row-end：     定义在行轨道中的结束位置

上面我们说到了网格线可以命名，在此处便可用上了。
## justify(align)-content


## justify(align)-self


## repeat

## span

##
