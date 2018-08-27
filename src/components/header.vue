<template>
  <section class="header-container clear">
    <div class="header-userinfo" @click="signOut">
      {{ account }}
      <i class="fa fa-sign-out"></i>
    </div>
  </section>
</template>

<script>
import { getCookie, removeCookie } from '@/utils/auth'
export default {
  data () {
    return {
      account: getCookie('account')
    }
  },
  methods: {
    signOut () {
      this.$confirm('确定退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeCookie('token')
        this.$router.push({path: '/login'})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '珍惜时间'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container{
  height: 50px;
  line-height: 50px;
  box-shadow: 1px 0px 10px 0px #ebebeb;
}
.header-userinfo{
  float: right;
  padding: 0 10px;
  color: #333333;
  cursor: pointer;
}
</style>
