<template>
  <section class="login-container">
    <div class="login-form">
      <div class="login-form_title"><span>molychn.com</span>连接一切</div>
      <el-form>
        <el-form-item label="用户名" label-width="60px">
          <el-input v-model="account" @keyup.enter.native="signIn"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="60px">
          <el-input type="password" v-model="password" @keyup.enter.native="signIn"></el-input>
        </el-form-item>
        <div class="login-form_btn">
          <el-button size="small" @click="signIn">登录</el-button>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      console.log('signIn')
      this.validate().then(() => {
        this.$http.post('/user/login', {
          account: this.account,
          password: this.password
        }).then(res => {
          console.log(res)
          this.$router.push({path: '/dashboard'})
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '账号或密码错误'
          })
        })
      }, () => {
        this.$message({
          type: 'warning',
          message: '请输入正确的账号密码'
        })
      }).catch(err => {
        this.$message({
          type: 'error',
          message: `请求似乎出了点问题, ${err}`
        })
      })
    },
    validate () {
      return new Promise((resolve, reject) => {
        if (this.account && this.password) {
          resolve(true)
        } else {
          reject(new Error(false))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container{
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/login/math.png);
  // background-size: 100% 100%;
}
.login-container::before{
  content: '';
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .1);
}
.login-form{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 400px;
  border-radius: 4px;
  background: #ffffff;

  .login-form_title{
    margin-bottom: 20px;
    font-size: 12px;
    text-align: center;
    color: #666666;
    span{
      display: inline-block;
      font-size: 24px;
      font-weight: bold;
      padding: 0 5px;
      color: #409EFF;
    }
  }
  .login-form_btn{
    text-align: right;
  }
}
</style>
