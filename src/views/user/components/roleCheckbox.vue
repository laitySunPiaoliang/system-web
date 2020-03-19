<template>

  <el-card class="box-card" style="width:100%">
    <div slot="header" class="clearfix">
      <span>角色</span>
      <el-button style="float: right; padding: 3px 0" type="text">
        <i class="el-icon-circle-plus-outline" />
      </el-button>
    </div>
    <div>

      <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
        <el-checkbox v-for="checked in roleList" :key="checked" :label="checked">{{ checked }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </el-card>

</template>

<script>
export default {
  name: 'RoleCheckbox',
  data() {
    return {
      roleList: ['第一个', '第二个', '第三个', '第四个', '第五个', '第六个', '第七个', '第八个', '第九个',
        '第十个', '第十一个', '第十二个', '第十三个', '第十四个', '第十五个', '第十六个', '第十七个', '第十八个',
        '第十九个', '第二十个', '第二十一个', '第二十二个'],
      checkedList: ['第二个']
    }
  },

  methods: {
    handleCheckedChange(value) {
      console.log(value)
    }
  }
}

</script>

<style lang="sass">
</style>
