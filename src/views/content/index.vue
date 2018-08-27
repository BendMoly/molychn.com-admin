<template>
  <section class="content-container">
    <div class="content-searchspace">
      <el-date-picker
        v-model="date"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :editable="false"
        :picker-options="dateRange">
      </el-date-picker>
      <el-input class="content-keys" placeholder="输入标题关键字"></el-input>
      <el-button type="primary">给朕找来</el-button>
    </div>
    <div class="content-list">
      <el-table
      :data="articles"
      style="width: 100%"
      >
        <el-table-column
        label="日期"
        width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
        label="标题"
        >
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column
        label="操作"
        width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      date: '',
      dateRange: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      articles: [{
        date: '2018-08-23',
        title: 'new blog is coming'
      }],
      currentPage: 1
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-searchspace{
  margin-bottom: 20px;
}
.content-keys{
  width: 200px;
}
.el-pagination{
  margin-top: 20px;
  text-align: center;
}
</style>
