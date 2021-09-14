<template>
  <div>
    <p class="title">接口管理</p>
    <div class="serach-bx">
      <div>
        <el-input placeholder="请输入内容" style="width: 330px;margin-right: 20px;" v-model="searchTxt" clearable> </el-input>
        <el-button type="primary" icon="el-icon-search" @click="pageNo = 1, getTableList()">搜索</el-button>
      </div>
      <!-- <div>
        <el-button type="success" @click="openEdit({})">+ 新增接口</el-button>
      </div> -->
    </div>
    <el-table :id="tableId" :data="tableData" border style="width: 100%" :height="height" v-loading="loading">
      <el-table-column label="序号" width="50" type="index"> </el-table-column>
      <el-table-column prop="name" label="接口名称"> </el-table-column>
      <el-table-column prop="systemName" label="业务系统"> </el-table-column>
      <el-table-column prop="description" label="接口描述"> </el-table-column>
      <el-table-column prop="url" label="接口地址"> </el-table-column>
      <el-table-column prop="method" label="请求方式" width="80"> </el-table-column>
      <el-table-column prop="name" label="最后编辑时间">
        <template #default="{row}">
          {{dayjs(row.modifiedAt).format('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-bx">
      <div class="pagination-left">
        总数：<span style="color:#e53125;">{{total}}</span>，当前页码： <span>{{pageNo}}</span>
      </div>
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, computed, toRefs, nextTick, provide } from 'vue'
import { getResources } from './../../api/OperationConfig'
import dayjs from 'dayjs'
export default defineComponent({
  props: {
    httpBaseUrl: {
      type: String,
      default: ''
    },
    headers: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    sessionStorage.setItem('http-url', props.httpBaseUrl)
    provide('headers', props.headers)
    const pageData = reactive({
      tableData: [],
      height: 200,
      total: 0,
      pageSize: 100,
      pageNo: 1,
      searchTxt: '',
      loading: false,
      editVisible: false,
      editType: 'add',
      editParms: {},
      tableId: 'table' + Date.now()
    })
    // 设置高度
    const getHeight = () => {
      nextTick(() => {
        const ref = document.getElementById(pageData.tableId)
        const wh = document.documentElement.clientHeight
        const data = ref.getBoundingClientRect()
        pageData.height = wh - data.top - 90
      })
    }
    // 获取表格数据
    const getTableList = async (page = 1) => {
      pageData.loading = true
      try {
        const res = await getResources({ size: pageData.pageSize, pageNo: pageData.pageNo, searchTxt: pageData.searchTxt }, props.headers)
        pageData.tableData = res.data.data
        pageData.pageNo =  res.data.pageNo
        pageData.total =  res.data.totalCount
      } catch (error) {
        console.log(error)
      }
      pageData.loading = false
    }
    const currentChange = (num) => {
      pageData.pageNo = num
      getTableList()
    }
    onMounted(() => {
      getHeight()
      getTableList()
    })
    return {
      currentChange,
      ...toRefs(pageData),
      getTableList,
      dayjs
    }
  }
})
</script>
<style scoped lang="scss">
.title{
  font-size: 20px;
}
.serach-bx{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.pagination-bx{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.pagination-left{
  font-size: 14px;
  span{
    font-weight: bold;
  }
}
</style>