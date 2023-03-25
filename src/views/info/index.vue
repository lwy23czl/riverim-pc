<template>
  <div style="background-color: #e4e7ed; height: 100%; padding: 20px; box-sizing: border-box">
    <div style="display: flex; justify-content: center; margin-bottom: 20px">
      <el-button-group>
        <el-button :autofocus="true" @click="clickRequest">未处理的好友请求</el-button>
        <el-button @click="clickFeedback">请求反馈列表</el-button>
      </el-button-group>
    </div>

    <div v-if="showFriendRequests">
      <Request></Request>
    </div>
    <div v-if="showHandlingResults">
      <Feedback></Feedback>
    </div>
  </div>
</template>

<script>
import Request from './friendRequest/request.vue'
import Feedback from './friendRequest/feedback.vue'
export default {
  components: { Request, Feedback },
  data() {
    return {
      showFriendRequests: true,
      showHandlingResults: false
    }
  },
  methods: {
    clickRequest() {
      this.showFriendRequests = true
      this.showHandlingResults = false
    },
    clickFeedback() {
      this.showFriendRequests = false
      this.showHandlingResults = true
    }
  }
}
</script>
