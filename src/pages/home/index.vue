<template>
  <div class='home'>
    <div class="about-my" v-html="content"></div>
  </div>
</template>

<script>
import { userQuery } from '@/services/my'
import '@wangeditor/editor/dist/css/style.css'
  export default {
    components: {},
    name:'Home',
    data () {
      return {
        content:''
      };
    },
    created() {
      this._userQuery()
    },
    methods: {
     async _userQuery() {
        const result = await userQuery()
        const { data } = result
        if (data.code === 200) {
          this.content = data.data[0].content
        }else{
          this.$message.error(data.message)
        }
      }
    },
  }
</script>