<template>
  <section class="columns-container">
    <div class="columns-tools">
      <el-button type="primary" @click="dialogFormVisible = true">新增栏目</el-button>
    </div>
    <div class="columns-list">
      <div
      class="columns-list_items"
      v-for="(item, index) in columns"
      :key="index"
      >
        <div class="columns-list_items_title">
          <span class="title_main">{{ item.title }}</span>/<span class="title_sub">{{ item.subTitle }}</span><label>({{ item.typeName }})</label>
        </div>
        <div class="columns-list_items_tags">
          <el-tag
          v-for="tag in item.tags"
          :key="tag.name"
          closable
          @close="tagDel(item, tag)"
          :type="randomType(index)">
            {{tag.name}}
          </el-tag>
        </div>
      </div>
    </div>
    <el-dialog title="新增栏目" :visible.sync="dialogFormVisible">
      <el-form :model="columnsForm">
        <el-form-item label="栏目名称" :label-width="formLabelWidth">
          <el-input v-model="columnsForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目缩略" :label-width="formLabelWidth">
          <el-input v-model="columnsForm.subTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目icon" :label-width="formLabelWidth">
          <el-input v-model="columnsForm.icon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目模版" :label-width="formLabelWidth">
          <el-select v-model="columnsForm.template" placeholder="请选择栏目模版">
            <el-option label="图文" value="text"></el-option>
            <el-option label="影集" value="album"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data () {
    return {
      typeColor: 0,
      columns: [
        {
          id: 0,
          title: '前端开发',
          subTitle: 'FE',
          type: 'text',
          typeName: '图文',
          tags: [
            {name: 'biao1', id: 0},
            {name: 'biao2', id: 1},
            {name: 'biao3', id: 2},
            {name: 'biao4', id: 3}
          ]
        },
        {
          id: 1,
          title: '前端开发',
          subTitle: 'FE',
          type: 'text',
          typeName: '图文',
          tags: [
            {name: 'biao1', id: 0},
            {name: 'biao2', id: 1},
            {name: 'biao3', id: 2},
            {name: 'biao4', id: 3}
          ]
        },
        {
          id: 2,
          title: '前端开发',
          subTitle: 'FE',
          type: 'text',
          typeName: '图文',
          tags: [
            {name: 'biao1', id: 0},
            {name: 'biao2', id: 1},
            {name: 'biao3', id: 2},
            {name: 'biao4', id: 3}
          ]
        },
        {
          id: 3,
          title: '前端开发',
          subTitle: 'FE',
          type: 'text',
          typeName: '图文',
          tags: [
            {name: 'biao1', id: 0},
            {name: 'biao2', id: 1},
            {name: 'biao3', id: 2},
            {name: 'biao4', id: 3}
          ]
        },
        {
          id: 4,
          title: '前端开发',
          subTitle: 'FE',
          type: 'text',
          typeName: '图文',
          tags: [
            {name: 'biao1', id: 0},
            {name: 'biao2', id: 1},
            {name: 'biao3', id: 2},
            {name: 'biao4', id: 3}
          ]
        },
        {
          id: 5,
          title: '前端开发',
          subTitle: 'FE',
          type: 'text',
          typeName: '图文',
          tags: [
            {name: 'biao1', id: 0},
            {name: 'biao2', id: 1},
            {name: 'biao3', id: 2},
            {name: 'biao4', id: 3}
          ]
        },
        {
          id: 6,
          title: '前端开发',
          subTitle: 'FE',
          type: 'text',
          typeName: '图文',
          tags: [
            {name: 'biao1', id: 0},
            {name: 'biao2', id: 1},
            {name: 'biao3', id: 2},
            {name: 'biao4', id: 3}
          ]
        },
        {
          id: 7,
          title: '前端开发',
          subTitle: 'FE',
          type: 'text',
          typeName: '图文',
          tags: [
            {name: 'biao1', id: 0},
            {name: 'biao2', id: 1},
            {name: 'biao3', id: 2},
            {name: 'biao4', id: 3}
          ]
        }
      ],
      dialogFormVisible: false,
      columnsForm: {
        title: '',
        subTitle: '',
        icon: '',
        template: ''
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    randomType (index) {
      while (index > 4) {
        index = index % 5
      }
      let typeList = ['', 'success', 'warning', 'info', 'danger']
      let i = index
      return typeList[i]
    },
    tagDel (parent, child) {
      console.log(parent, child)
      this.$confirm(`确定删除${child.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.columns-list_items{
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ebebeb;
  border-radius: 6px;
}
.columns-list_items_title{
  padding: 10px 0;
  border-bottom: 1px dashed #ebebeb;
  font-size: 16px;
  .title_main{
    color: #333333;
  }
  .title_sub{
    color: #666666;
  }
  label{
    font-size: 14px;
    margin-left: 5px;
    color: #999999;
  }
}
.columns-list_items_tags{
  margin-top: 10px;
  padding-left: 50px;
  .el-tag{
    margin-right: 10px;
  }
}
.el-select{
  width: 100%;
}
</style>
