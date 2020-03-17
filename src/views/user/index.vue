<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 75%;"
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
</template>

<script>

import Pagination from '@/components/Pagination'
import { getUserList } from '@/api/user'

export default {
  name: 'User',
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
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    renderHeader() {
      return (
        <div>
          <span>操作</span>
          <a style='margin-left:10px'><i class='el-icon-circle-plus-outline' /></a>
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
