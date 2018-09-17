<template>
  <section class="release-container">
    <div class="release-items">
      <el-row :gutter="20">
        <el-col :span="2"><label>栏目：</label></el-col>
        <el-col :span="8">
          <el-select v-model="column" placeholder="请选择" @change="handleSelect">
            <el-option
              v-for="item in columns"
              :key="item._id"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2"><label>标签：</label></el-col>
        <el-col :span="12">
          <el-select
          v-model="tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签">
            <el-option
              v-for="item in tagOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2"><label>标题：</label></el-col>
        <el-col :span="22">
          <el-input v-model="title"></el-input>
        </el-col>
        <el-col :span="2"><label>摘要：</label></el-col>
        <el-col :span="22">
          <el-input type="textarea" v-model="abstract"></el-input>
        </el-col>
      </el-row>
      <el-input placeholder="光秃秃去给人看，你愿意么" readonly>
        <template slot="prepend">
          <el-button type="primary" @click.stop="showSource">来一张封面图？</el-button>
        </template>
      </el-input>
    </div>
    <mavon-editor v-model="markdown" :ishljs="true" codeStyle="xcode" :scrollStyle="true"/>
    <div class="release-btn">
      <el-button><i class="fa fa-folder-open"></i>存入草稿箱</el-button>
      <el-button type="primary" @click="sendArticle"><i class="fa fa-send"></i>发表</el-button>
    </div>
    <div class="folder-images" ref="imgSource" :class="{'folder-images_move': moveIn}">
      <div class="folder-images_title">图片素材</div>
      <div class="folder-images_types">
        <el-radio-group v-model="type">
          <el-radio label="all">全部</el-radio>
          <el-radio label="banner">封面</el-radio>
        </el-radio-group>
      </div>
      <div class="folder-images_list area-scroll">
        <el-row>
          <el-col
          :span="24"
          v-for="(item, index) in images_source"
          :key="index"
          >
            <div class="folder-images_items" @click="sourceSlt(index)">
              <i class="fa fa-close folder-images_items_close" @click.stop="sourceDel(item)"></i>
              <div class="folder-images_item_selected" v-show="sourceIdx == index"><i class="fa fa-check-circle-o"></i></div>
            </div>
          </el-col>
        </el-row>
        <el-upload
          ref="uploadForm"
          drag
          action="http://upload.qiniup.com"
          :data="uploadData"
          :before-upload="beforeUpload"
          :on-success="successUpload"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <div class="folder-images_source">
        <el-row>
          <el-col :span="24">
            <el-input size="mini" placeholder="图片名" readonly></el-input>
          </el-col>
          <el-col :span="24">
            <el-input size="mini" placeholder="线上地址" readonly></el-input>
          </el-col>
        </el-row>
        <el-button type="primary" size="small" class="folder-images_source_btn">就决定是你了</el-button>
      </div>
      <div class="folder-images_toggle" @click.stop="showSourceToggle">
        <div :class="{'angle-rotate-box': moveIn}">
          <i class="fa fa-angle-left" :class="{'angle-rotate': moveIn}"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { on, off } from '@/utils/dom'
