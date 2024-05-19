<script setup lang="ts">
import YiBaoStage from "./components/YiBaoStage/index.vue";
import MenuTool from "./components/MenuTool/index.vue";
import PartList from "./components/PartList/index.vue";
import PersonalizedMenu from "./components/PersonalizedMenu/index.vue";
import NavBar from "./components/NavBar/index.vue";

defineOptions({
  name: "YiBao",
});
</script>

<template>
  <div class="yi-bao">
    <div class="top">
      <transition name="to-right-opacity" appear>
        <div class="left">
          <NavBar />
          <YiBaoStage />
          <MenuTool />
        </div>
      </transition>

      <transition name="to-left-opacity" appear>
        <div class="right">
          <PartList />
          <PersonalizedMenu />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
