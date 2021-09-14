# zg-base-plugin

基础库

## 下载依赖

```
npm i
```

## 启动

```
npm run dev
```

## 打包pack
```
npm run build:lib
```

## 外部安装
```
npm i --save zg-base-plugin
```
# 开始使用

然后在你的代码中写入下面的代码

```
import {InterFaceList, ResourceAllocation} from "zg-base-plugin"
```

就可以使用相关的组件了。

## 组件说明

代码示例：

```
<template>
  <div>
    <InterFaceList></InterFaceList>
  </div>
</template>
<script>
import {Button, Tabs, Tab, Switch, Dialog, openDialog} from "vv-ui-plus"
export default {
  components: {Button}
}
</script>
```

下一节：[基础组件使用文档](/useDoc/doc1.md)