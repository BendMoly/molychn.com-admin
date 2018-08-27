<template>
  <section class="main-container">
    <lcy-nav class="nav"></lcy-nav>
    <div class="cont">
      <lcy-header></lcy-header>
      <router-view class="view-container"></router-view>
    </div>
  </section>
</template>

<script>
import lcyNav from './components/nav.vue'
import lcyHeader from '@/components/header.vue'
export default {
  components: {
    lcyNav,
    lcyHeader
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/default.scss';
.nav{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  background: #2d3641;
}
.cont{
  margin-left: 200px;
}
.view-container{
  padding: 20px;
}
</style>
