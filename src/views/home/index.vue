<template>
  <div style="background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%); height: 100vh; display: flex; justify-content: center; align-items: center">
    <!-- <leftIndex></leftIndex> -->
    <!-- <router-view></router-view> -->
    <div style="width: 900px; height: 550px; box-shadow: 0 0 20px 0 #30cfd0; border-radius: 5px; display: flex; overflow: hidden">
      <div style="width: 60px; background-color: #333; display: flex; flex-direction: column; align-items: center">
        <el-image style="width: 40px; height: 40px; margin-top: 20px; cursor: pointer" src="http://rraqz99qm.hn-bkt.clouddn.com/R-C.png?e=1678441486&token=d0ux_HXMA9iRwofw9DVL45lYl9QvrIzlo9e8kHU8:yHR0RTk_w--dVzkaMOCy_m8bHEM=" fit="fit"></el-image>
        <div style="margin-top: 20px">
          <el-menu :default-active="defaultActive" style="background: none" active-text-color="#FF7800" router>
            <el-menu-item index="chat">
              <i class="iconfont icon-a-14" style="font-size: 20px"></i>
            </el-menu-item>
            <el-menu-item index="friends">
              <i class="iconfont icon-tongxunlu" style="font-size: 20px"></i>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="iconfont icon-a-12" style="font-size: 20px"></i>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="iconfont icon-tianjia1" style="font-size: 20px"></i>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="iconfont icon-a-14" style="font-size: 20px"></i>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="iconfont icon-a-14" style="font-size: 20px"></i>
            </el-menu-item>
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
import axios from 'axios'
import { listSearchMixin } from '@/mixin'
import leftIndex from './leftIndex.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  mixins: [listSearchMixin],
  data() {
    return {}
  },
  components: {
    leftIndex
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    },
    ...mapGetters['basicUserInfo']
  },
  created() {
    this.getBasicUserInfo()
  },
  mounted() {
    // this.newWebSocket()
  },
  methods: {
    ...mapMutations({
      setBasicUserInfo: 'setBasicUserInfo'
    }),
    /* newWebSocket() {
      let ws = 'ws://localhost:8001/websocket/chat/' + this.basicUserInfo.id
      this.$root.$socket = new WebSocket(ws)
    } */
    async getBasicUserInfo() {
      console.log('set')
      /* let params = {
        url: api.getBasicUserInfo,
        method: 'get'
      } */
      let res = await axios.get(api.getBasicUserInfo)
      if (res.success) {
        console.log(1)
        this.setBasicUserInfo(res.data)
      }
      /* this.sendReq(params, (res) => {
        console.log(1)
        if (res.success) {
          this.setBasicUserInfo(res.data)
        }
      }) */
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
