<template>
  <div class="app-container">
      <el-date-picker v-model="date" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>

      <el-button-group style="margin-left: 10px;">
          <el-button type="primary" icon="el-icon-edit" @click="handleClick">搜索</el-button>
          <el-button type="success" icon="el-icon-share" @click="handleExportData">导出</el-button>
      </el-button-group>

      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;" :row-class-name="tableRowClassName">
          <el-table-column prop="time" label="记录时间">
          </el-table-column>
          <el-table-column prop="fee" label="小红书分时消费数">
          </el-table-column>
          <el-table-column prop="impression" label="小红书分时展现数" width="140">
          </el-table-column>
          <el-table-column prop="ctr" label="小红书点击率" width="120">
          </el-table-column>
          <el-table-column prop="messageUser" label="小红书分时咨询人数" width="150">
          </el-table-column>
          <el-table-column prop="initiativeMessage" label="小红书分时开口数" width="150">
          </el-table-column>
          <el-table-column prop="messageConsultCpl" label="小红书咨询成本" width="120">
          </el-table-column>
          <el-table-column prop="initiativeMessageCpl" label="小红书开口成本" width="120">
          </el-table-column>
          <el-table-column prop="add_customer" label="企飞分时新增好友" width="140">
          </el-table-column>
          <el-table-column prop="initiativeRatio" label="分时开口比" width="100">
          </el-table-column>
          <el-table-column prop="addRatio" label="分时添加比" width="100">
          </el-table-column>
          <el-table-column prop="addCost" label="分时添加成本" width="110">
          </el-table-column>
      </el-table>

      <el-pagination style="text-align: right; margin-top: 10px;" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[15, 30, 50]" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
  </div>
</template>

<script>
import { getDetails } from '@/api/detail'
import moment from 'moment'

export default {
  data() {
      return {
          date: [],
          tableData: [],
          pageNum: 1,
          pageSize: 15,
          total: 0,
      }
  },

  created() {
      const now_date = new Date() 
      const bagin_date = new Date(now_date.getFullYear(), now_date.getMonth(), now_date.getDate(), 0,0,0)
      this.date[0] = moment(bagin_date).format('YYYY-MM-DD HH:mm:ss');
      this.date[1] = moment(now_date).format('YYYY-MM-DD HH:mm:ss');
      this.init()
  },

  methods: {
      // table状态表格
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'success-row';
        }
        return '';
      },
      init() {
        getDetails({ pageNum: this.pageNum, pageSize: this.pageSize, starttime: this.date[0], endtime: this.date[1] }).then(res => {
              this.tableData = res.data.list
              this.total = res.data.total
          })
      },
      handleSizeChange(val) {
          this.pageSize = val
          this.init()
      },
      handleCurrentChange(val) {
          this.pageNum = val
          this.init()
      },
      handleClick() {
          this.init()
      },
      handleExportData() {
          exportExcel({ starttime: this.date[0], endtime: this.date[1] }).then(res => {
              let blob = new Blob([res], {type: 'application/vnd.ms-excel;charset=utf-8'})
              let documentElemet = document.createElement('a')
              const href = window.URL.createObjectURL(blob)
              documentElemet.href = href
              documentElemet.click()
              document.body.removeChild(downloadElement)
              window.URL.revokeObjectURL(href)
          })
      }
  }
}
</script>

<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>