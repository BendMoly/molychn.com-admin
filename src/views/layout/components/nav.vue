<template>
  <section class="nav-container">
    <el-menu
    :default-active="active"
    class="el-menu-vertical-demo"
    background-color="#2d3641"
    text-color="#fff"
    active-text-color="#409EFF"
    :router="true">
      <menu-item v-for="item in constantRouterMap" :item="item" :key="item.name"></menu-item>
    </el-menu>
  </section>
</template>

<script>
import { constantRouterMap } from '@/router'

import menuItem from './menuItem.vue'
export default {
  mounted () {
    console.log(this.constantRouterMap)
    this.activeIndex()
  },
  components: {
    menuItem
  },
  data () {
    return {
      active: '/dashboard',
      constantRouterMap
    }
  },
  methods: {
    activeIndex () {
      this.active = this.$route.path
      console.log(this.active)
    }
  },
  watch: {
    $route (to, from) {
      this.activeIndex()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
.fa{
  margin-right: 10px;
}
</style>
