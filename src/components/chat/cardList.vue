<template>
  <div>
    <div @click="clickCart(item)" v-for="(item, index) in chatCardList" :key="item.objectId" class="card" style="cursor: pointer; width: 100%; background-color: #dcdcdd; padding: 15px; display: flex; box-sizing: border-box">
      <img src="../../assets/images/R-C.png" style="height: 50px; width: 50px; margin-right: 15px" alt="" />
      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1">
        <div>{{ item.objectName }}</div>
        <div style="color: #666; font-size: 12px">{{ item.lastContent }}</div>
      </div>
      <div style="color: #666; font-size: 12px; text-align: right">{{ item.lastTime }}</div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { listSearchMixin } from '@/mixin/index.js'
import { mapMutations } from 'vuex'
export default {
  props: ['chatCardList'],
  mixins: [listSearchMixin],
  data() {
    return {}
  },
  created() {},
  methods: {
    ...mapMutations({
      setObjectChat: 'setObjectChat',
      setMsgList: 'setMsgList'
    }),
    clickCart(item) {
      console.log(item)
      this.setObjectChat(item)
      this.getMsgList(item.objectId)
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
          console.log(res.data)
        } else {
          this.$message.warning(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.card:hover {
  background-color: #c4c4c4 !important;
}
</style>
