<template>
  <div style="background-color: #fff; height: 100%; padding: 30px; box-sizing: border-box">
    <div class="add-contact" style="display: flex; flex-direction: column; align-items: center; height: 100%">
      <el-input placeholder="请输入用户名" v-model="searchValue" @keyup.enter.native="searchUser" style="width: 200px">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="searchUser"></i>
      </el-input>
      <div v-loading="loading">
        <div v-if="userData">
          <div class="card" style="margin-top: 40px; width: 400px">
            <div class="card-header">
              <div class="avatar">
                <img :src="userData.headPortrait" alt="User Avatar" />
              </div>
              <div class="info">
                <div><span style="color: #666; font-size: 14px">昵称：</span>{{ userData.nickName }}</div>
                <div style="margin-top: 10px"><span style="color: #666; font-size: 14px">邮箱：</span>{{ userData.accountNumber }}</div>
              </div>
            </div>
            <div class="card-footer">
              <el-button @click="showAddFriendDialog(userData)" type="primary" icon="el-icon-plus"></el-button>
            </div>
          </div>
        </div>
        <div v-else></div>
      </div>

      <el-dialog title="添加好友" :visible.sync="addDialogVisible" width="400px">
        <div class="add-friend-dialog">
          <p>{{ addFriendUser.nickName }}</p>
          <el-input type="textarea" v-model="friendMessage" placeholder="请填写好友验证消息"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addFriend">添加好友</el-button>
        </span>
      </el-dialog>
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
      searchValue: '',
      // userList: [],
      userData: '',
      addDialogVisible: false,
      addFriendUser: {},
      friendMessage: '',
      loading: false
    }
  },
  methods: {
    // 搜索用户
    searchUser() {
      console.log('搜索用户：', this.searchValue)
      this.loading = true
      // 向服务器发送搜索用户请求
      this.sendReq(
        {
          url: api.searchUser,
          method: 'get',
          payload: {
            key: this.searchValue
          }
        },
        (res) => {
          if (res.success) {
            this.userData = res.data
            this.loading = false
          } else {
            this.loading = false
            this.$message.error(res.msg)
          }
        }
      )
      // 获取到用户列表后，更新this.userList的值
      /* this.userList = [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' }
      ] */
    },
    // 显示添加好友弹框
    showAddFriendDialog(user) {
      this.addFriendUser = user
      this.friendMessage = ''
      this.addDialogVisible = true
    },
    // 添加好友
    addFriend() {
      console.log('添加好友：', this.addFriendUser.id, this.friendMessage)
      // 向服务器发送添加好友请求
      this.loading = true
      this.sendReq(
        {
          url: api.addFriendRequest,
          data: {
            toId: this.addFriendUser.id,
            validationMessage: this.friendMessage
          }
        },
        (res) => {
          if (res.success) {
            this.$message.success('请求已发送')
            this.$root.$socketApply.send(
              JSON.stringify({
                toId: this.addFriendUser.id,
                type: 'apply'
              })
            )
          } else {
            this.$message.error(res.msg)
          }
          this.loading = false
        }
      )
      // 添加成功后，关闭添加好友弹框
      this.addDialogVisible = false
      // this.$message.success('添加好友成功！')
    }
  }
}
</script>
<style scoped>
.add-contact {
  max-width: 400px;
  margin: 0 auto;
}
.user-list {
  list-style: none;
  padding-left: 0;
  margin-top: 10px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.user-list li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s;
}
.user-list li:hover {
  background-color: #f5f5f5;
}
.add-friend-dialog p {
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  /* max-width: 400px; */
}

.card-header {
  display: flex;
  align-items: center;
  padding: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  overflow: hidden;
  border-radius: 50%;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
}
</style>
