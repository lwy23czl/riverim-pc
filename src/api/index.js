export const api = {
  login: '/api/login',
  register: '/api/register',
  getCode: '/api/code', //获取验证码
  getChatList: '/api/chat/list', //获取消息列表
  getBasicUserInfo: '/api/user/basicUserInfo', //获取用户基本信息
  getChatObjectCardList: '/api/chat/cardList', //获取聊天卡片列表
  getFriendList: '/api/friend/list', //获取好友列表
  searchUser: '/api/user/search', //搜索用户
  addFriendRequest: '/api/friendRequest/add', //发送好友请求
  getUnApplyCount: '/api/friendRequest/applyCount' //获取未处理好友请求数量
}
export default api
