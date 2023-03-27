export const api = {
  login: '/api/login',
  logout: '/api/logout',
  upload: '/api/file/upload',
  register: '/api/register',
  getCode: '/api/code', //获取验证码
  getChatList: '/api/chat/list', //获取消息列表
  getBasicUserInfo: '/api/user/basicUserInfo', //获取用户基本信息
  getChatObjectCardList: '/api/chat/cardList', //获取聊天卡片列表
  getFriendList: '/api/friend/list', //获取好友列表
  searchUser: '/api/user/search', //搜索用户
  addFriendRequest: '/api/friendRequest/add', //发送好友请求
  getUnApplyCount: '/api/friendRequest/applyCount', //获取未处理好友请求数量
  getFriendRequestList: '/api/friendRequest/list', //获取好友请求列表
  giveFeedback: '/api/friendRequest/feedback', //对收到的好友请求进行反馈
  getFeedbackList: '/api/friendRequest/feedbackList', //获取反馈信息列表
  upChatNumItem: '/api/chatNum/upNum', //将与当前用户的未查看新纪录清零
  getChatSum: '/api/chatNum/sum', //获取未查看信息的数量
  addChatNum: '/api/chatNum/addNum' //将未查看聊天记录数量++
}
export default api
