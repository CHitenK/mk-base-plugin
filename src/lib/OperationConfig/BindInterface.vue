<template>
  <div class="addInterface">
    <div style="height: 86%">
      <el-transfer v-model="unInterfaceList" filterable :titles="['接口列表', '已选接口']" :data="interfaceList"></el-transfer>
    </div>
    <div class="center" style="padding-top: 20px">
      <el-button type="primary" style="width: 200px" @click="handleBing">提交绑定</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch, toRefs, inject } from 'vue'
import { ElMessage, ElMessageBox  } from 'element-plus'
import { getResources, getBangResources, bindResources } from './../../api/OperationConfig'
export default defineComponent({
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const headers = inject('headers')
    const pageData = reactive({
      unInterfaceList: [], // 已选接口
      interfaceList: [], // 接口列表
      form: {
        // 接口提交信息
        page: 1, // 页码
        size: 1000, // 每页大小
      }
    })
    let interFacelist = []
    const init = async () => { 
      try {
        const res = await getBangResources(props.id, headers)
        pageData.unInterfaceList = res.data.map(item => item.id)
        if (interFacelist.length < 1) {
          const lres = await getResources({ page: 1, size: 10000 }, headers)
          interFacelist = lres.data.data
        }
        const ids = pageData.unInterfaceList.map(item => item.id)
        const arr = []
        interFacelist.forEach(item => {
          if (!ids.includes(item.id)) {
            item.key = item.id || -1;
            item.label = item.name + ':' + item.url
            arr.push(item)
          }
        })
        pageData.interfaceList = arr
      } catch (error) {
        console.log(12, error)
      }
    }
    const handleBing = async () => {
      try {
        await bindResources(props.id, pageData.unInterfaceList, headers )
        ElMessage.success('操作成功')
        init()
      } catch (error) {
        console.log(error)
      }
    }
    watch(() => props.id, (val) => {
      if (val) init()
    })
    onMounted(() => {
      if(props.id) init()
    })
    return {
      ...toRefs(pageData),
      handleBing
    }
  }
})
</script>
<style lang="scss" scoped>
.addInterface {
  height: 68vh;
  margin-top: -30px;
  padding-top: 30px;
  border-top: solid 1px #eaeaea;
}
.center{
  text-align: center;
}
.addInterface {
  &::v-deep(.el-transfer) {
    height: 100%;
    .el-transfer-panel{
      width: 40%;
      height: 100%;
    }
    .el-checkbox-group{
      height: 66vh;
    }
  }
}
</style>
