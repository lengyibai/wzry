<template>
  <transition name="sidebar">
    <!-- 侧边栏(英雄和装备的额外侧边栏) -->
    <div class="Sidebar" v-show="isShow">
      <el-menu
        :default-active="activeMenu"
        background-color="transparent"
        text-color="var(--theme-color-five)"
        active-text-color="var(--white)"
        @select="$click"
      >
        <!-- 菜单 -->
        <sidebar-item v-bind="$attrs" v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </div>
  </transition>
</template>

<script>
import SidebarItem from './SidebarItem';

export default {
  name: 'Sidebar',
  components: { SidebarItem },
  data() {
    return { isShow: false };
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true;
    }, 500);
  },
};
</script>
<style scoped lang="less">
.Sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: calc(100vh - 75px - 56px);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden auto !important;
}
</style>
