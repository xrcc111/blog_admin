<template>
  <div class='label'>
  <div class="pd-20">
    <a-button type="primary" @click="increase">新增</a-button>
  </div>
    <a-table bordered  :dataSource="dataSource" :columns="columns" :pagination="false"  :loading="loading">
     <template slot="operation" slot-scope="text, record, index">
      <a-space>
        <a-button  @click="updateLabel(record,index)" type="primary">
          修改
        </a-button>
        <a-popconfirm
          title="确定要删除当前所选数据?"
          ok-text="是"
          cancel-text="否"
          @confirm="confirm(record)"
          @cancel="cancel"
       >
          <a-button type="danger">
            删除
          </a-button>
        </a-popconfirm>
      </a-space>
     </template>
    </a-table>
    <modal ref="modal" @labelQuery="getLabel"></modal>
  </div>
</template>

<script>
  import {parseTime} from '@/utils/help'
  import {labelQuery, labelDelete } from '@/services/label'
  import Modal from './components/modal'
  export default {
    components: {Modal},
    name:'Label',
    data () {
      return {
        dataSource:[],
        loading:false,
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
      // 列表查询
     async getLabel () {
       this.loading = true
       const result = await labelQuery()
       const {data} = result
       if(data.code === 200) {
        this.loading = false
        this.dataSource = data.data.map(item => ({labelName:item.label_name,key:item.label_id,labelId:item.label_id, createTime:parseTime(item.create_time)}))
       }else {
        this.$message.error(data.message)
       }
      },
      // 修改标签
      updateLabel(row) {
        this.$refs.modal.showModal(row)
      },
      // 新增
      increase() {
        this.$refs.modal.showModal()
      },
      // 删除
      deleteLabel(row) {
        console.log(row);
      },
      async confirm(row) {
        const {labelId} = row
        console.log(row);
        const result = await labelDelete({id:labelId})
        const data = result.data
        if(data.code === 200) {
           this.$message.success(data.message);
        }else {
           this.$message.error(data.message);
        }
        this.getLabel()
      },
      cancel() {
        this.$message.error('已取消');
      },
    },
  }
</script>
<style lang="less" scoped>
.pd-20{
  padding: 10px 0;
}
.update{
  cursor: pointer;
}
</style>