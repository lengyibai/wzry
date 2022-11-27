<template>
  <div class="story view-add">
    <transition name="fade">
      <div class="content" v-show="show">
        <SelectHero v-model="hero_id" key="SelectHero" />
        <div class="title">英雄故事</div>
        <LibRichText width="75vw" class="lib-rich-text" v-model="form_data!.gamestory" />
        <div class="title">历史故事</div>
        <LibRichText width="75vw" class="lib-rich-text" v-model="form_data!.history" />
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn class="lib-commit-btn" size="50px" @commit="commit" :finish="finish" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="lib-cancel-btn" size="50px" @close="cancel" title="取消" />

    <!-- 确认关闭 -->
    <ConfirmClose v-model="show_ConfirmClose" @close="close" />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { updateHero } from "@/api/main/game/index";
import switchStore from "@/store/globalSwitch";
import viewHide from "../../../../hooks/useViewHide";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
interface Story {
  gamestory: string; //游戏中的故事
  history: string; //历史故事
}

const emit = defineEmits<Emits>();
const $switchStore = switchStore();

const { hero_id, show, finish, form_data, show_ConfirmClose, cancel, close } = viewHide<Story>(emit, "add_story");

/* 判断是否存在缓存 */
form_data.value ??= {
  gamestory: "",
  history: "",
};

/* 发布 */
const commit = async () => {
  await updateHero(hero_id.value!, form_data.value);
  setTimeout(() => {
    finish.value = true;
    close();
    $switchStore.$tip("发布成功", "info");
  }, 500);
};

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 1000);
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
