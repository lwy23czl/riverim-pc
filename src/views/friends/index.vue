<template>
  <div style="height: 100%; display: flex; flex-direction: column; background-color: #fff">
    <FriendList :contacts="friendList"></FriendList>
    <!-- <BgcDiv style="flex: 1"></BgcDiv> -->
  </div>
</template>
<script>
import FriendList from '@/components/friend/friendList.vue'
import BgcDiv from '@/components/com/bgcDiv.vue'
import api from '@/api'
import { listSearchMixin } from '@/mixin'
export default {
  components: { FriendList, BgcDiv },
  mixins: [listSearchMixin],
  data() {
    return {
      friendList: []
    }
  },
  created() {
    this.getFriendList()
  },
  methods: {
    getFriendList() {
      this.sendReq(
        {
          url: api.getFriendList,
          method: 'get'
        },
        (res) => {
          if ((res.success = true)) {
            this.friendList = res.data
            console.log(res.data)
          }
        }
      )
    }
  }
}
</script>

<style scoped></style>
