<template>
  <div style="display: flex; height: 100%; background-color: #f7f7f7">
    <div style="width: 250px; border-right: 1px solid #e5e5e5; height: 100%">
      <div></div>
      <el-scrollbar class="el">
        <cardList :chatCardList="chatCardList"></cardList>
      </el-scrollbar>
    </div>
    <div style="flex: 1">
      <!-- <Dialog></Dialog> -->
      <chatDialog @new-message="newMessage"></chatDialog>
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
    ...mapGetters(['msgList', 'basicUserInfo', 'objectChat'])
  },
  created() {
    this.getChatObjectCardList()
  },
  mounted() {
    this.$root.$socket.addEventListener('open', this.onOpen)
    this.$root.$socket.addEventListener('close', () => '已断开')
    this.$root.$socket.addEventListener('message', this.onMessage)
  },
  methods: {
    ...mapMutations({
      setMsgList: 'setMsgList'
    }),
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
    newMessage(val) {
      this.msgList.push(val)
      this.setMsgList(this.msgList)
      console.log(this.$root.$socket, 'qq')
      this.msgObj = {
        fromId: val ? this.basicUserInfo.id : this.objectChat.objectId,
        toId: !val ? this.basicUserInfo.id : this.objectChat.objectId,
        msg: val.content
      }
      this.$root.$socket.send(JSON.stringify(this.msgObj))
    },
    onOpen() {
      this.$message.success('ws连接成功：' + this.basicUserInfo.id)
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
