---
title: 用css画一个冰墩墩
date: 2022-03-07
categories:
 - css
tags:
 - css
---

之前用css画了一个冰墩墩。闲来无事，就在这里就简单分享一下。

首先来看一下冰墩墩的图片，分析一下如何下手。

![border](/images/bingDwenDwen/bddxrr.jpg)

嗯~~~，头身一体，没有脖子！脸部外围几层彩带，俩黑眼圈的大眼睛，一鼻一嘴，俩耳朵，俩手臂，俩脚脚。emm，废话有点多，没事，接下来就按照上面的肢解来一步一步画出来吧。

### 身体

按照上面的分析——对了，黑眼圈和眼珠是不一样的！来一个大框架：

```html
    <div class="bdd">
        <div class="ear left"></div>
        <div class="body">
            <div class="face">
                <div class="eye left">
                    <div class="eyeball"></div>
                </div>
                <div class="eye right">
                    <div class="eyeball"></div>
                </div>
                <div class="nose"></div>
                <div class="mouth"></div>
            </div>
        </div>
        <div class="ear right"></div>
        <div class="arm left"></div>
        <div class="arm right"></div>
        <div class="foot left"></div>
        <div class="foot right"></div>
    </div>
```

确定一下画布大小。

```css
.bdd{
    position: relative;
    height: 187px;
    width: 187px;
}
```

- 为啥是187px？因为我参照的图片是这么大的，为了尽量保持比例。后续其他大小也是。
- 不同大小可以`transform:scale()`。

### 头身

处于正中。一个大的椭圆形，长方形加`border-radius: 50%;`即可。身体边缘用`border`确定。

```css
.body{
    margin: 0 auto;
    background: white;
    width: 134px;
    height: 160px;
    border: 3px solid black;
    border-radius: 50%;
}
```

### 耳朵

圆形，正方形加`border-radius: 50%;`。使用定位调整位置，移动到身体上面，漏出一半左右。多余部分应该被身体遮挡，使用负的`z-index`来实现。

```css
.ear{
    background: black;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: 44px;
    z-index: -9;
}
```

此时左右耳朵是重叠的，去除上面`left:44px`，分别调整左右耳朵的位置。

```css
ear.left{
    left: 44px;
}
.ear.right{
    right: 44px;
}
```

### 大脸

画一个彩带先确定大脸的轮廓`border`，类似正方形，加一点点弧度。同时使用定位调整一下位置。

```css
.face{
    border: 2px solid blue;
    width: 96px;
    height: 76px;
    position: relative;
    z-index: 99;
    left: 15px;
    top: 16px;
    border-radius: 45% 45% 35% 35%;
}
```

利用伪元素`before`和`after`来多画两条彩带。外围的要比里面的大一圈，适当调整大小。

```css
.face::before{
    content: '';
    border: 2px solid orange;
    width: 104px;
    height: 84px;
    position: absolute;
    left: -6px;
    top: -6px;
    border-radius: 45% 45% 35% 35%;
}
.face::after{
    content: '';
    border: 2px solid green;
    width: 100px;
    height: 80px;
    position: absolute;
    left: -4px;
    top: -4px;
    border-radius: 45% 45% 35% 35%;
}  
```

- 原图是五条，懒！

还不错，接下来画面部器官。

### 眼

黑眼圈是椭圆形。

```css
.eye{
    width: 48px;
    height: 28px;
    border-radius: 50%;
    background: black;
    position: absolute;
    top: 14px;
}
```

现在是水平的，需要旋转一下。并调整一下右眼圈的位置。

```css
.eye.left{
    transform: rotate(315deg);
}
.eye.right{
    transform: rotate(45deg);
    right: 0;
}
```

接下来画眼珠，标准的圆形。因为旋转过，先以左眼为参考来处理。眼珠是黑的，所以只需画个眼白来隔离一下眼珠和黑眼圈就可以了。

```css
.eyeball{
    border: 2px solid white;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    position: relative;
    top: 8px;
    left: 24px;
}
```

调整一下右眼圈位置。

