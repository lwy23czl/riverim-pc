<template>
  <div style="background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); height: 100vh; font-family: 阿里妈妈数黑体 Bold; padding-top: 20px; box-sizing: border-box">
    <div style="width: 690px; height: 600px; margin: 0 auto">
      <div style="font-size: 45px; text-align: center; margin-bottom: 30px">注册</div>
      <el-input @blur="mailboxFormat" style="margin-bottom: 20px" v-model="accountNumber" clearable>
        <template #prefix>
          <div style="line-height: 60px; color: #000; padding-left: 10px">邮箱</div>
        </template>
      </el-input>
      <div style="display: flex; align-items: center; margin-bottom: 20px">
        <el-input style="width: 80%" v-model="code" clearable>
          <template #prefix>
            <div style="line-height: 60px; color: #000; padding-left: 10px">验证码</div>
          </template>
        </el-input>
        <el-button style="margin-left: 20px" @click="getCode" type="primary" :loading="loading">获取验证码</el-button>
        <!-- <div @click="getCode" style="border-radius: 50px; background: #586d84; box-shadow: 20px 20px 60px #4b5d70, -20px -20px 60px #657d98; width: 100px; height: 40px; text-align: center; line-height: 40px; margin-left: 20px; cursor: pointer">获取验证码</div> -->
      </div>
      <div>
        <div style="margin: 20px">
          <el-upload list-type="picture-card" :action="upload" :on-success="handleUploadSuccess" :before-upload="beforeUpload" :limit="1" :accept="'image/*'">
            <i class="el-icon-plus"></i>
          </el-upload>
          <div style="padding-top: 5px; font-size: 12px; color: #ff7800">最多只能上传一张图片，不上传图片将使用默认图片</div>
        </div>
      </div>

      <el-input style="margin-bottom: 20px" v-model="nickName" clearable>
        <template #prefix>
          <div style="line-height: 60px; color: #000; padding-left: 10px">昵称</div>
        </template>
      </el-input>
      <div style="display: flex">
        <el-input v-model="passWord" style="margin-bottom: 20px; margin-right: 10px" show-password>
          <template #prefix>
            <div style="line-height: 60px; color: #000; padding-left: 10px">密码</div>
          </template>
        </el-input>
        <el-input @keyup.enter="register" v-model="repPassword" show-password>
          <template #prefix>
            <div style="line-height: 60px; color: #000; padding-left: 10px">重复密码</div>
          </template>
        </el-input>
      </div>
      <div style="font-size: 10px; color: #ff7800">注：密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字</div>
      <div @click="register" class="login">注册</div>
      <div @click="$router.push('/login')" class="to" style="text-align: center; margin-top: 20px; cursor: pointer">已有账号,去登录</div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { listSearchMixin } from '@/mixin'
export default {
  mixins: [listSearchMixin],
  data() {
    return {
      nickName: '',
      passWord: '',
      accountNumber: '',
      repPassword: '',
      code: '',
      mailOk: false,
      loading: false,
      imageUrl: 'http://qn.lwy23czl.top/R-C.png', // 上传成功后的图片链接
      upload: ''
    }
  },
  created() {
    this.upload = api.upload
  },
  methods: {
    // 点击上传前的回调函数，可以在这里进行一些上传前的处理，例如验证上传文件的类型、大小等
    beforeUpload(file) {
      // 验证文件类型是否为图片类型
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        this.$message.error('上传头像图片只能是图片格式！')
        return false
      }
      // 验证文件大小是否超过限制
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB！')
        return false
      }
      return true
    },
    // 上传成功后的回调函数，可以在这里获取上传成功后返回的文件链接，然后进行展示等操作
    handleUploadSuccess(response) {
      this.imageUrl = response

      this.$message.success('上传头像成功！')
    },
    mailboxFormat() {
      let reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
      if (!reg.test(this.accountNumber)) {
        this.$message.warning('请输入正确的邮箱！')
      } else {
        this.mailOk = true
      }
    },
    getCode() {
      if (!this.mailOk) {
        this.$message.warning('请检查邮箱是否填写正确')
        return
      }
      this.loading = true
      let params = {
        url: api.getCode,
        method: 'get',
        payload: {
          accountNumber: this.accountNumber
        }
      }
      this.sendReq(params, (res) => {
        this.loading = false
        if (res.status == 200) {
          this.$message.success('验证码已发送至您的邮箱')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    register() {
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
      if (this.accountNumber == '') {
        this.$message.warning('请填写邮箱')
        return
      } else if (this.code == '') {
        this.$message.warning('请填写验证码')
        return
      } else if (this.nickName == '') {
        this.$message.warning('昵称不能为空')
        return
      } else if (!reg.test(this.passWord)) {
        this.$message.warning('密码格式不正确')
        return
      } else if (this.passWord != this.repPassword) {
        this.$message.warning('两次密码不一致')
        return
      }
      let params = {
        url: api.register,
        method: 'post',
        data: {
          nickName: this.nickName,
          passWord: this.passWord,
          accountNumber: this.accountNumber,
          code: this.code,
          headPortrait: this.imageUrl
        }
      }
      this.sendReq(params, (res) => {
        if (res.status == 200) {
          this.$message.success('注册成功,请登录')
          this.$router.push('/login')
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
>>> .el-button--primary {
  font-family: 阿里妈妈数黑体 Bold;
}
>>> .el-input__inner {
  border-radius: 15px;
  height: 60px;
  line-height: 60px;
}
>>> .el-input__inner:focus {
  border-color: #bd9dd9;
}
>>> .el-input--prefix .el-input__inner {
  padding-left: 100px;
}
.login {
  font-size: 20px;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;
  line-height: 60px;
  margin-top: 50px;
  width: 322px;
  height: 60px;
  border-radius: 25px;
  opacity: 1;
  letter-spacing: 10px;

  background: linear-gradient(0deg, #b6dcfc, #b6dcfc), linear-gradient(0deg, #b6dcfc, #b6dcfc), linear-gradient(0deg, #b6dcfc, #b6dcfc), #b6dcfc;

  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.25);
}
.to:hover {
  color: #ff7800;
}
>>> .el-upload--picture-card {
  height: 80px;
  width: 80px;
  line-height: 80px;
}
>>> .el-upload-list--picture-card .el-upload-list__item {
  height: 80px;
  width: 80px;
}
</style>
