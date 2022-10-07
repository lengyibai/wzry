<template>
  <div class="AppMain">
    <router-view v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </router-view>
  </div>
</template>

<script></script>

<style scoped>
.AppMain {
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  height: calc(100% - 130px);
  padding: 25px;
}

/* 侧边栏切换路由 */
.sidebar_router-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.sidebar_router-leave-to {
  opacity: 0;
}

.sidebar_router-leave-active,
.sidebar_router-enter-active {
  transition: all 0.25s;
}
</style>
