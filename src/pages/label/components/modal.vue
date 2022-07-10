<template>
  <div>
    <a-modal v-model="visible" :title="labelId? '修改':'新增'" @ok="handleOk" @cancel="handleCancel">
       <a-form :form="form">
         <a-form-item
           label="标签名"
           :label-col="formItemLayout.labelCol"
           :wrapper-col="formItemLayout.wrapperCol"
         >
           <a-input
             v-decorator="[
               'labelName',
               { rules: [{ required: true, message: '请输入标签名' }] },
             ]"
             placeholder="请输入标签名"
           />
         </a-form-item>
        </a-form>
      </a-modal>
  </div>
</template>
<script>
import {labelAdd, labelUpdate} from '@/services/label'
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};
export default {
  data() {
    return {
      visible: false,
      labelId:'',
      formItemLayout,
      form: this.$form.createForm(this, { name: 'label_form' }),
    }
  },
  methods: {
    showModal(val) {
      if(val) {
      const { labelId } = val
      this.labelId = labelId
      this.$nextTick(()=> {
        this.form.setFieldsValue({labelName:val.labelName})
      })
      }else{
        this.labelId = ''
      }
      this.visible = true
    },
    handleOk() {
      this.form.validateFields( async (err,values) => {
        if (!err) {
          let result
          this.labelId ? result = await labelUpdate(Object.assign(values,{id:this.labelId})) : result = await labelAdd(values)
          if(result.status === 200) {
            this.$message.success('操作成功')
          }else{
            this.$message.error('操作失败')
          }
          this.visible = false;
          this.$emit('labelQuery')
          this.form.resetFields()// 清空表单数据
        }
      });
     
    },
    handleCancel() {
      this.form.resetFields();
      this.visible = false
    }
  },
};
</script>
