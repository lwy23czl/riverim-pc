<template>
  <div style="display: flex; height: 100%; background-color: #f7f7f7">
    <div style="width: 250px; border-right: 1px solid #e5e5e5; height: 100%">
      <div></div>
      <el-scrollbar class="el">
        <cardList :chatCardList="chatCardList" @reacquire="reacquire"></cardList>
      </el-scrollbar>
    </div>
    <div style="flex: 1">
      <!-- <Dialog></Dialog> -->
      <chatDialog v-if="currentId" @new-message="newMessage"></chatDialog>
      <div v-else style="height: 100%; font-size: 40px; color: #666; text-align: center; padding-top: 200px">请选择一个聊天对象</div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { listSearchMixin } from '@/mixin/index.js'
import cardList from '@/components/chat/cardList.vue'
import Dialog from '@/components/chat/dialog.vue'
import chatDialog from '@/components/chatgpt/dialog.vue'
import { mapMutations, mapGetters } from 'vuex'
export default {
  mixins: [listSearchMixin],
  data() {
    return {
      chatCardList: [],
      msgObj: {
        fromId: '',
        toId: '',
        msg: ''
      }
    }
  },
  components: { Dialog, cardList, chatDialog },
  computed: {
    ...mapGetters(['msgList', 'basicUserInfo', 'objectChat', 'currentId'])
  },
  created() {
    this.getChatObjectCardList()
  },
  mounted() {
    // console.log(this.basicUserInfo.id, 'idM')
    // this.newWebSocket()
    this.$root.$socket.addEventListener('open', this.onOpen)
    // this.$root.$socket.addEventListener('close', () => '已断开')
    this.$root.$socket.addEventListener('message', this.onMessage)
  },
  beforeDestroy() {
    this.$root.$socket.removeEventListener('open', this.onOpen)
    // this.$root.$socket.removeEventListener('close')
    this.$root.$socket.removeEventListener('message', this.onMessage)
    this.setCurrentId('')
  },
  methods: {
    ...mapMutations({
      setMsgList: 'setMsgList',
      setCurrentId: 'setCurrentId'
    }),
    reacquire() {
      setTimeout(() => {
        this.getChatObjectCardList()
      }, 500)
    },
    /* async newWebSocket() {
      if (this.basicUserInfo.id) {
        console.log(this.basicUserInfo.id, 'id')
        let ws = 'ws://localhost:8001/websocket/chat/' + this.basicUserInfo.id
        this.$root.$socket = await new WebSocket(ws)
      }
    }, */
    getChatObjectCardList() {
      let params = {
        url: api.getChatObjectCardList,
        method: 'get'
      }
      this.sendReq(params, (res) => {
        if (res.success) {
          this.chatCardList = res.data
        }
      })
    },
    onMessage(val) {
      console.log(222)
      console.log(val)
      let item = JSON.parse(val.data)
      console.log(item, 'item')
      if (item.fromId == this.objectChat.objectId) {
        let msg = {
          me: false,
          avatar: item.headPortrait,
          content: item.msg,
          time: item.sendingTime
        }
        this.msgList.push(msg)
        this.setMsgList(this.msgList)
      }
    },
    addChatNum(id) {
      this.sendReq({
        url: api.addChatNum,
        method: 'get',
        payload: {
          friendId: id
        }
      })
    },
    newMessage(val) {
      this.msgList.push(val)
      this.setMsgList(this.msgList)
      console.log(this.$root.$socket, 'qq')
      this.addChatNum(this.objectChat.objectId)
      this.msgObj = {
        fromId: val ? this.basicUserInfo.id : this.objectChat.objectId,
        toId: !val ? this.basicUserInfo.id : this.objectChat.objectId,
        msg: val.content
      }
      this.$root.$socket.send(JSON.stringify(this.msgObj))
      console.log(this.msgObj, 'obj')
    },
    onOpen() {
      // this.$message.success('ws连接成功：' + this.basicUserInfo.id)
      // this.$root.$socket.send('hello')
    }
  }
}
</script>

<style scoped>
>>> .el-scrollbar__wrap::-webkit-scrollbar {
  overflow: auto;
  /* margin: 0 !important; */
  margin-bottom: 0 !important;
  margin-right: 0 !important;
  box-sizing: border-box;
}
.el >>> .el-scrollbar__wrap {
  height: 550px;
}
</style>
