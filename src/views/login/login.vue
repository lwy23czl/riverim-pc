<template>
  <div class="q" style="background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%); height: 100vh">
    <div style="font-family: 阿里妈妈数黑体 Bold; padding-top: 100px">
      <div style="width: 690px; height: 600px; margin: 0 auto">
        <div style="font-size: 45px; text-align: center; margin-bottom: 30px">登录</div>
        <el-input style="margin-bottom: 50px" v-model="accountNumber" clearable>
          <template #prefix>
            <div style="line-height: 60px; color: #000; padding-left: 10px">邮箱</div>
          </template>
        </el-input>
        <el-input @keyup.enter="login" v-model="passWord" show-password>
          <template #prefix>
            <div style="line-height: 60px; color: #000; padding-left: 10px">密码</div>
          </template>
        </el-input>
        <div @click="login" class="login">登录</div>
        <div @click="$router.push('/register')" class="to" style="text-align: center; margin-top: 20px; cursor: pointer">没有账号,去注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { listSearchMixin } from '@/mixin'
import Cookies from 'js-cookie'
import { mapMutations } from 'vuex'
export default {
  mixins: [listSearchMixin],
  data() {
    return {
      accountNumber: '',
      passWord: ''
    }
  },
  created() {},
  methods: {
    ...mapMutations({
      setBasicUserInfo: 'setBasicUserInfo'
    }),
    login() {
      let params = {
        url: api.login,
        method: 'post',
        data: {
          accountNumber: this.accountNumber,
          passWord: this.passWord
        }
      }
      this.sendReq(params, (res) => {
        if (res.status == 200) {
          console.log(res)
          this.$message.success(res.msg)
          Cookies.set('token', res.data, { expires: 7 })
          this.getBasicUserInfo()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getBasicUserInfo() {
      let params = {
        url: api.getBasicUserInfo,
        method: 'get'
      }
      this.sendReq(params, (res) => {
        if (res.success) {
          this.setBasicUserInfo(res.data)
          this.$root.$emit('loginSuccess', res.data.id)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
/* >>> .el-message__content {
  font-family: 阿里妈妈数黑体 Bold;
} */

>>> .el-input__inner {
  border-radius: 15px;
  height: 60px;
  line-height: 60px;
}
>>> .el-input__inner:focus {
  border-color: #bd9dd9;
}
>>> .el-input--prefix .el-input__inner {
  padding-left: 60px;
}
.login {
  font-size: 20px;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;
  line-height: 80px;
  margin-top: 100px;
  width: 322px;
  height: 80px;
  border-radius: 25px;
  opacity: 1;
  letter-spacing: 10px;

  background: linear-gradient(0deg, #a4cb9e, #a4cb9e), linear-gradient(0deg, #a4cb9e, #a4cb9e), linear-gradient(0deg, #a4cb9e, #a4cb9e), #a4cb9e;

  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.25);
}
.to:hover {
  color: #ff7800;
}
</style>
