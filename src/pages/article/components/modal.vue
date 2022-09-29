<template>
  <div>
    <a-modal v-model="visible" :width="800" :title="articleId? '修改':'新增'" @ok="onSubmit" @cancel="resetForm">
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
        <editor v-model="form.content" @change="change" :value ="richContent"></editor>
       </a-form-model-item>
     </a-form-model>
    </a-modal>
  </div>
</template>
<script>
 import { labelQuery } from '@/services/label'
 import { articleAdd, articleUpdate, articleQueryOne } from '@/services/article'
 import Editor from './Editor.vue'
export default {
  data() {
    return {
      visible: false,
      articleId:'',
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
      labelList:[],
      richContent:'',
      form: {
        title: '',
        coverImg:"",
        labelId: undefined,
        content: null
      },
      rules:{
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
        ],
        coverImg: [
          { required: true, message: '请输入文章封面图', trigger: 'blur' },
        ],
        labelId: [
          { required: true, message: '请输入文章标签', trigger: 'change' },
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
        ],
      }
    }
  },
  components:{
    Editor
  },
  created() {
    this.getLabel()
  },
  methods:{
   async showModal(val) {
      if(val) {
        const {id} = val
        this.articleId = id
        const result = await articleQueryOne({id})
        const {data} = result
        if(data.code === 200) {
          const currentData = data.data[0]
          this.form.title = currentData.title
          this.form.coverImg = currentData.cover_img
          this.form.labelId = currentData.label_id
          const contentData = currentData.content
          this.form.content = contentData
          this.richContent = contentData
        }
      }else {
        this.articleId= ''
      }
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
      this.$refs.ruleForm.validate( async valid => {
        if (valid) {
          let result 
          console.log(this.form.content)
          this.articleId ? result = await articleUpdate(Object.assign({id:this.articleId}, this.form)) :result = await articleAdd(this.form)
          if(result.status === 200) {
            this.$message.success('操作成功')
          }else{
            this.$message.error('操作失败')
          }
          this.resetForm()
          this.$emit('fetchArticle')
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.form = {
        content :null,
        title:'',
        coverImg:'',
        labelId:'',
      }
      this.richContent = ''
      this.visible = false
    },
    // 获取内容
    change(value) {
      this.form.content = value
      console.log(value)
    }
  }
};
</script>
