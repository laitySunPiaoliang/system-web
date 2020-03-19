<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :md="4">
        <el-card class="box-card" style="width:100%;height:900px">
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
        <UserList />
        <RoleCheckbox style="margin-top:20px" />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import RoleCheckbox from './components/roleCheckbox'
import DeptTree from './components/deptTree'
import UserList from './components/userList'

export default {
  name: 'User',
  components: { RoleCheckbox, DeptTree, UserList }
}

</script>

<style lang="scss">
</style>
