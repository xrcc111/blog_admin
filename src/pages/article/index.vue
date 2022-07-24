<template>
  <div class='article'>
    <div class="pd-20">
      <a-button type="primary" @click="increase">新增</a-button>
    </div>
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
        <a-button  @click="updateArticle(record)" type="primary">
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
    <Modal ref="modal" @fetchArticle="fetchArticle"/>
  </div>
</template>


<script>
import { articleQuery, articleDelete } from '@/services/article'
import { parseTime } from '@/utils/help'
import Modal from './components/modal.vue'
  export default {
    name:'Article',
    components:{
      Modal
    },
    data () {
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
       dataSource:[],
       columns:[
          {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            align:'center'
          },
          {
            title: '标签名',
            dataIndex: 'labelName',
            key: 'labelName',
            align:'center'
          },
          {
            title: '封面图',
            dataIndex: 'coverImg',
            key: 'coverImg',
            align:'center'
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align:'center'
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
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
      };
    },
    created() {
      this.fetchArticle()
    },
    methods: {
      // 文章查询
      async fetchArticle() {
        this.loading = true
        const result = await articleQuery(this.params)
        const { data } = result
        if(data.code === 200) {
          this.loading = false
          const tableData = data.data
          this.dataSource = tableData.map(item => ({
            id:item.id,
            key:item.id,
            title:item.title,
            labelName:item.label_name,
            coverImg:item.cover_img,
            updateTime:parseTime(item.update_time),
            createTime:parseTime(item.create_time)
          }))
          //总数
          this.pagination.total = data.total
        }else {
          this.$message.error(data.message)
          this.loading = false
        }
      },
      // 分页器
      handleTableChange(pagination) {
        this.params.pageNum = pagination.current
        this.params.pageSize = pagination.pageSize
        this.fetchArticle()
      },
      increase() {
        this.$refs.modal.showModal()
      },
      updateArticle(value) {
        this.$refs.modal.showModal(value)
      },
      // 取消
      cancel() {
        this.$message.error('已取消');
      },
      // 删除
      async confirm(row) {
        const {id} = row
        const result = await articleDelete({id})
        const data = result.data
        if(data.code === 200) {
           this.$message.success(data.message);
        }else {
           this.$message.error(data.message);
        }
        this.fetchArticle()
      },
    },
  }
</script>

<style lang='less' scoped>

</style>