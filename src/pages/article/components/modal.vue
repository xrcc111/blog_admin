<template>
  <div>
    <a-modal v-model="visible" :width="720" :title="articleId? '修改':'新增'" @ok="onSubmit" @cancel="resetForm">
       <a-form-model
         ref="ruleForm"
         :model="form"
         :rules="rules"
         :label-col="labelCol"
         :wrapper-col="wrapperCol"
       >
       <a-form-model-item ref="title" label="文章标题" prop="title">
         <a-input
           v-model="form.title"
           @blur="() => {$refs.title.onFieldBlur()}"
         />
       </a-form-model-item>
       <a-form-model-item ref="coverImg" label="文章封面" prop="coverImg">
         <a-input
           v-model="form.coverImg"
           @blur="() => {$refs.coverImg.onFieldBlur()}"
         />
       </a-form-model-item>
       <a-form-model-item label="文章标签" prop="labelId">
         <a-select v-model="form.labelId" placeholder="请选择文章标签">
           <a-select-option v-for="(item, index) in labelList" :value="item.labelId" :key="index">
             {{item.labelName}}
           </a-select-option>
         </a-select>
       </a-form-model-item>
       <a-form-model-item label="文章内容" prop="content">
        <editor></editor>
       </a-form-model-item>
     </a-form-model>
    </a-modal>
  </div>
</template>
<script>
 import { labelQuery } from '@/services/label'
 import Editor from './Editor.vue'
export default {
  data() {
    return {
      visible: false,
      articleId:'',
      // labelCol: { span: 4 },
      // wrapperCol: { span: 14 },
      labelList:[],
      form: {
        title: '',
        coverImg:"",
        labelId: undefined,
      },
      rules:{}
    }
  },
  components:{
    Editor
  },
  created() {
    this.getLabel()
  },
  methods:{
    showModal() {
      this.visible = true
    },
    // 获取标签
    async getLabel () {
       const result = await labelQuery()
       const {data} = result
       if(data.code === 200) {
        this.labelList = data.data.map(item => ({labelName:item.label_name,labelId:item.label_id}))
       }else {
        this.$message.error(data.message)
       }
      },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.visible = false
    },
    // labelId, title, coverImg, content
  }
};
</script>
