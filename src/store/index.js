import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    objectChat: {}, //聊天对象
    msgList: [], //消息列表
    basicUserInfo: {} //基本用户信息
  },
  getters: {
    objectChat: (state) => state.objectChat,
    msgList: (state) => state.msgList,
    basicUserInfo: (state) => state.basicUserInfo
  },
  mutations: {
    //设置聊天对象id
    setObjectChat(state, objectChat) {
      // console.log(objectChat)
      state.objectChat = objectChat
    },
    //设置消息列表
    setMsgList(state, msgList) {
      state.msgList = msgList
    },
    //设置基本用户信息
    setBasicUserInfo(state, basicUserInfo) {
      state.basicUserInfo = basicUserInfo
    }
  },
  actions: {},
  modules: {}
})
