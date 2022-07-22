<template>
  <div class='message'>
    <a-table 
    bordered  
    :dataSource="dataSource" 
    :columns="columns" 
    :pagination="pagination"  
    :loading="loading"
    @change="handleTableChange"
    >
     <template slot="operation" slot-scope="text, record">
      <a-space>
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
  </div>
</template>

<script>
 import { parseTime } from '@/utils/help'
  import { messageQuery, messageDelete } from '@/services/message'
  export default {
    name:'Message',
    data() {
      return {
        params:{
          pageNum:1,
          pageSize:10
        },
        loading:false,
        pagination:{
          pageSize:10,
          pageSizeOptions:['10', '20', '30', '40'],
          showSizeChanger: true,
          total:0,
          showTotal:total=>`共${total}条数据`,
        },
        columns:[
          {
            title: 'QQ',
            dataIndex: 'qq',
            key: 'qq',
            align:'center'
          },
          {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
            align:'center'
          },
          {
            title: '留言',
            dataIndex: 'message',
            key: 'message',
            align:'center'
          },
          {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align:'center'
          },
          {
            title: '操作',
            key: 'operation',
            dataIndex: 'operation',
            align:'center',
            scopedSlots: { customRender: 'operation' },
          },
        ],
        dataSource:[],
      }
    },
    created() {
      this.fetchMessage()
    },
    methods:{
      // 查询
     async fetchMessage() {
      this.loading = true
      const result = await messageQuery(this.params)
      const { data } = result
      if(data.code === 200) {
        this.loading = false
       const tableData = data.data
        this.dataSource = tableData.map(item => (
          {
            id:item.id,
            key:item.id,
            qq:item.qq,
            nickname:item.nickname,
            message:item.message,
            create_time:parseTime(item.create_time)
          }
        ))
        //总数
        this.pagination.total = data.total
      }else {
        this.$message.error(data.message)
        this.loading = false
      }
     },
      // 删除
      async confirm(row) {
        const {id} = row
        const result = await messageDelete({id})
        const data = result.data
        if(data.code === 200) {
           this.$message.success(data.message);
        }else {
           this.$message.error(data.message);
        }
        this.fetchMessage()
      },
      // 取消
      cancel() {
        this.$message.error('已取消');
      },
      // 分页器
      handleTableChange(pagination) {
        // this.pagination.current = pagination.current,
        // this.pagination.pageSize = pagination.pageSize
        this.params.pageNum = pagination.current
        this.params.pageSize = pagination.pageSize
        this.fetchMessage()
      }
    }
  }
</script>