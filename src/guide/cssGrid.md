---
title: css grid布局
date: 2020-12-30
categories:
 - 前端
tags:
 - css
 - grid
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
/* grid */
form{
    width: 300px;
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 10px 30px;
    justify-items: end;
}
```

<a href="/images/cssGrid/grid.html" target="_blank">grid代码</a>

是不是很简洁呢，那么接下来就介绍一些grid的概念吧。先上图：

![grid](/images/cssGrid/grid.jpg)

grid的相关概念如图，下面用文字来描述：

- 容器：`display`设置为`grid`或`inline-grid`的元素则为网格容器
- 网格线：即图中紫色虚线条
- 单元格：即四面均由网格线围起来的小格子
- 区域：多个单元格组成的一个范围，且为矩形
- 轨道：即两条平行且相邻的网格线之间的区域，可联想火车轨道
- 间距：轨道之间的距离，即图中粗紫色线（紫色阴影区域）

> 本文后续会将水平轨道称为行，垂直轨道称为列。

概念图示例代码如下：

```css
width: 300px;
height: 300px;
display: grid;
grid-template-columns: [c1] 100px [c2] 1fr [c3];
grid-template-rows: repeat(3,1fr);
gap: 10px 30px;
justify-items: end;
```

了解基本概念之后呢，是否迫切想知道怎么来定义这些东西呢，接下来就依照上述概念图代码来介绍一下常用的grid属性吧！

## display

构建grid容器，有两个值：

- grid：块状网格
- inline-grid：内联网格

grid的子项为块状元素

## grid-template-columns(rows)

用来定义行、列大小（宽高）：

- grid-template-columns： 用来定义垂直方向轨道大小（宽）
- grid-template-rows：    用来定义水平方向轨道大小（高）

每个轨道的大小由空格隔开，有几个值便会生成几列（行），概念图中代码中的`repeat(3,1fr)`是什么意思呢？其实`repeat`函数的作用就是重复几次，参数第一个为重复次数，第二个为要重复的值。故上述中代码中的行列设置等同于：

```css
grid-template-columns: 100px 1fr;
grid-template-rows: 1fr 1fr 1fr;
```

columns的值就是两个，所以有两列。rows的值为三个，所以有三行。

其中`fr`是个单位，它的意思是将剩余的可用空间平分，如columns里有`100px`和`1fr`两列，意思就是第一列宽度为`100px`，第二列宽度为剩余全部宽度（因为只有一个`fr`），而rows的代码为三个`1fr`，那么就是三行的高度平分总高度。

> 如果rows值为 `1fr 2fr 3fr` 呢？思考下吧。

除了设置固定宽度外，百分比（%）、`calc`函数都是可以使用的，这里还可以使用一个`minmax(min,max)`的函数，此函数接收两个参数，最小值和最大值，如：

```css
grid-template-columns: minmax(100px,1fr) minmax(80px,200px)
```

上面代码将网格分成两列，第一列最小值为`100px`，最大撑满；第二列最小值为`80px`，最大`200px`。在需要适应的地方会比较有用。

### 网格线名称

先还原columns的设置代码：

```css
grid-template-columns: [c1] 100px [c2] 1fr [c3];
```

中括号里的`c1`、`c2`、`c3`代表了网格线的名称，也就是我们可以给网格线起名，但它们不是必须的，rows里就没有写。如果没有起名的话，网格线则会按照`1`、`2`、`3`...（从上到下，从左往右）这样的数字顺序来命名。

网格线的名称也可以是多个，中间用空格隔开，如：

```css
grid-template-columns: [c1L] 100px [c1R c2] 1fr [c3];
```

上面就表示第二条列网格线的名称为`c1R`和`c2`，可以单独使用任一个。那么给网格线起名有什么用呢？先按下不表。继续看上图中的紫色阴影区域。

## column(row)-gap/gap

gap定义网格轨道之间的间距，旧版浏览器可能需要在最前面添加`grid-`前缀:

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

## justify(align)-items/place-items

定义单元格的对齐方式

- justify-items：定义水平方向上的对齐方式
- align-items：  定义垂直方向上的对齐方式
- place-items：  上面两种的简写方式，第一个值为`align-items`，第二个值为`justify-items`

下表列出行列对齐方式的值与效果：

|值|justify-items|align-items|
|-|-|-|
|start|左对齐|上对齐|
|end|右对齐|下对齐|
|center|左右居中|上下居中|
|stretch|宽度撑满|高度撑满|

更直观请看：

![对齐属性](/images/cssGrid/对齐.png)

> 实际是针对所有单元格的，图中只是展示一下，画的不咋地，意思一下。

## grid-column(row)-start/grid-column(row)-end/grid-column(row)/grid-area

用于grid下属元素，定义在网格中始终位置：

- grid-column-start：定义在列轨道中的起始位置
- grid-column-end：  定义在列轨道中的结束位置
- grid-column：      以上两行的简写方式，第一个值为start，第二个值为end，中间以斜杠（`/`）分隔，如：2/4
- grid-row-start：   定义在行轨道中的起始位置
- grid-row-end：     定义在行轨道中的结束位置
- grid-row:          以上两行的简写方式，第一个值为start，第二个值为end，以斜杠（`/`）分隔。
- grid-area:         是上述四个start、end的简写，值分别为`grid-row-start`/`grid-column-start`/`grid-row-end`/`grid-column-end`，以斜杠（`/`）分隔。

上面我们说到了网格线可以命名，在此处便可用上了。

column用来设置列，row设置行；start设置起始位置（基于网格线），end设置终止位。如下代码将`div`分为一个九宫格（<a href="/images/cssGrid/grid2.html" target="_blank">grid2代码</a>）：

```html
<!-- grid2 -->
<div class="con">
    <div class="d1">d1</div>
    <div class="d2">d2</div>
    <div class="d3">d3</div>
    <div class="d4">d4</div>
    <div class="d5">d5</div>
    <div class="d6">d6</div>
