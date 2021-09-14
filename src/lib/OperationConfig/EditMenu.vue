<template>
  <el-form ref="seveform" :rules="rules" :model="editForm" label-width="140px">
    <el-form-item class="form-item" label="页面名称：" prop="name">
      <el-input v-model="editForm.name" style="width: 50%;" clearable placeholder="请输入" maxlength="8"></el-input>
      <span class="tip">不多于8个汉字</span>
    </el-form-item>
    <el-form-item class="form-item" label="描述：">
      <el-input v-model="editForm.description" style="width: 50%;" clearable placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item class="form-item" label="路由地址：" prop="url">
      <el-input v-model="editForm.url" style="width: 50%;" clearable placeholder="/xxxxx"></el-input>
      <span class="tip">路由为空，则不跳转</span>
    </el-form-item>
    <el-form-item class="form-item" label="重定向：">
      <el-input v-model="editForm.redirectUrl" style="width: 50%;" clearable placeholder="/xxxxx"></el-input>
    </el-form-item>
    <el-form-item class="form-item" label="上级菜单：">
      <span v-if="editForm.parentName" >{{editForm.parentName}}</span>
      <el-cascader :options="menuList" :props="defaultProps" v-model="editForm.parentId" placeholder="请选择" style="width: 50%" v-else-if="type==='edit'"></el-cascader>
    </el-form-item>
    <el-form-item class="form-item" label="页面类型：">
      <el-radio-group v-model="editForm.type">
        <el-radio label="menu">菜单项</el-radio>
        <el-radio label="page">页面资源</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="form-item" label="icon图标：">
      <el-input v-model="editForm.iconUrl" style="width: 50%;" clearable placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item class="form-item" label="启动状态：" v-if="type==='edit'">
      <el-switch v-model="editForm.status"></el-switch>
      <span class="tip">启用后将在前端显示，否则隐藏</span>
    </el-form-item>
    <el-form-item class="form-item" label="排序：" prop="sortNum">
      <el-input-number v-model="editForm.sortNum" style="width: 200px;" :min="1" :max="100"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirm">确认{{type === 'add' ? '新增' : '修改'}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch, toRefs, inject } from 'vue'
import { ElMessage, ElMessageBox  } from 'element-plus'
import { addMenus, updateMenus } from './../../api/OperationConfig'
export default defineComponent({
  props: {
    type: {
      type: String,
      default: '' // edit 编辑 add 新增
    },
    platform: {
      type: String,
      default: ''
    },
    targetData: {
      type: Object,
      default: () => {}
    },
    menuList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const seveform = ref()
    const headers = inject('headers')
    const setDefault = () => {
      return {
        id: '',
        name: '',
        redirectUrl: '',
        url: '',
        type: 'menu', // 菜单类型 菜单项：menu，页面资源：page, 操作项：operation
        sortNum: 1,
        iconUrl: '',
        parentId: 0,
        platform: props.platform,
        description: '',
        parentName: '',
        status: false // status 1 显示 0 隐藏
      }
    }
    let editForm = reactive(setDefault())
    const defaultProps = reactive({
      value: 'id',
      label: 'name',
      checkStrictly: true
    })
    const rules = reactive({
      name: { required: true, message: '请输入页面名称', trigger: 'blur' },
      url: { required: true, message: '请输入路由地址', trigger: 'blur' },
      sortNum: { required: true, message: '请输入排序', trigger: 'blur' },
    })
    watch(() => props.targetData, (val: any = {}) => {
      if (val) {
        if (props.type === 'add') {
          const { parentId, parentName } = val
          editForm.parentId = parentId || 0
          editForm.parentName = parentId ? parentName : '根节点（顶级菜单）'
          editForm.name = ''
          editForm.url = ''
          editForm.redirectUrl = ''
          editForm.iconUrl = ''
          editForm.description = ''
          editForm.type = 'menu'
          editForm.sortNum = 1
        } else { // 编辑
          const { name = '', url = '', type = 'menu', parentId, iconUrl = '', id, sortNum, status, redirectUrl, parentName, description = ''  } = val
          editForm.parentId = parentId
          editForm.parentName = parentId ? '' : '根节点（顶级菜单）'
          editForm.name = name
          editForm.url = url
          editForm.description = description
          editForm.redirectUrl = redirectUrl
          editForm.iconUrl = iconUrl
          editForm.type = type
          editForm.sortNum = sortNum
          editForm.id = id
          editForm.status = status === 1
        }
        
      }
    }, { deep: true, immediate: true })
    // 提交保存
    const save = async () => {
      try {
        editForm.platform = props.platform
        if (props.type === 'add') { // 新增
          editForm.status = 0 // 默认不启用
          await addMenus(editForm, headers)
          ElMessage.success('操作成功')
          emit('saveSuccess')
        } else {
          editForm.parentId = Array.isArray(editForm.parentId) ? editForm.parentId[editForm.parentId.length - 1] : editForm.parentId // 特殊处理
          await updateMenus({ ...editForm, status: editForm.status ? 1 : 0 }, headers)
          ElMessage.success('操作成功')
          emit('saveSuccess')
        }
      } catch (error) {
        console.log(error)
      }
    }
    // 确认保存
    const confirm = () => {
      seveform.value.validate().then(valid => {
        if (!valid) return false
        ElMessageBox.confirm('确认保存此次操作数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          save()
        })
      })
    }
    return {
      editForm,
      rules,
      confirm,
      seveform,
      defaultProps
    }
  }
})
</script>
<style scoped lang="scss">
.form-item{
  display: flex;
  align-items: center;
  .tip{
    margin-left: 20px;
    color: #999999;
  }
}
</style>