export default {
  mounted () {
    this.fetchColumns()
  },
  data () {
    return {
      columns: [],
      column: '',
      columnName: '',
      tags: [],
      tagOptions: [],
      title: '',
      abstract: '',
      markdown: '',
      qiniuToken: '',
      uploadData: null,
      type: 'all',
      images_source: [
        {
          src: '',
          name: '',
          type: 0
        }
      ],
      sourceIdx: -1,
      reference: null,
      moveIn: false
    }
  },
  methods: {
    // 判断是编辑还是发布
    checkEditStatus () {
      let id = this.$route.query.id
      if (id && typeof id === 'string') {
        this.$http.get(`/articles/${id}`).then(res => {
          for (let i = 0; i < this.columns.length; i++) {
            if (res.data.columnId == this.columns[i]._id) {
              this.column = this.columns[i].title
              this.tagOptions = this.columns[i].tags
            }
          }
          this.tags = res.data.tags
          this.title = res.data.title
          this.abstract = res.data.abstract
          this.markdown = res.data.content
        })
      }
    },
    fetchColumns () {
      this.$http.get('/columns').then(res => {
        this.columns = res.data
        this.checkEditStatus()
      })
    },
    handleSelect (id) {
      let tagOptions = []
      let res = this.columns.filter((item) => {
        return item._id === id
      })
      this.tagOptions = res[0].tags
      this.columnName = res[0].title
    },
    sendArticle () {
      let normalizeData = {
        title: this.title,
        abstract: this.abstract,
        columnId: this.column,
        columnName: this.columnName,
        tags: this.tags,
        content: this.markdown
      }
      this.$http.post('/articles', normalizeData).then(res => {
        this.$message({
          type: 'success',
          message: '发表成功'
        })
      })
    },
    // 素材上传操作
    getQiniuToken (file) {
      this.$http.get('/upload').then(res => {
        this.qiniuToken = res.data
        this.uploadData = {
          token: res.data
        }
      })
    },
    beforeUpload (file) {
      return new Promise((resolve, reject) => {
        this.uploadData = {
          token: this.qiniuToken,
          key: file.name,
          fname: file.name
        }
        if (this.uploadData.fname) {
          console.log(this.uploadData)
          setTimeout(() => {
            resolve(true)
          }, 200)
        } else {
          reject(new Error('the fname is empty'))
        }
      })
    },
    successUpload () {
      this.$refs.uploadForm.clearFiles()
    },
    showSource () {
      this.moveIn = true
      this.getQiniuToken()
      on(document, 'click', this.handleDocumentClick)
    },
    showSourceToggle () {
      this.moveIn = !this.moveIn
      if (this.moveIn) {
        this.getQiniuToken()
        on(document, 'click', this.handleDocumentClick)
      } else {
        off(document, 'click', this.handleDocumentClick)
      }
    },
    sourceSlt (idx) {
      console.log(idx)
      this.sourceIdx = idx
    },
    sourceDel (item) {
      console.log(item)
      this.$confirm('确定删除该素材?', '提示', {
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
    },
    handleDocumentClick (e) {
      let reference = this.$refs.imgSource
      if (!this.$el ||
        !reference ||
        reference.contains(e.target)) return
      this.moveIn = false
      console.log(1)
      off(document, 'click', this.handleDocumentClick)
    }
  },
  destroyed () {
    off(document, 'click', this.handleDocumentClick)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/default.scss';
.el-col{
  margin-bottom: 10px;
}
.release-items{
  margin-bottom: 20px;
}
.el-autocomplete,
.el-select{
  width: 100%;
}
.release-btn{
  margin-top: 20px;
  text-align: right;
  i{
    margin-right: 5px;
  }
}
.folder-images{
  position: fixed;
  top: 0;
  right: -300px;
  bottom: 0;
  z-index: 1600;
  width: 300px;
  background: #ffffff;
  border-left: 1px solid #ebebeb;
  transition: .5s;
}
.folder-images_move{
  right: 0;
}
.folder-images_title{
  padding-left: 10px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px dashed #ebebeb;
}
.folder-images_types{
  padding-left: 10px;
  height: 22px;
}
.folder-images_list{
  position: absolute;
  top: 65px;
  bottom: 130px;
  padding-top: 10px;
  width: 100%;
  overflow: auto;
}
// .folder-images_list::-webkit-scrollbar {
//   width: 6px;
//   height: 1px;
// }
// .folder-images_list::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
//   border-radius: 6px;
//   background: #ccc;
// }
// .folder-images_list::-webkit-scrollbar-track {/*滚动条里面轨道*/
//   border-radius: 6px;
//   background: #fff;
// }
.folder-images_items{
  position: relative;
  // width: 100%;
  margin: 0 10px;
  min-height: 100px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  // overflow: hidden;
  cursor: pointer;
}
.folder-images_items:hover .folder-images_items_close{
  visibility: visible;
}
.folder-images_items_close{
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 2px;
  z-index: 2;
  color: #ec4444;
}
.folder-images_item_selected{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: rgba(101, 101, 101, .1);
  i{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    color: $default_color;
  }
}
.folder-images_source{
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px;
  height: 110px;
  background: #ffffff;
  border-top: 1px solid #ebebeb;
}

.folder-images_source_btn{
  width: 100%;
}
.folder-images_toggle{
  position: absolute;
  top: 50%;
  left: -22px;
  transform: translateY(-50%);
  width: 20px;
  height: 40px;
  border-top: 1px solid #ebebeb;
  border-right: 1px solid #ffffff;
  border-bottom: 1px solid #ebebeb;
  border-left: 1px solid #ebebeb;
  border-radius: 50px 0px 0 50px;
  background: #ffffff;
  line-height: 38px;
  font-size: 30px;
  color: #999;
  div{
    margin-left: 5px;
  }
  i{
    transition: .5s;
  }
}
.angle-rotate-box{
  margin-left: 9px !important;
}
.angle-rotate{
  transform: rotate(180deg);
  transform-origin: 50% 50%;
  margin-top: 6px;
}
.folder-images_toggle:hover{
  color: $default_color;
}
</style>
