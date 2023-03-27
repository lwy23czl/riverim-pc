import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    objectChat: {}, //聊天对象
    msgList: [], //消息列表
    basicUserInfo: {}, //基本用户信息
    chatNum: 0, //未查看的聊天信息数量
    currentId: '' //被选中的聊天对象id
  },
  getters: {
    objectChat: (state) => state.objectChat,
    msgList: (state) => state.msgList,
    basicUserInfo: (state) => state.basicUserInfo,
    chatNum: (state) => state.chatNum,
    currentId: (state) => state.currentId
  },
  mutations: {
    //设置聊天对象
    setObjectChat(state, objectChat) {
      // console.log(objectChat)
      state.objectChat = objectChat
    },
    //设置当前聊天对象id
    setCurrentId(state, currentId) {
      // console.log(objectChat)
      state.currentId = currentId
    },
    //设置消息列表
    setMsgList(state, msgList) {
      state.msgList = msgList
    },
    //设置基本用户信息
    setBasicUserInfo(state, basicUserInfo) {
      state.basicUserInfo = basicUserInfo
    },
    //设置未查看聊天信息的数量
    setChatNum(state, chatNum) {
      state.chatNum = chatNum
    },
    //清空vuex
    reSetVuex(state) {
      state.basicUserInfo = {}
      state.objectChat = {}
      state.currentId = ''
      state.msgList = []
      state.chatNum = 0
    }
  },
  actions: {},
  modules: {}
})
