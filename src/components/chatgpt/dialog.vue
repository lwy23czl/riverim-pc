<template>
  <div class="chat-box">
    <div style="height: 50px; background-color: #fff; border-bottom: 1px solid #e5e5e5; padding: 0 20px; line-height: 50px">
      <div style="font-size: 20px">{{ objectChat.objectName }}</div>
    </div>
    <el-scrollbar style="box-sizing: border-box; padding-top: 10px" ref="scrollbar" class="chat-history-wrapper">
      <ul ref="chatHistory" class="chat-history">
        <li v-for="(message, index) in msgList" :key="index" :class="{ me: message.me }">
          <div class="chat-avatar">
            <img :src="message.avatar" />
          </div>
          <div class="chat-message">
            <div class="chat-bubble" :class="{ meMsg: message.me }">{{ message.content }}</div>
            <div class="chat-time">{{ message.time }}</div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
    <div class="chat-input" style="display: flex">
      <el-input v-model="inputMessage" placeholder="请输入消息内容，按回车发送" @keyup.enter.native="sendMessage"></el-input>
      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ChatBox',
  data() {
    return {
      inputMessage: ''
    }
  },
  computed: {
    ...mapGetters(['objectChat', 'msgList', 'basicUserInfo'])
  },
  watch: {
    msgList() {
      this.$nextTick(() => {
        this.$refs.scrollbar.wrap.scrollTop = this.$refs.scrollbar.wrap.scrollHeight
      })
    }
  },
  methods: {
    sendMessage() {
      if (this.inputMessage != '') {
        const newMessage = {
          me: true,
          avatar: this.basicUserInfo.headPortrait,
          content: this.inputMessage,
          time: new Date().toLocaleString()
        }
        this.$emit('new-message', newMessage)
        this.inputMessage = ''
        this.$nextTick(() => {
          this.$refs.scrollbar.wrap.scrollTop = this.$refs.scrollbar.wrap.scrollHeight
        })
      } else {
        this.$message.warning('不能发送空消息')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar__wrap::-webkit-scrollbar {
  width: 0px;
  background-color: transparent;
}

.chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.chat-history-wrapper {
  flex: 1;
  overflow-y: auto;
}

.chat-history {
  margin: 0;
  padding: 0;
  list-style: none;
}

.chat-history li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.chat-history li.me {
  flex-direction: row-reverse;
}

.chat-avatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.meMsg {
  background-color: #999 !important;
}
.chat-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.chat-message {
  display: flex;
  flex-direction: column;
}

.chat-bubble {
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
  max-width: 70%;
  word-wrap: break-word;
}

.chat-time {
  font-size: 12px;
  color: #999;
}
.chat-box >>> .el-scrollbar__wrap {
  overflow: auto !important;
}
.chat-history-wrapper[data-v-a05706d8] {
  overflow-y: hidden !important;
}
</style>
