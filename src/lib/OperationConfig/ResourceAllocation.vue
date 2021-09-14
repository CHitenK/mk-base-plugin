<template>
  <div class="menu-set-bx">
    <p>菜单及页面资源配置</p>
    <div class="menu-set-content">
      <div class="content-left">
        <el-select v-model="platform" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in sourceList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
        <div class="back-stage">
          <span>后台管理</span>
          <span class="text-midlle">(拖拽完成菜单位置调整)</span>
          <el-button type="primary" size="mini" @click="openEdit({})">
            <span class="btn-add" >+</span>
          </el-button>
        </div>
        <div class="tree-bx zg-scroll">
          <el-tree
            :data="treeData"
            node-key="id"
            default-expand-all
            draggable
            ref="treeRef"
            :props="defaultProps"
            v-loading="loading"
            @node-drop="nodeDrop"
          >
          <template #default="{ node, data }">
           <div class="node-item" @click="handleNodeClick(node, data)">
             <span :class="{'act': editParms.id === data.id }">{{data.type === 'menu' ? '[菜单]' : '[页面]'}}{{data.name}}</span>
             <div>
                <el-button type="primary" size="mini" @click.stop="openEdit(data)">
                  <span class="btn-add" >+</span>
                </el-button >
                <el-button  @click.stop="deleMenu(data)" size="mini">
                  <span class="btn-add btn-jian">-</span>
                </el-button >
             </div>
           </div>
          </template>
          </el-tree>
        </div>
      </div>
      <div class="content-right">
        <el-tabs type="border-card" v-if="showCar">
          <el-tab-pane label="菜单/页面" >
            <div class="tab-content zg-scroll">
              <EditMenu :platform="platform" type="edit" :targetData="editParms" :menuList="treeData" @saveSuccess="getMenuList()"  />
            </div>
          </el-tab-pane>
          <el-tab-pane label="功能">
            <div class="tab-content zg-scroll tab-content-ot">
             <div class="table-title">
               <span>当前页面：{{editParms.name}}</span>
               <el-button type="primary" @click="openEffect({})">新增功能</el-button>
             </div>
              <el-table :data="tableData" border style="width: 100%" v-loading="tableLoading">
                <el-table-column prop="date" label="序号" width="50" type="index"> </el-table-column>
                <el-table-column prop="name" label="功能名称"></el-table-column>
                <el-table-column prop="code" label="功能编码"></el-table-column>
                <el-table-column prop="description" label="说明"></el-table-column>
                <el-table-column prop="name" label="启动状态" width="100">
                  <template #default="{row}">
                    {{row.status === 1 ? '启用' : '禁用'}}
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="180">
                  <template #default="{row}">
                    <el-button type="text"  size="mini" @click="openEffect(row)">编辑</el-button>
                    <el-button type="text"  size="mini" @click="deteRow(row)">
                      <span style="color: red;">删除</span>
                    </el-button>
                    <el-button type="text" size="mini" @click="openInterFace(row)"><span style="color: #666;">绑定接口</span></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="no-data-bx" v-else>请点击要编辑的菜单<spam v-show="false" @click="createCheckView(treeData)">执行</spam></div>
      </div>
    </div>
    <!-- 编辑菜单 -->
    <el-dialog
      title="新增菜单"
      v-model="dialogVisible"
      width="60%"
    >
     <div class="dialog-bx">
       <EditMenu type="add" :platform="platform" :targetData="addParms" @saveSuccess="dialogVisible = false, getMenuList()"  />
     </div>
    </el-dialog>
    <!-- 编辑菜单 end-->
    <!-- 编辑新功能 -->
    <el-dialog
      :title="editSourceType === 'edit' ? '编辑资源' : '新增资源'"
      v-model="effectVisible"
      width="60%"
    >
     <EditSource :platform="platform" v-if="effectVisible" :type="editSourceType" :targetData="editSourceParms"  @saveSuccess="effectVisible = false, getTableList()" />
    </el-dialog>
    <!-- 编辑新功能 end-->
    <!-- 接口绑定 -->
    <el-dialog
      :title="interTitle"
      v-model="interFaceVisible"
      width="70%"
    >
     <BindInterface :id="interFaceId" />
    </el-dialog>
    <!-- 接口绑定 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, computed, toRefs, provide } from 'vue'
