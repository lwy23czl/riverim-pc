<template>
  <div v-loading="loading">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="headPortrait" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.headPortrait" alt="" style="width: 50px; height: 50px" />
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column label="回复">
        <template slot-scope="scope">
          <el-tooltip style="cursor: pointer" :content="scope.row.feedbackMsg" placement="top">
            <span>{{ scope.row.feedbackMsg.substring(0, 8) }}{{ scope.row.feedbackMsg.length > 8 ? '...' : '' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column label="处理结果">
        <template slot-scope="scope">
          <span>{{ scope.row.isAgree == 0 ? '已同意' : '被拒绝' }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '@/api'
import { listSearchMixin } from '@/mixin'
export default {
  mixins: [listSearchMixin],
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  created() {
    this.getFeedbackList()
  },
  methods: {
    getFeedbackList() {
      this.loading = true
      this.sendReq(
        {
          url: api.getFeedbackList,
          method: 'get'
        },
        (res) => {
          if (res.success) {
            this.loading = false
            this.tableData = res.data
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
</style>
