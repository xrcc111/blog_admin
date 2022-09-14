<template>
  <div>
    <a-modal v-model="visible" :title=" id ? '修改':'新增'" @ok="handleOk" @cancel="handleCancel">
       <a-form :form="form">
         <a-form-item
           label="网站名称"
           :label-col="formItemLayout.labelCol"
           :wrapper-col="formItemLayout.wrapperCol"
         >
           <a-input
             v-decorator="[
               'linkName',
               { rules: [{ required: true, message: '请输入网站名称' }] },
             ]"
             placeholder="请输入网站名称"
           />
         </a-form-item>
         <a-form-item
           label="网站标签"
           :label-col="formItemLayout.labelCol"
           :wrapper-col="formItemLayout.wrapperCol"
         >
           <a-input
             v-decorator="[
               'linkTag',
               { rules: [{ required: true, message: '请输入网站标签' }] },
             ]"
             placeholder="请输入网站标签"
           />
         </a-form-item>
         <a-form-item
           label="网站链接"
           :label-col="formItemLayout.labelCol"
           :wrapper-col="formItemLayout.wrapperCol"
         >
           <a-input
             v-decorator="['webLink', { rules: [{ required: true, message: '请输入网站链接' }] }]"
             placeholder="请输入网站链接"
           />
         </a-form-item>
         <a-form-item
           label="头像"
           :label-col="formItemLayout.labelCol"
           :wrapper-col="formItemLayout.wrapperCol"
         >
           <a-input
             v-decorator="[
               'profile',
               { rules: [{ required: true, message: '请输入头像' }] },
             ]"
             placeholder="请输入头像"
           />
         </a-form-item>
         <a-form-item
           label="状态"
           :label-col="formItemLayout.labelCol"
           :wrapper-col="formItemLayout.wrapperCol"
         >
           <a-select initialValue="1" style="width: 160px"  v-decorator="[
          'type',
          { rules: [{ required: true, message: '请选择' }] },
        ]"
        placeholder="请选择">
              <a-select-option :value="1">
                正常
              </a-select-option>
              <a-select-option :value="0">
                失联
              </a-select-option>
           </a-select>
         </a-form-item>
        </a-form>
      </a-modal>
  </div>
</template>
<script>
import {chainUpdate, chainAdd} from '@/services/link'
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};
export default {
  data() {
    return {
      visible: false,
      id:'',
      formItemLayout,
      form: this.$form.createForm(this, { name: 'label_form' }),
    }
  },
  methods: {
    showModal(val) {
      if(val) {
      const { id } = val
      this.id = id
      this.$nextTick(()=> {
        this.form.setFieldsValue({
           linkName:val.linkName,
           linkTag:val.linkTag, 
           webLink:val.webLink,
           profile:val.profile, 
           type:val.type
          })
      })
      }else{
        this.id = ''
      }
      this.visible = true
    },
    handleOk() {
      this.form.validateFields( async (err,values) => {
        console.log(values);        
        if (!err) {
          let result
          this.id ? result = await chainUpdate(Object.assign(values,{id:this.id})) : result = await chainAdd(values)
          console.log(result)
          if(result.data.code === 200) {
            this.$message.success('操作成功')
          }else{
            this.$message.error('操作失败')
          }
          this.$emit('labelQuery')
          this.handleCancel()// 清空表单数据
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