import EditMenu from './EditMenu.vue'
import EditSource from './EditSource.vue'
import BindInterface from './BindInterface.vue'
import { getPlatforms, getMenus, deleMenus, updateParent, getMenuById, addMenus } from './../../api/OperationConfig'
import { ElMessage, ElMessageBox } from 'element-plus'
export default defineComponent({
  name: 'ResourceAllocation',
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
  components: {
    EditMenu,
    EditSource,
    BindInterface
  },
  setup(props) {
    sessionStorage.setItem('http-url', props.httpBaseUrl)
    provide('headers', props.headers)
    const treeRef = ref()
    const pageData = reactive({
      sourceList: [],
      dialogVisible: false,
      effectVisible: false,
      interFaceVisible: false,
      platform: '',
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      loading: false,
      tableLoading: false,
      addParms: {},
      editParms: {},
      editSourceParms: {},
      defaultChecked: [],
      editSourceType: 'edit',
      treeData: [],
      tableData: [],
      interFaceId: '',
      interTitle: ''
    })
    const showCar = computed(() => {
      return Object.keys(pageData.editParms).length > 0
    })
    // 打开新增菜单
    const openEdit = (data) => {
      pageData.dialogVisible = true
      pageData.addParms = { parentId: data.id, parentName: data.name }
    }
    // 新增/编辑 功能
    const openEffect = (data) => {
      pageData.editSourceType = data.id ? 'edit' : 'add'
      pageData.editSourceParms = { parentId: pageData.editParms.id, ...data }
      pageData.effectVisible = true
    }
    // 获取全部菜单
    const getMenuList = async () => {
      pageData.loading = true
      try {
        const res = await getMenus({ containOperation: false, platform: pageData.platform }, props.headers)
        pageData.treeData = res.data || []
      } catch (error) {
        console.log(error)
      }
      pageData.loading = false
    }
    // 初始
    const init = async () => {
      const res = await getPlatforms(props.headers)
      pageData.sourceList = res.data || []
      pageData.platform = pageData.sourceList[0] ? pageData.sourceList[0].code : ''
      getMenuList()
    }
    // 获取功能列表
    const getTableList = async () => {
      pageData.tableLoading = true
      try {
        const res = await getMenuById(pageData.editParms.id, props.headers)
        pageData.tableData = res.data || []
      } catch (error) {
        console.log(error)
      }
      pageData.tableLoading = false
    }
    // 点击树
    const handleNodeClick = (node, data) => {
      const { parent = {} } = node
      const { name } = parent.data
      pageData.editParms = {...data, parentName: name}
      treeRef.value.setCheckedKeys([ data.id ])
      getTableList()
    }
    // 删除
    const deleMenu = (data) => {
      ElMessageBox.confirm(`你是否删除 [ ${data.name} ] 菜单及菜单下的相关资源？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await deleMenus(data.id, props.headers)
        ElMessage.success('删除成功')
        // 删除了当前编辑的tree Node 执行
        if (data.id === pageData.editParms.id) {
          pageData.editParms = {}
        }
        getMenuList()
      })
    }
    // 获取树数据对应id下的子数据id
    const handleTreeData = (data, parentId) => {
      if (parentId === 0) {
        return data.map(item => item.id)
      } else { // 遍历树结构
        for (let i = 0; i < data.length; i++) {
          let element = data[i];
          if (element.id === parentId) {
            if (element.children) {
              return element.children.map((sub) => sub.id)
            }
          } else {
            if (element.children) {
              handleTreeData(element.children, parentId)
            }
          }
        }
      }
    }
    // 拖拽成功执行
    const nodeDrop = async (draggingNode, dropNode, type) => {
      const targetId = draggingNode.data.id
      const parentId = type === 'inner' ? dropNode.data.id : dropNode.data.parentId
      const sortedMenuIds = handleTreeData(pageData.treeData, parentId)
      await updateParent({ id: targetId, parentId, sortedMenuIds }, props.headers)
      getMenuList()
    }
    // 删除
    const deteRow = async (data) => {
      ElMessageBox.confirm(`你是否删除 [ ${data.name} ] 资源？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await deleMenus(data.id, props.headers)
        ElMessage.success('删除成功')
        getTableList()
      })
    }
    const openInterFace = async(data) => {
      pageData.interFaceId = data.id.toString()
      pageData.interTitle = data.name
      pageData.interFaceVisible = true
    }
    // 菜单配置统一生成查看功能(初始时执行) treeData
    const createCheckView = async (data) => {
      for(let i = 0; i < data.length; i++) {
        const item = data[i]
        const opt = {
          name: `${item.name}-查看`,
          code: `${item.url.replace('/', '')}_view`,
          description: `${item.name}页面查看权限，禁用则页面无法在系统查看, 勿删！！！`,
          sortNum: 1,
          status: 1, // status 1 显示 0 隐藏
          type: "operation",
          parentId: item.id,
          platform: pageData.platform,
        }
        if (item.type === 'page') {
          await addMenus(opt, props.headers)
        }
        if (item.children && item.children.length > 0) {
          createCheckView(item.children)
        }
      }
    }
    onMounted(() => {
      init()
      // setTimeout(() => {
      //   createCheckView(pageData.treeData)
      // }, 5000)
    })
    return {
      ...toRefs(pageData),
      openEffect,
      openEdit,
      getMenuList,
      handleNodeClick,
      deleMenu,
      nodeDrop,
      treeRef,
      showCar,
      getTableList,
      deteRow,
      openInterFace,
      createCheckView
    }
  }
})
</script>
<style scoped lang="scss">
.menu-set-bx{
  height: 100%;
  p{
    font-size: 20px;
  }
  .menu-set-content{
    margin-top: 20px;
    height: calc(100% - 50px);
    width: 100%;
    display: flex;
  }
  &::v-deep(.el-tabs) {
    height: 100%;
    background: linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%);
  }
}
.act{
  color: #1D66FB;
}
.content-left{
  width: 400px;
  height: 100%;
}
.back-stage{
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eaeaea;
  margin-top: 15px;
  box-sizing: border-box;
  padding: 15px;
  .text-midlle{
    font-size: 12px;
    color: #999999;
  }
  .btn-add{
    font-size: 15px;
  }
}
.tree-bx{
  width: 100%;
  height: calc(100% - 100px);
  border: solid 1px #eaeaea;
  padding-top: 10px;
  &::v-deep(.el-tree-node__content) {
    height: 46px;
  }
}
.zg-scroll{
  overflow: auto;
  &::-webkit-scrollbar-thumb:vertical {
    height: 10px;
    background-color: rgba(125, 125, 125, 0);
  }
  &:hover::-webkit-scrollbar-thumb:vertical {
    height: 10px;
    background-color: rgba(125, 125, 125, 0.3);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:horizontal {
    width: 8px;
    background-color: rgba(125, 125, 125, 0);
  }
  
  &:hover::-webkit-scrollbar-thumb:horizontal {
    width: 8px;
    background-color: rgba(125, 125, 125, 0.3);
    border-radius: 6px;
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    transition: all 1s;
  }
}
.content-right{
  flex: 1;
  height: 100%;
  margin-left: 30px;
}
.no-data-bx{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666666;
  font-size: 16px;
}
.tab-content{
  width: 100%;
  // height:  calc(100vh - 300px);
  padding-top: 60px;
}
.tab-content-ot{
  padding-left: 30px;
  padding-right: 30px;
}
.table-title{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.dialog-bx{
  margin-top: -30px;
  border-top: solid 1px #eaeaea;
  padding-top: 30px;
}
.form-item{
  display: flex;
  align-items: center;
  .tip{
    margin-left: 20px;
    color: #999999;
  }
}
.node-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  flex: 1;
  font-size: 14px;
}
.btn-jian{
  color: #666;
}
</style>