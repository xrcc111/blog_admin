<template>
  <div class='label'>
  <div class="pd-20">
    <a-button type="primary" @click="increase">新增</a-button>
  </div>
    <a-table bordered  :dataSource="dataSource" :columns="columns" :pagination="false"  :loading="loading">
     <template slot="type" slot-scope="text, record">
      <a-button type="primary" v-if="record.type === 1">正常</a-button>
      <a-button type="danger" v-else>失联</a-button>
     </template>
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
  import {chainQuery, chainDelete } from '@/services/link'
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
            title: '网站名称',
            dataIndex: 'linkName',
            key: 'linkName',
            align:'center'
          },
          {
            title: '网站标签',
            dataIndex: 'linkTag',
            key: 'linkTag',
            align:'center'
          },
          {
            title: '网站链接',
            dataIndex: 'webLink',
            key: 'webLink',
            align:'center'
          },
          {
            title: '头像',
            dataIndex: 'profile',
            key: 'profile',
            align:'center'
          },
          {
            title: '状态',
            key: 'type',
            dataIndex: 'type',
            align:'center',
            scopedSlots: { customRender: 'type' },
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
       const result = await chainQuery()
       const {data} = result
       if(data.code === 200) {
        this.loading = false
        this.dataSource = data.data.map(item => (
          {
          key:item.id,
          id:item.id,
          linkName:item.link_name, // 网站名称
          linkTag:item.link_tag, // 网站标签
          webLink:item.web_link, // 网站链接
          profile:item.profile, // 头像
          type: item.type, // 状态
          createTime:parseTime(item.create_time) // 创建时间
          }
          ))
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
        const {id} = row
        console.log(row);
        const result = await chainDelete({id:id})
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
