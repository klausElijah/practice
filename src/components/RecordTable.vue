<template>
    <div>
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
      >
        <span slot="customTitle">日期</span>
        <span slot="operation">
          <a-popconfirm
            v-if="data.length"
            title="确定删除吗?"
            @confirm="onDelete(data[0].key)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
</template>

<script>
/*
这个文件主要是以表格的形式显示所有添加的记录数据，并提供针对单条记录的删除功能，
直接从store中获取当前所有的记录数据
删除数据的时候，也存储到store中
ant design ui可以参考： https://1x.antdv.com/docs/vue/introduce-cn/
*/
import { mapState } from 'vuex'
export default {
  name: 'RecordTable',
  data () {
    return {
      pagination: {
        total: 0,
        pageSize: 5,
        showTotal: total => `共有${total}条数据`
      },
      columns: [
        {
          dataIndex: 'date',
          key: 'date',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'date' }
        },
        {
          title: '类别',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '小时数',
          dataIndex: 'hour',
          key: 'hour'
        },
        {
          title: '说明',
          dataIndex: 'desc',
          key: 'desc'
        },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: []
    }
  },
  computed: {
    ...mapState(['dayList'])
  },
  watch: {
    dayList () {
      this.data = this.dayList
      localStorage.setItem('dayTime', JSON.stringify(this.dayList))
    }
  },
  created () {
    this.$store.commit('TO_VUX', JSON.parse(localStorage.getItem('dayTime')))
  },
  methods: {
    onDelete (key) {
      this.$store.commit('TO_VUX', this.dayList.filter(item => item.key !== key))
    }
  }
}
</script>

<style>

</style>
