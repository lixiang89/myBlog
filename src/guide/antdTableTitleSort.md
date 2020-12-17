---
title: 实现一个antd表头排序功能
date: 2020-10-23
sidebar: 'auto'
categories:
 - 前端
tags:
 - antd
 - 组件封装
---

## 前言

近日在使用antd的table组件时，发现使用的版本——3.10.0的排序功能，存在一定的问题。

> 官方已在后续版本修复。
> - 修复未指定排序的列头点击时也会触发排序的问题。[#12515](https://github.com/ant-design/ant-design/issues/12515)

但因种种原因只能自行解决，查阅文档后发现使用版本的`title`支持函数自定义，让自定义排序成为可能。同时满足需求提出的点击icon排序、icon以外恢复默认的功能。

## 分析需求

首先，分析需求：

- 在columns里添加字段`sort`来标识需要进行排序的列
- 定义`onSortChange`函数来处理排序变化
- 含有`sort`字段的列通过`title`的函数处理方式替换为自定义排序组件
- columns里的`title`直接传入自定义排序组件
- 考虑清空排序的场景，如带搜索功能的table，请求参数变化。

 ### 封装table组件

先来实现上面的需求，处理table，新建`tableComp`文件:

```javascript
import React, { useMemo } from 'react';
import { Table } from 'antd';
//自定义排序组件
import Sorter from './sorter'

export default ({
    columns,
    sortClear,
    onSortChange=()=>{},
    ...tableProps
})=>{
    
    // 处理父组件传入的columns的sort
    const cols=useMemo(()=>{
        return columns.map(col=>{
            if(col.sort){
                const {
                    title,
                    sort,
                    ...colProps
                }=col

                col={
                    ...colProps,
                    title:()=>(
                        <Sorter
                            title={title}
                            field={colProps.dataIndex}
                            onChange={onSortChange}
                            clear={sortClear} 
                        />
                    )
                }
            }
            return col
        })
    },[columns,sortClear])
    
    return (
        <Table 
            columns={cols}//使用处理过的columns来展示
            {...tableProps}
            pagination={false}
        />
    )
}

```

### 自定义排序组件`Sorter`

功能分析：

- 需两个icon，直接使用antd的`Icon`
- 点击相应icon，触发`onChange`事件，并传入`{field:'排序的字段',order:'正序——ascend、倒序——descend、默认'}`
- 需考虑清空排序的功能

```javascript
import React, { useState,useEffect } from 'react';
import {Icon} from 'antd'

import './sorter.css'

export default ({
    title,
    field,
    onChange=()=>{},
    clear
})=>{
    const [order,setOrder]=useState()

    //这里使用在多个元素上使用onClick并阻止冒泡的方式，也可以用一个事件然后判断触发的dom元素来处理
    const handleSortClick=(ord,e)=>{
        e.stopPropagation()
        if(order!==ord){
            setOrder(ord)
            onChange({field,order:ord})
        }
    }

    useEffect(()=>{
        if(clear){
            setOrder()
        }
    },[clear])

    // 最外面的click用于取消排序
    return (
        <div
            className="sorter"
            onClick={handleSortClick.bind(null,undefined)}
        >
            <div className="sorter_title">
                {typeof title==='function'?title():title}
            </div>
            <div className="sorter_icon">
                <Icon 
                    className={order==='ascend'&&'active'}
                    type="caret-up"
                    onClick={handleSortClick.bind(null,'ascend')}
                />
                <Icon 
                    className={order==='descend'&&'active'}
                    type="caret-down"
                    onClick={handleSortClick.bind(null,'descend')}
                />
            </div>
        </div>
    )
}

```

样式修饰：

```css
.sorter{
    display: flex;
    align-items: center;
}

.sorter_title{
    white-space: nowrap;
}

.sorter_icon{
    display: flex;
    flex-direction: column;
    color: #dfdfdf;
    max-width: 100%;
    min-width: 12px;
    overflow: hidden;
    margin-left: 5px;
}

.anticon{
    transition: 0.3s;
    cursor: pointer;
}

.anticon.active{
    color: #000ab2;
}
```

到这里，功能基本已经实现了，但需求是单列排序。

### 单列排序

那么在进行排序列切换的时候，就要清空其他列的排序效果：

- 在table中记录当前的排序列`sortField`
- 只在列名与`sortField`相同的排序组件里展示排序效果

```javascript
export default ({
    columns,
    sortClear,
    onSortChange=()=>{},
    ...tableProps
})=>{
    // 排序列
    const [sortField,setSortField]=useState()
    
    // 取出change函数记录当前排序列
    const handleSortChange=useCallback((sortData={})=>{
        setSortField(sortData.field)
        onSortChange(sortData)
    },[onSortChange])
    
    const cols=useMemo(()=>{
        return columns.map(col=>{
            if(col.sort){
                const {
                    title,
                    sort,
                    ...colProps
                }=col

                col={
                    ...colProps,
                    title:()=>(
                        <Sorter
                            title={title}
                            field={colProps.dataIndex}
                            onChange={handleSortChange}
                            // 与当前列不同时清除
                            clear={sortClear || sortField!==colProps.dataIndex} 
                        />
                    )
                }
            }
            return col
        })
    },[columns, handleSortChange, sortClear, sortField])
    
    return (
        <Table 
            columns={cols}
            {...tableProps}
            pagination={false}
        />
    )
}

```

至此，已完成需求提出的各项问题。

### 效果

最后，看一下效果

![自定义排序效果](/myBlog/images/antdTableTitleSort/show.gif)
