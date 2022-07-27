<template>
    <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 300px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
            @onChange="handleOnChange"
            @onDestroyed="HandleOnDestroyed"
        />
    </div>
</template>
<script>
import Vue from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default Vue.extend({
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '',
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
        }
    },
    props:{
      value:{
        type:String,
        default:''
      },
      visible:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      value:{
        handler(val) {
          this.html = val
        }
      }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
            this.editor.setHtml(this.value) // 在此处做内容回显
        },
        handleOnChange(editor) {
         this.html = editor.getHtml()
         this.$emit('change', this.html)
        },
        HandleOnDestroyed(editor) {
            editor.destroy()
        }
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
        console.log('------destory',);
    }
})
</script>
