<template>
  <section class="comment-container">
    <div class="comment-searchspace">
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
      <el-input class="comment-keys" placeholder="输入标题关键字"></el-input>
      <el-button type="primary">给朕找来</el-button>
    </div>
    <div class="comment-list">
      <el-table
      :data="comments"
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
        label="评论内容"
        >
          <template slot-scope="scope">
            {{ scope.row.content }}
          </template>
        </el-table-column>
        <el-table-column
        label="标题"
        >
          <template slot-scope="scope">
            {{ scope.row.source }}
          </template>
        </el-table-column>
        <el-table-column
        label="操作"
        width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.row.recall ? 'default' : 'primary'"
              @click="handleRecall(scope.$index, scope.row)">{{ scope.row.recall | recallFilter }}</el-button>
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
    <el-dialog title="回复" :visible.sync="dialogFormVisible">
      <div class="comment-recall area-scroll">{{ question }}</div>
      <el-form :model="commentsForm">
        <el-form-item>
          <el-input v-model="commentsForm.content" type="textarea" placeholder="回点什么为这只迷途的大猪蹄子解答解答吧" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogFormVisible = false">回 复</el-button>
      </div>
    </el-dialog>
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
      comments: [
        {
          date: '2018-08-23',
          content: '醍醐灌顶，博主666',
          source: 'new blog is coming',
          recall: false
        },
        {
          date: '2018-08-23',
          content: '醍醐灌顶，博主666',
          source: 'new blog is coming',
          recall: true
        }
      ],
      currentPage: 1,
      dialogFormVisible: false,
      commentsForm: {
        content: ''
      },
      formLabelWidth: '80px',
      question: ''
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleRecall (index, row) {
      this.question = row.content
      this.dialogFormVisible = true
    }
  },
  filters: {
    recallFilter (val) {
      return val ? '已回复' : '未回复'
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-searchspace{
  margin-bottom: 20px;
}
.comment-keys{
  width: 200px;
}
.el-pagination{
  margin-top: 20px;
  text-align: center;
}
.comment-recall{
  padding: 10px;
  height: 180px;
  border: 1px solid #ebebeb;
  border-radius: 6px;
  margin-bottom: 10px;
  background: #ebebeb;
}
</style>
