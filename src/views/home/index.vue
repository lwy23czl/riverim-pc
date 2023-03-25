<template>
  <div style="background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%); height: 100vh; display: flex; justify-content: center; align-items: center">
    <!-- <leftIndex></leftIndex> -->
    <!-- <router-view></router-view> -->
    <div style="width: 900px; height: 550px; box-shadow: 0 0 20px 0 #30cfd0; border-radius: 5px; display: flex; overflow: hidden">
      <div style="width: 60px; background-color: #333; display: flex; flex-direction: column; align-items: center">
        <img style="width: 40px; height: 40px; margin-top: 20px; cursor: pointer" :src="imgUrl" />

        <div style="margin-top: 20px">
          <el-menu :default-active="defaultActive" style="background: none" active-text-color="#FF7800" router>
            <el-menu-item index="chat">
              <el-badge style="position: absolute; top: -15px; right: 10px" :value="chatNum == 0 ? '' : chatNum" :max="99"> </el-badge>
              <i class="iconfont icon-a-14" style="font-size: 20px"></i>
            </el-menu-item>
            <el-menu-item index="friends">
              <i class="iconfont icon-tongxunlu" style="font-size: 20px"></i>
            </el-menu-item>
            <el-menu-item style="position: relative" index="info">
              <el-badge :is-dot="applyNew" style="position: absolute; top: -15px; right: 10px"> </el-badge>
              <i class="iconfont icon-a-12" style="font-size: 20px"></i>
            </el-menu-item>
            <el-menu-item index="addFriend">
              <i class="iconfont icon-tianjia1" style="font-size: 20px"></i>
            </el-menu-item>
            <!-- <el-menu-item index="4">
              <i class="iconfont icon-a-14" style="font-size: 20px"></i>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="iconfont icon-a-14" style="font-size: 20px"></i>
            </el-menu-item> -->
          </el-menu>
        </div>
      </div>
      <div style="flex: 1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { listSearchMixin } from '@/mixin'
import leftIndex from './leftIndex.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  mixins: [listSearchMixin],
  data() {
    return {
      applyNew: false,
      imgUrl: ''
    }
  },
  components: {
    leftIndex
  },
  computed: {
    ...mapGetters(['basicUserInfo', 'chatNum']),
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  },
  created() {
    this.getBasicUserInfo()
  },
  mounted() {
    // this.newWebSocket()
    this.$root.$socketApply.addEventListener('message', this.applyMsg)
    this.$root.$socket.addEventListener('message', this.socketMsg)
  },
  methods: {
    ...mapMutations({
      setBasicUserInfo: 'setBasicUserInfo',
      setChatNum: 'setChatNum'
    }),
    socketMsg(val) {
      //vue判断当前路由是否是/chat
      /* if (this.$router.path == '/chat') {
      } */
      this.chatNum++
      this.setChatNum(this.chatNum)
    },
    applyMsg(val) {
      console.log('监听到apply信息', val)
      this.applyNew = val.data == 'apply' ? true : false
    },
    getUnApplyCount() {
      this.sendReq(
        {
          url: api.getUnApplyCount,
          method: 'get'
        },
        (res) => {
          if (res.success) {
            this.applyNew = res.data > 0 ? true : false
          }
        }
      )
    },
    getBasicUserInfo() {
      this.sendReq(
        {
          url: api.getBasicUserInfo,
          method: 'get'
        },
        (res) => {
          if (res.success) {
            this.imgUrl = res.data.headPortrait
            console.log(res.data)
            this.setBasicUserInfo(res.data)
          }
        }
      )
    }
  }
}
</script>

<style scoped>
>>> .el-menu {
  border-right: none;
}
>>> .el-menu-item:focus,
.el-menu-item:hover {
  background-color: #333;
}
</style>
