<template>
  <div class="chat-contacts">
    <div class="search">
      <el-input v-model="searchText" placeholder="搜索联系人"></el-input>
    </div>

    <div v-loading="loading" class="list">
      <el-scrollbar wrap-class="scrollbar-wrap">
        <div @click="clickItem(contact)" class="item" v-for="(contact, index) in filteredContacts" :key="index">
          <div class="avatar">
            <img :src="contact.headPortrait" alt="" />
          </div>
          <div class="info">
            <h4>{{ contact.nickName }}</h4>
            <p :class="{ col71b: contact.status == '在线' }" style="padding-top: 8px">{{ contact.status }}</p>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible">
      <div class="card-container">
        <div v-for="(data, index) in dataList" :key="index" class="card">
          <h3>{{ data.title }}</h3>
          <p>{{ data.content }}</p>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClick">{{ buttonText }}</el-button>
      </div>
    </el-dialog>
    <div v-if="filteredContacts.length == 0" style="font-size: 40px; color: #666; text-align: center; margin: 200px 0">暂无好友</div>
  </div>
</template>

<script>
import api from '@/api'
import { listSearchMixin } from '@/mixin'
import { mapMutations } from 'vuex'
export default {
  props: {
    contacts: {
      type: Array,
      required: true
    }
  },
  mixins: [listSearchMixin],
  data() {
    return {
      loading: false,
      searchText: '',
      friendObj: '',
      dialogVisible: false, // 对话框是否可见
      title: '数据展示', // 对话框标题
      buttonText: '发信息', // 按钮文本
      dataList: [
        { title: '数据1', content: '这里是数据1的详细内容' },
        { title: '数据2', content: '这里是数据2的详细内容' },
        { title: '数据3', content: '这里是数据3的详细内容' }
      ] // 展示数据列表
    }
  },

  computed: {
    filteredContacts() {
      this.loading = true
      if (!this.searchText) {
        this.loading = false
        return this.contacts
      }
      const regex = new RegExp(this.searchText, 'i')
      this.loading = false
      return this.contacts.filter((contact) => regex.test(contact.nickName))
    }
  },
  methods: {
    ...mapMutations({
      setObjectChat: 'setObjectChat',
      setMsgList: 'setMsgList'
    }),
    clickItem(contact) {
      this.friendObj = {
        imgUrl: contact.headPortrait,
        lastContent: '',
        lastTime: '',
        objectId: contact.id,
        objectName: contact.nickName
      }
      this.dialogVisible = true
    },
    handleClick() {
      this.setObjectChat(this.friendObj)
      this.getMsgList(this.friendObj.objectId)
    },
    //获取聊天消息列表
    getMsgList(id) {
      let params = {
        url: api.getChatList,
        method: 'get',
        payload: {
          toId: id
        }
      }
      this.sendReq(params, (res) => {
        if (res.success) {
          this.setMsgList(res.data)
          // console.log(res.data)
          this.$router.push('/chat')
        } else {
          this.$message.warning(res.msg)
        }
      })
    }
  }
}
</script>
<style scoped>
.chat-contacts {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search {
  padding: 10px;
}

.list {
  flex: 1;
  overflow-y: auto;
}

.item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.item:hover {
  background-color: #f5f5f5;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.avatar img {
  width: 100%;
  height: 100%;
}

.info h4 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.info p {
  margin: 0;
  font-size: 14px;
  color: #999;
}
.scrollbar-wrap {
  height: 100%;
}
.col71b {
  color: #71b71b !important;
}
.card-container {
  display: flex;
  justify-content: space-between;
}

.card {
  width: 30%;
  background-color: #fff;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.dialog-footer {
  text-align: center;
  margin-top: 20px;
}
</style>