</div>
```

```css
.con{
    width: 500px;
    height: 300px;
    display: grid;
    grid-template-columns: [c1] 100px [c2] 1fr [c3] 2fr [c4];
    grid-template-rows: repeat(3,1fr);
    gap: 10px 30px;
}
.d1{
    grid-column-start: c2;
    grid-column-end: c4;
    background: aquamarine;
}
.d2{
    background: bisque;
}
.d3{
    grid-row-start: 1;
    grid-row-end: 3;
    background: brown;
}
.d4{
    background: cornflowerblue;
}
.d5{
    background: darkgreen;
}
.d6{
    background: lightgray;
}
```

效果如图，已标上网格线名称：

![九宫格](/images/cssGrid/position.png)

可以看到在`d1`、`d3`的`grid-column-start/end`属性中使用了`grid-template-columns`中定义的网格线名称`c1`、`c2`、`c4`，而在`grid-template-rows`中则使用的是`1`、`2`这样的默认名称（序号）。

好了，言归正传，`d1`设置了列始末位置分别为`c2`和`c4`。所以它便占据了`c2`到`c4`之间的空间。`d3`设置了行始末位置为`1`和`3`，所以占据了行中`1`到`3`之间的空间。没有设置的单元格默认占一个单元格，并依次占据剩下的空间。

除了上述值之外，还支持`span 数字`这样的值，span后面的数字表示这个元素要占据多少个单元格，修改上面css代码中的`d2`：

```css
.d2{
    background: bisque;

    grid-column: span 2;
}
```

代码中指定d2在列上占据两个单元格（单独写`grid-column-start/end`也是一样的效果，具体看图），最终结果如下：

![span](/images/cssGrid/span.gif)

## justify(align)-self/place-self

前面介绍过单元格的整体对齐方式。这里介绍下针对某个单元格改怎么来定义其对齐方式：

- justify-self：定义行方向的对齐方式
- align-self：  定义列方向的对齐方式
- place-self：  上述两属性的简写，第一个值为`align-self`，第二个值为`justify-self`

以上两个属性在单元格上使用，值与[justify(align)-items](#justify-align-items-place-items)相同，修改上面的代码，在d2中添加：

```css
.d2{
    background: bisque;
    grid-column: span 2;

    justify-self: end;
    align-self: start;
}
```

可以看到d2跑到了右上角，因为默认值为stretch，所以之前的才是充满真个单元格的。

## justify(align)-content/place-content

之前都是使用`fr`将整个grid容器占满了，如果没有占满的话，可以使用`justify(align)-content`来定义其在容器中的位置。

- justify-content： 水平对齐方式
- align-content：   垂直对齐方式
- place-content：   上述两属性的简写，第一个值为`align-content`，第二个的值为`justify-content`。

修改上面容器的代码：

```css
.con{
    width: 500px;
    height: 300px;
    display: grid;
    /* grid-template-columns: [c1] 100px [c2] 1fr [c3] 2fr [c4];
    grid-template-rows: repeat(3,1fr); */
    grid-template-columns: repeat(3,100px);
    grid-template-rows: repeat(3,50px);
    gap: 10px 30px;
}
```

删除子项grid-column-start/end的相关代码，只保留背景色。值有：

|值|justify-content|align-content|
|-|-|-|
|start|左对齐|上对齐|
|end|右对齐|下对齐|
|center|左右居中|上下居中|
|stretch|宽度撑满|高度撑满|
|space-around|均匀排列每个元素首个元素放置于起点，末尾元素放置于终点|同左|
|space-between|均匀排列每个元素每个元素周围分配相同的空间|同左|

还是用图来演示下吧：

![content](/images/cssGrid/content.gif)

## grid-template-areas/grid-area

又见到`grid-area`了，先看定义：

- grid-template-areas：直接定义一整个网格，而无需向上面那样去画线来完成。
- grid-area：用于子项，来指定子项属于哪个区域。

复制一份上面的代码并修改（html和颜色未变，略。<a href="/images/cssGrid/grid3.html" target="_blank">grid3代码</a>）：

```css
/* grid3 */
.con{
    width: 500px;
    height: 300px;
    display: grid;
    grid-template-areas:"a b ."
                        "a b d"
                        "e f f"
                        "e . c";
    gap: 10px 30px;
}
.d1{
    grid-area: b
}
.d2{
    grid-area: a
}
.d3{
    grid-area: e
}
.d4{
    grid-area: f
}
.d5{
    grid-area: d
}
```

这里的a、b、c等代表的是区域的名称，其中有两个点.，点代表缺省（未名城区域），效果如图：

![area](/images/cssGrid/area.png)

可以看到所有子项均在指定区域，d6因为没指定，所以自动填充到可以填充的空白区域。

## grid-template

此属性为`grid-template-areas`、`grid-template-columns`、`grid-template-rows`的简写形式，如：

```css
grid-template:
            [ca] "a b ." 50px [cz]
            "a b d"
            "e f f"
            "e . c"
            / 1fr 2fr 3fr;
