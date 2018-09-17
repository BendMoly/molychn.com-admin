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
        :picker-options="dateRange"
        format="yyyy / MM / dd "
        value-format="timestamp">
      </el-date-picker>
      <el-input v-model="keys" class="content-keys" placeholder="输入标题关键字"></el-input>
      <el-button type="primary" @click="searchData">给朕找来</el-button>
      <el-button type="warning" @click="searchClean">不用侍寝</el-button>
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
            {{ scope.row.date | timeFormat }}
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
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  mounted () {
    this.fetchData()
  },
  data () {
    return {
      date: null,
      keys: '',
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
      articles: [],
      currentPage: 1,
      count: 0,
      pageSize: 10
    }
  },
  methods: {
    // 翻页
    handleCurrentChange (val) {
      this.currentPage = val
      this.fetchData()
    },
    // 查找按钮
    searchData () {
      if (this.date || this.keys) {
        this.reset()
        this.fetchData()
      }
    },
    searchClean () {
      this.date = null
      this.keys = ''
      this.fetchData()
    },
    handleEdit (item) {
      this.$router.push({path: '/release', query: {id: item._id}})
    },
    handleDelete (item) {
      this.$confirm(`确定删除'${item._id}'？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/articles/${item._id}`).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '珍惜每一篇文章'
        })
      })
    },
    // 获取列表
    fetchData () {
      let normalizeData = {
        current: this.currentPage,
        pagesize: Number(this.pageSize)
      }
      if (this.date) {
        normalizeData['start'] = this.date[0]
        normalizeData['end'] = this.date[1]
      }
      if (this.keys) {
        normalizeData['keys'] = this.keys
      }
      this.$http.get('/articles', normalizeData).then(res => {
        console.log(res)
        this.articles = res.data.items
        this.currentPage = res.data.current
        this.count = res.data.count
      })
    },
    reset () {
      this.currentPage = 1
      this.count = 0
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
