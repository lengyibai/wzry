<template>
  <div class="Story view_add">
    <transition name="fade">
      <div class="content" v-show="show">
        <SelectHero v-model="hero_id" key="SelectHero" />
        <div class="title">英雄故事</div>
        <LibRichText class="LibRichText" v-model="story_data.gamestory" />
        <div class="title">历史故事</div>
        <LibRichText class="LibRichText" v-model="story_data.history" />
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn class="LibCommitBtn" size="50px" @commit="commit" :finish="finish" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="LibCancelBtn" size="50px" @close="close" title="取消" />
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { updateHero } from '@/api/main/hero/self/index.js';
import switchStore from '@/store/globalSwitch.js';
import viewHide from '../../../../hooks/useViewHide.js';

const $switchStore = switchStore();
const emit = defineEmits(['update:modelValue']);
const { show, finish, close } = viewHide(emit);

const hero_id = ref(0);
const story_data = reactive({
  gamestory: '',
  history: '',
});

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 1000);
});

const commit = async () => {
  await updateHero(hero_id.value, story_data);
  setTimeout(() => {
    finish.value = true;
    close();
    $switchStore.$tip('发布成功', 'info');
  }, 500);
};
</script>
<style scoped lang="less">
.Story {
  .content {
    padding-top: 50px;
    .title {
      margin-bottom: 0.5em;
      color: var(--theme-color-eight);
      font-size: 35px;
    }
    .LibRichText {
      width: 75%;
    }
  }
}
</style>
