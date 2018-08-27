<template>
  <section class="dashboard-container">
    <div class="dashboard-today">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <div class="grid-content clear">
            <div class="grid-content_img"><i class="fa fa-users"></i></div>
            <div class="grid-content_ctn">
              <div class="grid-content_title">访问量</div>
              <div class="grid-content_sum">666</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content clear">
            <div class="grid-content_img"><i class="fa fa-eye"></i></div>
            <div class="grid-content_ctn">
              <div class="grid-content_title">点击量</div>
              <div class="grid-content_sum">666</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content clear">
            <div class="grid-content_img"><i class="fa fa-comments"></i></div>
            <div class="grid-content_ctn">
              <div class="grid-content_title">评论数</div>
              <div class="grid-content_sum">666</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../../styles/default.scss';
.grid-content{
  padding: 10px 20px;
  border: 1px solid #ebebeb;
  border-radius: 4px;

  .grid-content_img,
  .grid-content_ctn{
    float: left;
  }

  .grid-content_img{
    background: $default_color;
    padding: 10px 15px;
    border-radius: 4px;
    color: #ffffff;
    font-size: 30px;
    margin-right: 10px;
  }
  .grid-content_title{
    font-size: 20px;
  }
  .grid-content_sum{
    font-size: 25px;
  }
}
</style>
