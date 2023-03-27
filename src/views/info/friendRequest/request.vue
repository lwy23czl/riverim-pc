<template>
  <div v-loading="loading">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="headPortrait" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.headPortrait" alt="" style="width: 50px; height: 50px" />
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column label="验证信息">
        <template slot-scope="scope">
          <el-tooltip style="cursor: pointer" :content="scope.row.validationMessage" placement="top">
            <span>{{ scope.row.validationMessage.substring(0, 8) }}{{ scope.row.validationMessage.length > 8 ? '...' : '' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="openDialog(scope.row.fromId)" type="primary" size="small">同意</el-button>
          <el-button @click="refuse(scope.row.fromId)" type="danger" size="small">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 写一个表单，用来对收到的好友请求进行回复，需要输入返回给对方的消息，和设置对方的备注，页面简约美观，使用elementui的dialog组件 -->
    <el-dialog title="回复好友请求" :visible.sync="dialogVisible" width="50%" class="feedback-dialog">
      <div class="feedback-form">
        <el-input v-model="feedbackMsg" type="textarea" style="margin-bottom: 20px" :rows="3" placeholder="请输入回复消息"></el-input>
        <!-- 暂时取消备注模块 -->
        <!-- <el-input v-model="remarks" placeholder="请输入备注"></el-input> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="giveFeedback()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
import { listSearchMixin } from '@/mixin'
export default {
  mixins: [listSearchMixin],
  data() {
    return {
      objId: '',
      loading: false,
      isAgree: 0,
      feedbackMsg: '',
      remarks: '',
      tableData: [],
      dialogVisible: false
    }
  },
  created() {
    this.getFriendRequestList()
  },
  methods: {
    refuse(id) {
      this.objId = id
      this.isAgree = 1
      this.giveFeedback()
    },
    openDialog(id) {
      this.objId = id
      this.dialogVisible = true
    },

    getFriendRequestList() {
      this.loading = true
      this.sendReq(
        {
          url: api.getFriendRequestList,
          method: 'get'
        },
        (res) => {
          if (res.success) {
            this.loading = false
            this.tableData = res.data
          }
        }
      )
    },
    giveFeedback() {
      this.loading = true
      this.sendReq(
        {
          url: api.giveFeedback,
          data: {
            toId: this.objId,
            isAgree: this.isAgree,
            feedbackMsg: this.feedbackMsg,
            remarks: this.remarks
          }
        },
        (res) => {
          if (res.success) {
            this.loading = false
            this.$message.success('处理成功！')
            ;(this.isAgree = 0), (this.feedbackMsg = '')
            this.remarks = ''
            this.dialogVisible = false
            this.getFriendRequestList()
            //发送webscocket提醒
            this.$root.$socketApply.send(
              JSON.stringify({
                toId: this.objId,
                type: 'apply'
              })
            )
          } else {
            this.$message.error(res.msg)
          }
        }
      )
    }
  }
}
</script>
<style lang="css" scoped>
>>> .el-table .cell {
  text-align: center !important;
}

.feedback-dialog {
  border-radius: 10px;
}

.feedback-form {
  margin: 20px 0;
}

.feedback-form >>> .el-input {
  margin-bottom: 20px;
}

.dialog-footer {
  padding: 10px 20px;
  text-align: center;
}
</style>
