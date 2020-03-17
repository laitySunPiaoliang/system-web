<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :md="4">
        <el-card class="box-card" style="width:100%;height:1000px">
          <div slot="header" class="clearfix">
            <span>集团</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <i class="el-icon-circle-plus-outline" />
            </el-button>
          </div>
          <div>
            <DeptTree />
          </div>
        </el-card>
      </el-col>
      <el-col :lg="20">
        <el-card class="box-card" style="width:100%">
          <div slot="header" class="clearfix">
            <span>用户</span>
            <el-button style="float: right; padding: 3px 0" type="text">
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
        <RoleCheckbox style="margin-top:20px" />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Pagination from '@/components/Pagination'
import { getUserList } from '@/api/user'
import RoleCheckbox from './components/roleCheckbox'
import DeptTree from './components/deptTree'

export default {
  name: 'User',
  components: { Pagination, RoleCheckbox, DeptTree },
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

  }
}
</script>

<style lang="scss">
</style>
