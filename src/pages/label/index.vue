<template>
  <div class=''>
    <a-table bordered  :dataSource="dataSource" :columns="columns" :pagination="false">
     <template slot="operation" slot-scope="text, record, index">
       <span  @click="updateLabel(record,index)">
         修改
       </span>
     </template>
    </a-table>
  </div>
</template>

<script>
  import {parseTime} from '@/utils/help'
  import {labelQuery} from '@/services/label'
  export default {
    components: {},
    name:'Label',
    data () {
      return {
        dataSource:[],
        columns:[
          {
            title: '标签值',
            dataIndex: 'labelId',
            key: 'labelId',
            align:'center'
          },
          {
            title: '标签名',
            dataIndex: 'labelName',
            key: 'labelName',
            align:'center'
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align:'center'
          },
          {
            title: '操作',
            key: 'operation',
            dataIndex: 'operation',
            align:'center',
            scopedSlots: { customRender: 'operation' },
          },
        ]
      };
    },
    created() {
      this.getLabel()
    },
    methods: {
     async getLabel () {
       const result = await labelQuery()
       const {data} = result
       if(data.code === 200) {
        this.dataSource = data.data.map(item => ({labelName:item.label_name,key:item.label_id,labelId:item.label_id, createTime:parseTime(item.create_time)}))
       }else {
        this.$message.error(data.message)
       }
      },
      // 修改标签
      updateLabel(row) {
        console.log(row);
      }
    },
  }
</script>