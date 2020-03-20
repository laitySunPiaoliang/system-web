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
              <!-- <el-switch
                v-model="row.isActived"
                active-color="#13ce66"
                inactive-color="#ff4949"
              /> -->
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
              <el-button type="primary" size="mini" @click="handleUpdate">
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 500px; margin-left:50px;">
        <el-form-item label="用户名" prop="title">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="密码" prop="title">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="年龄" prop="title">
          <el-input v-model="temp.age" />
        </el-form-item>
        <el-form-item label="电话" prop="title">
          <el-input v-model="temp.phone" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog></div>
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
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
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
    },

    // 添加弹出框方法
    handleCreate() {
    // this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    // this.$nextTick(() => {
    // this.$refs['dataForm'].clearValidate()
    // })
    },
    // 添加请求方法
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
        }
      })
    },
    handleUpdate() {
    // this.resetTemp()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    // this.$nextTick(() => {
    // this.$refs['dataForm'].clearValidate()
    // })
    }
  }

}
</script>
