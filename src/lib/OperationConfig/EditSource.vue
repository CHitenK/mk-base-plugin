<template>
  <div class="dialog-bx">
      <el-form ref="seveform" :rules="rules" :model="editForm" label-width="140px">
      <el-form-item class="form-item" label="功能名称：" prop="name">
        <el-input v-model="editForm.name" style="width: 50%;" clearable></el-input>
        <span class="tip">同一页面资源功能名称不能重名</span>
      </el-form-item>
      <el-form-item class="form-item" label="功能编码：" prop="code">
        <el-input v-model="editForm.code" style="width: 50%;" clearable></el-input>
        <span class="tip">功能编码不能重复</span>
      </el-form-item>
      <el-form-item class="form-item" label="功能说明：">
        <el-input v-model="editForm.description" style="width: 50%;" clearable></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="启用状态：">
        <el-switch v-model="editForm.status"></el-switch>
        <span class="tip">启用后将在前端显示，否则隐藏</span>
      </el-form-item>
      <el-form-item class="form-item" label="排序：" prop="sortNum">
        <el-input-number v-model="editForm.sortNum" style="width: 30%;" clearable></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm">{{type === 'add' ? '新增资源' : '编辑资源' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
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
        id: props.targetData.id || '',
        name: props.targetData.name || '',
        code: props.targetData.code || '',
        description: props.targetData.description || '',
        sortNum: props.targetData.sortNum || 1,
        status: props.targetData.status === 1, // status 1 显示 0 隐藏
        type: "operation",
        parentId: props.targetData.parentId,
        platform: props.platform,
      }
    }
    const editForm = reactive(setDefault())
    const rules = reactive({
      name: { required: true, message: '请输入功能名称', trigger: 'blur' },
      code: { required: true, message: '请输入功能编码', trigger: 'blur' },
      sortNum: { required: true, message: '请输入排序', trigger: 'blur' },
    })
    // 提交保存
    const save = async () => {
      try {
        editForm.status = editForm.status ? 1 : 0 // 默认不启用
        if (props.type === 'add') { // 新增
          await addMenus(editForm, headers)
          ElMessage.success('操作成功')
          emit('saveSuccess')
        } else {
          await updateMenus(editForm, headers)
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
        ElMessageBox.confirm('确认提交此次操作数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          save()
        })
      })
    }
    onMounted(() => {
      // console.log(seveform)
    })
    return {
      editForm,
      rules,
      confirm,
      seveform
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