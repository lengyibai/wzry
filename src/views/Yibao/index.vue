<script setup lang="ts">
import { onActivated } from "vue";

import YiBaoStage from "./components/YiBaoStage/index.vue";
import MenuTool from "./components/MenuTool/index.vue";
import PartList from "./components/PartList/index.vue";
import PersonalizedMenu from "./components/PersonalizedMenu/index.vue";
import NavBar from "./components/NavBar/index.vue";

import { usePlayAudio } from "@/hooks";

defineOptions({
  name: "YiBao",
});

const { playAudio } = usePlayAudio();

onActivated(() => {
  playAudio("jy55");
});
</script>

<template>
  <div class="yi-bao">
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
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