```css
.eye.right .eyeball{
    left: 5px;
}
```

好了，但是似乎少了点什么。对了，眼睛无神。那就来打个光。

```css
.eyeball::after{
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: white;
    display: block;
    position: relative;
    top: 2px;
    left: 7px;
}
```

同样，调整一下位置。

```css
.eye.left .eyeball::after{
    top: 3px;
    left: 2px;
}
```

### 鼻子

一个倒三角。这里使用`border`来画三角形。稍微给点弧度。

```css
.nose{
    display: inline-block;
    position: absolute;
    left: 41px;
    top: 34px;
    border: 7px solid;
    border-color: black transparent transparent;
    border-radius: 33%;
    z-index: 9;
}
```

- 不了解的可以看下图

![border](/images/bingDwenDwen/border.png)

### 嘴

一个不太标准的椭圆。先画一个椭圆，然后沿X轴翻转那么一点点，恩，差不多了。

```css
.mouth{
    width: 25px;
    position: relative;
    background: black;
    height: 20px;
    left: 37px;
    top: 42px;
    border-radius: 50%;
    transform: rotateX(36deg);
}
```

接下来，利用伪元素before来遮住上面一部分。

```css
.mouth::before{
    content: '';
    background: white;
    width: 15px;
    height: 10px;
    display: block;
    border-radius: 41%;
    position: absolute;
    left: 4px;
    top: -5px;
}
```

还差个舌头，就用after吧。同样的翻转，并调整一下位置。

```css
.mouth::after{
    content: '';
    display: block;
    position: absolute;
    background: darkred;
    width: 15px;
    height: 12px;
    left: 5px;
    bottom: 0;
    border-radius: 50%;
    transform: rotateX(36deg);
}
```

### 四肢

四肢基本都是椭圆形，利用上面的方法来处理一下，这里直接上代码。

```css
.arm{
    height: 55px;
    width: 25px;
    background: black;
    position: absolute;
    border-radius: 44%;
    transform: rotate(31deg);
    border: 1px solid black;
    z-index: -9;
}
.arm.left{
    width: 20px;
    left: 22px;
    bottom: 40px;
}
.arm.right{
    right: 25px;
    top: 15px;
    border-radius: 45% 45% 0 0;
    transform-origin: bottom;
}
.foot{
    height: 33px;
    width: 28px;
    background: black;
    position: absolute;
    bottom: 1px;
    z-index: -9;
}
.foot.left{
    left: 59px;
    border-radius: 0 0 23% 39%;
}
.foot.right{
    right: 55px;
    border-radius: 0 0 39% 23%;
}
```

到这里基本就完成了。接下来完善一些小东西。

### 爱心

仔细看右手是有一个爱心的。怎么画呢，想象一下，方形，一端给圆形弧度，一端不给。是不是就是一个水滴。水滴圆弧一方再用一个方形一角嵌入遮盖，形成心形的上半部缺口。

![border](/images/bingDwenDwen/heart.gif)

基本完成了。这里也可以利用伪元素。

```css
/* 水滴 */
.arm.right::after{
    content: '';
    display: block;
    width: 13px;
    height: 13px;
    background: darkred;
    position: absolute;
    left: 7px;
    top: 7px;
    border-radius: 50% 50% 0 50%;
    transform: rotate(56deg);
}
/* 嵌入水滴的元素，覆盖在水滴上方 */
.arm.right::before{
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: black;
    position: absolute;
    left: 11px;
    top: 1px;
    transform: rotate(56deg);
    z-index: 9;
}
```

### 内八

冰墩墩是内八脚，可以利用body的after来处理一下。

```css
.body::after{
    content: '';
    display: block;
    background: white;
    width: 20px;
    height: 22px;
    position: relative;
    left: 59px;
    top: 77px;
    border-radius: 50%;
    border-top: 3px solid black;
}
```

好了，完成！

![border](/images/bingDwenDwen/bdd.gif)

外壳，什么外壳，丢了！

对了，还有丢了帽子的雪容融。

![border](/images/bingDwenDwen/xrr.png)