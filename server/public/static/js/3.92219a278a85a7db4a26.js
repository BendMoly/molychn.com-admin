webpackJsonp([3],{"1E5w":function(t,e){},MnuC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("//Fk"),n=a.n(s),o=a("7+uW").default.prototype.$isServer,i=!o&&document.addEventListener?function(t,e,a){t&&e&&a&&t.addEventListener(e,a,!1)}:function(t,e,a){t&&e&&a&&t.attachEvent("on"+e,a)},l=!o&&document.removeEventListener?function(t,e,a){t&&e&&t.removeEventListener(e,a,!1)}:function(t,e,a){t&&e&&t.detachEvent("on"+e,a)};var c={mounted:function(){this.fetchColumns(),this.fetchSource()},data:function(){return{columns:[],column:"",columnName:"",tags:[],tagOptions:[],title:"",abstract:"",banner:"",markdown:"",qiniuToken:"",uploadData:null,reference:null,moveIn:!1,type:"all",images_source:[],images_source_backup:[],sourceIdx:-1,imgName:"",imgSrc:""}},methods:{checkEditStatus:function(){var t=this,e=this.$route.query.id;e&&"string"==typeof e&&this.$http.get("/articles/"+e).then(function(e){for(var a=0;a<t.columns.length;a++)e.data.columnId===t.columns[a]._id&&(t.column=t.columns[a].title,t.tagOptions=t.columns[a].tags);t.tags=e.data.tags,t.title=e.data.title,t.abstract=e.data.abstract,t.banner=e.data.banner,t.markdown=e.data.content})},fetchColumns:function(){var t=this;this.$http.get("/columns").then(function(e){t.columns=e.data,t.checkEditStatus()})},handleSelect:function(t){var e=this.columns.filter(function(e){return e._id===t});this.tagOptions=e[0].tags,this.columnName=e[0].title},sendArticle:function(){var t=this,e={title:this.title,abstract:this.abstract,columnId:this.column,columnName:this.columnName,tags:this.tags,banner:this.banner,content:this.markdown};this.$http.post("/articles",e).then(function(e){t.$message({type:"success",message:"发表成功"}),t.title="",t.abstract="",t.column="",t.columnName="",t.tags=[],t.banner="",t.markdown=""})},getQiniuToken:function(){var t=this;return new n.a(function(e,a){t.$http.get("/upload").then(function(t){e(t.data)}).catch(function(t){a(t)})})},beforeUpload:function(t){var e=this;return new n.a(function(a,s){e.getQiniuToken().then(function(s){e.uploadData={token:s,key:t.name,fname:t.name},setTimeout(function(){a(!0)},200)})})},successUpload:function(t,e){console.log(t),console.log(e),this.fetchSource(),this.$refs.uploadForm.clearFiles()},fetchSource:function(){var t=this;this.$http.get("/uploads").then(function(e){console.log(e),t.sourceInit(),t.images_source=t.images_source_backup=e.data.items})},showSource:function(){this.moveIn=!0,i(document,"click",this.handleDocumentClick)},showSourceToggle:function(){this.moveIn=!this.moveIn,this.moveIn?(this.sourceInit(),i(document,"click",this.handleDocumentClick)):(this.sourceInit(),l(document,"click",this.handleDocumentClick))},sourceInit:function(){this.sourceIdx=-1,this.imgName="",this.imgSrc=""},sourceSlt:function(t){if(this.images_source[t].isBanner){this.sourceIdx=t;var e=this.images_source[t].src.split("/");this.imgName=e[e.length-1],this.imgSrc=this.images_source[t].src}},sourceFilter:function(t){console.log(t),this.sourceInit(),this.images_source="banner"===t?this.images_source.filter(function(t){return t.isBanner}):this.images_source_backup},sourceDel:function(t){var e=this;console.log(t),this.$confirm("确定删除该素材?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$message({type:"success",message:"删除成功!"})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},imgSelect:function(){this.banner=this.imgSrc,this.showSourceToggle()},handleDocumentClick:function(t){var e=this.$refs.imgSource;this.$el&&e&&!e.contains(t.target)&&(this.moveIn=!1,console.log(1),l(document,"click",this.handleDocumentClick))}},destroyed:function(){l(document,"click",this.handleDocumentClick)}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"release-container"},[a("div",{staticClass:"release-items"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:2}},[a("label",[t._v("栏目：")])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.handleSelect},model:{value:t.column,callback:function(e){t.column=e},expression:"column"}},t._l(t.columns,function(t){return a("el-option",{key:t._id,attrs:{label:t.title,value:t._id}})}),1)],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("label",[t._v("标签：")])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-select",{attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择文章标签"},model:{value:t.tags,callback:function(e){t.tags=e},expression:"tags"}},t._l(t.tagOptions,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})}),1)],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("label",[t._v("标题：")])]),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-input",{model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("label",[t._v("摘要：")])]),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.abstract,callback:function(e){t.abstract=e},expression:"abstract"}})],1)],1),t._v(" "),a("el-input",{attrs:{placeholder:"光秃秃去给人看，你愿意么",readonly:""},model:{value:t.banner,callback:function(e){t.banner=e},expression:"banner"}},[a("el-button",{attrs:{slot:"prepend",type:"primary"},on:{click:function(e){return e.stopPropagation(),t.showSource(e)}},slot:"prepend"},[t._v("来一张封面图？")]),t._v(" "),a("el-button",{staticClass:"fa fa-close",attrs:{slot:"append"},on:{click:function(e){e.stopPropagation(),t.banner=""}},slot:"append"})],1)],1),t._v(" "),a("mavon-editor",{attrs:{ishljs:!0,codeStyle:"xcode",scrollStyle:!0},model:{value:t.markdown,callback:function(e){t.markdown=e},expression:"markdown"}}),t._v(" "),a("div",{staticClass:"release-btn"},[a("el-button",[a("i",{staticClass:"fa fa-folder-open"}),t._v("存入草稿箱")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.sendArticle}},[a("i",{staticClass:"fa fa-send"}),t._v("发表")])],1),t._v(" "),a("div",{ref:"imgSource",staticClass:"folder-images",class:{"folder-images_move":t.moveIn}},[a("div",{staticClass:"folder-images_title"},[t._v("图片素材")]),t._v(" "),a("div",{staticClass:"folder-images_types"},[a("el-radio-group",{on:{change:t.sourceFilter},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[a("el-radio",{attrs:{label:"all"}},[t._v("全部")]),t._v(" "),a("el-radio",{attrs:{label:"banner"}},[t._v("封面")])],1)],1),t._v(" "),a("div",{staticClass:"folder-images_list area-scroll"},[a("el-row",t._l(t.images_source,function(e,s){return a("el-col",{key:s,attrs:{span:24}},[a("div",{staticClass:"folder-images_items",on:{click:function(e){t.sourceSlt(s)}}},[a("i",{staticClass:"fa fa-close folder-images_items_close",on:{click:function(a){a.stopPropagation(),t.sourceDel(e)}}}),t._v(" "),a("img",{attrs:{src:e.src,alt:""}}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.sourceIdx==s,expression:"sourceIdx == index"}],staticClass:"folder-images_item_selected"},[a("i",{staticClass:"fa fa-check-circle-o"})])])])}),1),t._v(" "),a("el-upload",{ref:"uploadForm",attrs:{drag:"",action:"http://upload.qiniup.com",data:t.uploadData,"before-upload":t.beforeUpload,"on-success":t.successUpload,multiple:""}},[a("i",{staticClass:"el-icon-upload"}),t._v(" "),a("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),a("em",[t._v("点击上传")])])])],1),t._v(" "),a("div",{staticClass:"folder-images_source"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-input",{attrs:{size:"mini",placeholder:"图片名",readonly:""},model:{value:t.imgName,callback:function(e){t.imgName=e},expression:"imgName"}})],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-input",{attrs:{size:"mini",placeholder:"线上地址",readonly:""},model:{value:t.imgSrc,callback:function(e){t.imgSrc=e},expression:"imgSrc"}})],1)],1),t._v(" "),a("el-button",{staticClass:"folder-images_source_btn",attrs:{type:"primary",size:"small"},on:{click:t.imgSelect}},[t._v("就决定是你了")])],1),t._v(" "),a("div",{staticClass:"folder-images_toggle",on:{click:function(e){return e.stopPropagation(),t.showSourceToggle(e)}}},[a("div",{class:{"angle-rotate-box":t.moveIn}},[a("i",{staticClass:"fa fa-angle-left",class:{"angle-rotate":t.moveIn}})])])])],1)},staticRenderFns:[]};var u=a("VU/8")(c,r,!1,function(t){a("1E5w")},"data-v-19adaab7",null);e.default=u.exports}});
//# sourceMappingURL=3.92219a278a85a7db4a26.js.map