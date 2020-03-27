<template>
  <el-tree :data="data" :expand-on-click-node="false" :props="defaultProps">
    <!--  @node-click="handleNodeClick" -->
    <span slot-scope="{ node, data }" class="custom-tree-node" @mouseenter="mouseenter(node)" @mouseleave="mouseleave(node)">
      <span>{{ node.label }}</span>
      <span v-show="node.btns">
        <el-link type="success" :underline="false" icon="el-icon-plus" size="mini" @click="() => add(data)">
          <!-- <i class="el-icon-plus" /> -->
        </el-link>
        <el-link type="primary" :underline="false" icon="el-icon-edit" size="mini" @click="() => edit(data)">
          <!-- <i class="el-icon-edit" /> -->
        </el-link>
        <el-link type="danger" :underline="false" icon="el-icon-circle-close" size="mini" @click="() => remove(node, data)">
          <!-- <i class="el-icon-circle-close" /> -->
        </el-link>
      </span>
    </span>
  </el-tree>
</template>

<script>
export default {
  name: 'DeptTree',
  data() {
    return {
      data: [{
        label: '一级 111',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
      // node: {
      //   btns: false
      // }
    }
  },
  methods: {
    handleNodeClick(data) {
    },
    mouseenter(node) {
      this.$set(node, 'btns', true)
    },
    mouseleave(node) {
      this.$set(node, 'btns', false)
    },
    add(data) {
      alert('add')
    },
    edit(data) {
      alert('edit')
    },
    remove(node, data) {
      console.log(node)
      console.log(data)
      alert('remove')
    }
  }
}
</script>

<style lang="scss">
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
  }
</style>
