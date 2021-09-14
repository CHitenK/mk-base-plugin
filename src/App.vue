<template>
  <div class="page-bx">
    <div class="left">
      <div style="margin-bottom: 4px;">baseUrl:</div>
      <el-input placeholder="请输入内容" v-model.trim="baseUrl" clearable size="mini"> </el-input>
      <div style="margin: 10px 0 4px 0">Authorization:</div>
      <el-input placeholder="请输入内容" v-model.trim="headers.Authorization" clearable size="mini"> </el-input>
      <div style="margin: 10px 0 4px 0">x-zg-system:</div>
      <el-input placeholder="请输入内容" v-model.trim="headers.system" clearable size="mini"> </el-input>

      <div style="margin: 30px 0 4px 0">基础组件:</div>
      <div class="link" @click="goto('InterFaceList')">接口管理</div>
      <div class="link" @click="goto('ResourceAllocation')">资源配置</div>
    </div>
    <div class="right">
      <InterFaceList v-if="componentName === 'InterFaceList'" :httpBaseUrl="baseUrl" :headers="headers" ></InterFaceList>
      <ResourceAllocation v-if="componentName === 'ResourceAllocation'" :httpBaseUrl="baseUrl" :headers="headers" ></ResourceAllocation>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import InterFaceList from './lib/OperationConfig/InterFaceList.vue'
import ResourceAllocation from './lib/OperationConfig/ResourceAllocation.vue'
export default defineComponent({
  name: 'App',
  components: {
    InterFaceList,
    ResourceAllocation
  },
  setup() {
    const pageData = reactive({
      baseUrl: 'http://app-api.dev.zyun.link',
      headers: {
        Authorization: 'Bearer 77f8f656-5a49-44a3-80b1-aa246666bb32',
        system: 'kbvip',
      },
      componentName: 'InterFaceList'
    })
    const goto = (name) => {
      console.log(name)
      pageData.componentName = name
    }
    return {
      ...toRefs(pageData),
      goto
    }
  }
})
</script>
<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
<style lang="scss" scoped>
.page-bx{
  width: 100%;
  height: 100vh;
  display: flex;
}
.left{
  width: 330px;
  height: 100%;
  overflow: auto;
  border: solid 1px #eaeaee;
  background: #f0f1f5;
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 14px;
}
.right{
  overflow: auto;
  flex: 1;
  margin-left: 20px;
}
.link{
  cursor: pointer;
  margin-top: 10px;
  color: #666666;
}
</style>

