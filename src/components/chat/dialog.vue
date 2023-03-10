<template>
  <div class="chat-box">
    <div class="chat-history">
      <el-scrollbar ref="scrollbar">
        <div v-for="msg in messages" :key="msg.id" class="chat-message" :class="{ outgoing: msg.isOutgoing, incoming: !msg.isOutgoing }">
          <div class="chat-message-content">{{ msg.content }}</div>
        </div>
      </el-scrollbar>
    </div>
    <div class="chat-input">
      <input v-model="message" @keydown.enter="sendMessage" type="text" placeholder="请输入消息" />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        { id: 1, content: '你好', isOutgoing: true },
        { id: 2, content: '你好，我是 ChatGPT。有什么可以帮到您的吗？', isOutgoing: false }
      ],
      message: ''
    }
  },
  methods: {
    sendMessage() {
      if (this.message) {
        this.messages.push({ id: this.messages.length + 1, content: this.message, isOutgoing: true })
        this.message = ''
        this.toBottom()
      }
    },
    toBottom() {
      this.$nextTick(() => {
        this.$refs.scrollbar.wrap.scrollTop = this.$refs.scrollbar.wrap.scrollHeight
      })
    }
  }
}
</script>

<style scoped>
>>> .el-scrollbar__wrap {
  height: 470px !important;
  overflow: auto;
}
.chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.chat-history {
  flex: 1;
  padding: 10px;
}

.chat-message {
  margin-bottom: 10px;
}

.chat-message-content {
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  max-width: 80%;
}

.outgoing .chat-message-content {
  background-color: #2f7d8d;
  color: #fff;
  align-self: flex-end;
}

.incoming .chat-message-content {
  background-color: #fff;
  color: #444;
  align-self: flex-start;
}

.chat-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 10px;
  background-color: #f0f0f0;
}

.chat-input input {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.chat-input button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #2f7d8d;
  color: #fff;
  cursor: pointer;
}
</style>
