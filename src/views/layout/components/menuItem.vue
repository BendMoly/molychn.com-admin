<template>
  <div v-if="!item.hidden&&item.children">
    <template v-for="child in item.children">
      <template v-if="isNotParent(child)">
        <el-menu-item :index="child.path" :key="child.name">
          <i :class="child.meta.icon"></i>
          <span slot="title">{{ child.meta.title }}</span>
        </el-menu-item>
      </template>
      <template v-else>
        <el-submenu :index="child.path" :key="child.name">
          <template slot="title">
            <i :class="child.meta.icon"></i>
            <span slot="title">{{ child.meta.title }}</span>
          </template>
          <menu-item :item="child"></menu-item>
        </el-submenu>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'menuItem',
  props: {
    item: null
  },
  methods: {
    isNotParent (child) {
      console.log(child)
      let hasChild = true
      return child.children ? !hasChild : hasChild
    }
  }
}
</script>
