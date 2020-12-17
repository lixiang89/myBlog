---
title: elementUI Table组件封装
# date: 2020-12-16
# categories:
#  - 前端
# tags:
#  - elementUI
#  - vue
#  - 组件封装
publish: false
---

## 前言

elementUI的table组件，当数据较多时，每次都要写大量的HTML，而我个人更喜欢写js，同时也可以更好的应对列项增减变化的情况，所以呢就封装了。使用只需传参即可，类antd的table用法吧，传columns。

## 开始

```html
<template>
    <div class="yshTable">
        <div v-if="$scopedSlots.tableTitle" class="yshTableTitle">
            <slot name="tableTitle"></slot>
        </div>
        <el-table
            v-loading="loading"
            header-row-class-name="yshTableHeaderRow"
            header-cell-class-name="yshTableHeaderCell"
            @sort-change="sortChange"
            @filter-change="filterChange"
            v-bind="$attrs"
            v-on="$listeners"
        >
            <template #append>
                <slot name="append"></slot>
            </template>
            <template #empty>
                // 这里可以放置一个公共的无数据时的展示，也可以用slot
                <slot name="empty"></slot>
            </template>
            <el-table-column
                v-for="column in columns"
                :key="column.prop"
                :column-key="column.columnKey||column.prop"
                :type="column.type"
                :index="column.index"
                :prop="column.prop"
                :label="column.label"
                :formatter="handleFormat(column)"
                :align="column.align"
                :header-align="column.headerAlign||column.align"
                :width="column.width"
                :min-width="column.minWidth"
                :min-height="column.minHeight"
                :sortable="column.sortable"
                :filters="column.filters"
                :fixed="column.fixed"
                :class-name="yshTableColumnCel `${column.className||''}`"
                :render-header="column.renderHeader"
                :show-overflow-tooltip="column.showOverflowTooltip"
            >
                <template v-if="$scopedSlots[`${column.prop}_header`]" #header="scope">
                    <slot :name="`${column.prop}_header`" :scope="scope"></slot>
                </template>
                <template v-if="$scopedSlots[column.prop]" #default="scope">
                    <slot :name="column.prop" :scope="scope"></slot>
                </template>
            </el-talbe-column>
            <div v-if="pageTotal" class="yshTablePagination">
                <el-pagination
                    background
                    :page-sizes="sizes"
                    :page-size="size"
                    :total="totla"
                    layout="slot,->,prev,pager,next,sizes,jumper"
                    :current-page="pageNum"
                    @size-change="pageSizeChange"
                    @current-change="currentPageChange"
                >
                    <template>
                        <span class="slot">
                            <span>共{{pageTotal}}条记录</span>
                            <span>第{{pageNum}}/{{totalPages||totalPage}}页</span>
                        </span>
                    </template>
                </el-pagination>
            </div>
        <el-table>
    </div>
</template>
```

```javascript
import {numberFormat} from './utils'
import {Component ,Emit ,Prop ,PropSync , Vue ,Watch} from 'vue-property-decorator'
import {Column,Formatter} from './interface'
@Component({
    name:'YshTable',
    inheritAttrs:false,
})
export default class extends Vue{
    @Prop(Array) private columns!: Column[]
    @Prop(Boolean) private loading!: boolean

    @Prop({type:Number,default:10}) private pageSize!: number
    @Prop(Number) private totalPages!: number

    @PropSync('pageSizes',{type:Array,defult:()=>[10,20,30]}) private sizes!: number[]
    @PropSync('pageTotal',Number) private total!: number
    @PropSync('num',{type:Number,defult:1) private pageNum!: number

    private size:number=10

    private params:Param={
        pageNum:1,
        pageSize:this.size,
    }

    private get totalPage(){
        return Math.ceil(this.total/this.size)
    }

    private handleFormat(column:Column){
        const {formatter,formatNumber}=column
        if(formatter){
            return formatter
        }else{
            return ((r,c,v,i)=>{
                if(formatNumber){
                    return numberFormat(v,2)
                }else{
                    return [undefined,null,''].includes(v)?'-':v
                }
            }) as Formatter
        }
    }

    @Watch('pageSize',{immediate:true})
    private pageSizeChanged(newValue:number,oldValue:number){
        this.size=newValue
    }

    @Emit('onChange')
    private sortChange({prop,order}:{prop:string,order:string}){
        Object.assign(this.params,{
            sortFiled:prop,
            sortValue:order,
            from:'sortChange'
        })
        return this.params
    }

    @Emit('onChange')
    private filterChange(filters:any){
        const temp=Object.entries(filters)
        const [filterFiled,filterValue]=temp[0]
        Object.assign(this.params,{
            filterFiled,
            filterValue,
            from:'filterChange'
        })
        return this.params
    }

    @Emit('onChange')
    private currentPageChange(pageNum:number){
        this.pageNum=pageNum
        Object.assign(this.params,{
            pageNum,
            pageSize:this.size,
            from:'currentPageChange'
        })
    }

    private pageSizeChange(pageSize:number){
        this.size=pageSize
        Object.assign(this.params,{
            pageSize,
            from:'pageSizeChange'
        })
        if(this.pageNum>this.totalPage) return
        this.$emit('onChange',this.params)
    }

}
```