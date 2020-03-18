<template>
  <div>
    <el-card class="box-card" style="width:100%">
      <div slot="header" class="clearfix">
        <span>用户</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleCreate">
          <i class="el-icon-circle-plus-outline" />
        </el-button>
      </div>
      <div>
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >

          <el-table-column label="用户名" min-width="12%" align="center">
            <template slot-scope="{row}">
              <span>{{ row.loginName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="年龄" min-width="8%" align="center">
            <template slot-scope="{row}">
              <span>{{ row.age }}</span>
            </template>
          </el-table-column>
          <el-table-column label="电话" min-width="15%" align="center">
            <template slot-scope="{row}">
              <span>{{ row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="激活状态" min-width="8%" align="center">
            <template slot-scope="{row}">
              <span>{{ row.isActived | parseIsActived }}</span>
            </template>
          </el-table-column>
          <el-table-column label="添加时间" min-width="15%" align="center">
            <template slot-scope="{row}">
              <span>{{ row.inputDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="添加人" min-width="12%" align="center">
            <template slot-scope="{row}">
              <span>{{ row.inputName }}</span>
            </template>
          </el-table-column>
          <el-table-column :render-header="renderHeader" align="center" min-width="20%" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini">
                编辑
              </el-button>
              <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                注销
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </div>
    </el-card>

    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible"> -->
    <!--   <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>  -->
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getUserList } from '@/api/user'

export default {
  name: 'UserList',
  components: { Pagination },
  filters: {
    parseIsActived(isActived) {
      if (isActived) {
        return '激活'
      }
      return '注销'
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: undefined
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      }
    }
  },

  mounted() {

  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getUserList(this.listQuery).then(response => {
        this.list = response.result.list
        this.total = response.result.total
        this.listLoading = false
      })
    },
    renderHeader() {
      return (
        <div>
          <span>操作</span>
        </div>
      )
    },
    parseIsActived(flag) {
      alert(flag)
      if (!flag) {
        return '激活'
      }
      return '注销'
    }

  },
  // 添加弹出框方法
  handleCreate() {
    this.resetTemp()
    this.dialogStatus = 'create'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      this.$refs['dataForm'].clearValidate()
    })
  },
  // 添加请求方法
  createData() {
    this.$refs['dataForm'].validate((valid) => {
      if (valid) {
        this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
        this.temp.author = 'vue-element-admin'
      }
    })
  }
}
</script>