```

效果如图：

![grid-template](/images/cssGrid/template.png)

看chrome的转换结果，`grid-template-areas`、`grid-template-rows`可以穿插书写，斜杠后的为`grid-template-columns`。也可以不使用areas或单独使用areas，如：

```css
/* 单独areas */
grid-template:
            "a b ."
            "a b d"
            "e f f"
            "e . c";
/* 或用作rows/columns的简写*/
grid-template:[ca] 50px [cz]/1fr 2fr 3fr;
```

前面的问题——`1fr 2fr 3fr`也给出答案了 :) 

## grid-auto-columns(rows)

前面的grid都是完美刚好的存在于容器中，但是实际情况子项也会出现超出容器的时候。超出的部分所在区域称为隐式网格。可以使用`grid-auto-columns(rows)`来定义他们的宽高。那么，什么时候会超出呢？当子项没有再定义的网格或区域范围内时，就会产生隐式网格，如：子项多于画的网格线；指定了一个没有命名的区域；`grid-column-start`设置超出等等。

下面来看一下具体表现（HTML和背景色依然不变）：

```css
/* grid4 */
.con{
    width: 500px;
    height: 300px;
    display: grid;
    grid-template-columns:repeat(3,100px);
    grid-template-rows: 1fr;
    gap: 10px 30px;
}

.d3{
    background: brown;
    grid-column-start: 5;
}
.d4{
    background: cornflowerblue;
    grid-row-start: 5;
}
```

这里，设置了三列一行，且`d3`、`d4`设置了超出范围的网格线起始点，效果如图：

![隐式网格](/images/cssGrid/imp.png)

可以看到`d3`的高度是和已声明的网格一样的，但是`d4`、`d5`、`d6`因为不在`grid-template`的定义之内，所以都显示了最小高度（`d1`的高度并没有`300px`，因为被`d5`、`d4`给压榨了空间。）。此时便可以通过`grid-auto-rows`来设置这些在隐式网格中元素的高度。在`.con`里增加（<a href="/images/cssGrid/grid4.html" target="_blank">grid4代码</a>）：

```css
/* grid4 */
.con{
    width: 500px;
    height: 300px;
    display: grid;
    grid-template-columns:repeat(3,100px);
    grid-template-rows: 1fr;
    gap: 10px 30px;

    grid-auto-rows: 1fr;
    grid-auto-columns: 150px;
}
```

> auto和template共享容器空间

效果如图：

![auto设置隐式网格](/images/cssGrid/auto.png)

## grid-auto-flow 

此属性可以理解为更改grid自动填充优先方向，如`grid-area`例子里的`d6`没设置自动填充到右上角，如果将左下角和右上角同时空出，在将`grid-auto-flow`设置为`column`，那么`d6`便会填充字左下角了，如图：

![flow](/images/cssGrid/flow.gif)

这里就不上代码了（其实图中已有）。

## grid

这是一个大而全的属性，是以下属性的简写：
grid-template-rows、grid-template-columns、grid-template-areas、grid-auto-rows、grid-auto-columns、grid-auto-flow、grid-column-gap 和 grid-row-gap。具体参见[grid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid)。

至此，本文已介绍了大多可能用到的grid属性及相应的值，虽不全，但也基本满足大部分场景了。

> 本文参考：
> - [CSS 网格布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout)
> - [CSS Grid 布局完全指南(图解 Grid 详细教程)](https://www.html.cn/archives/8510/)