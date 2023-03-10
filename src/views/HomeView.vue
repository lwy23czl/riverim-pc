<template>
  <div class="home">
    <div>
      <el-input v-model="id" placeholder="请输入id"></el-input>
      <el-button @click="initWebScoket" type="success">连接</el-button>
    </div>
    <div style="border: 1px solid red">
      {{ input }}
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button @click="sendMsg" type="success">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      input: '',
      id: '',
      websocket: ''
    }
  },
  created() {},
  methods: {
    initWebScoket() {
      let url = 'ws://localhost:8888/api/websocket/' + this.id
      this.websocket = new WebSocket(url)
      this.websocket.onopen = this.onOpen
      this.websocket.onmessage = this.onMessage
      this.websocket.onclose = this.onClose
      this.websocket.onerror = this.onError
    },
    onOpen() {
      this.$message.success('连接成功')
    },
    onError() {
      this.$message.error('连接报错')
    },
    onClose() {
      this.$message.info('连接关闭')
    },
    onMessage(e) {
      console.log(e)
      this.$message.success(e.data)
    },
    sendMsg() {
      this.websocket.send(this.input)
    }
  }
}
</script>
<style scoped></style>
