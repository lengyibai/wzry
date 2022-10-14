<template>
  <div class="Story view_add">
    <transition name="fade">
      <div class="content" v-show="show">
        <SelectHero v-model="hero_id" key="SelectHero" />
        <div class="title">英雄故事</div>
        <LibRichText width="75vw" class="LibRichText" v-model="form_data.gamestory" />
        <div class="title">历史故事</div>
        <LibRichText width="75vw" class="LibRichText" v-model="form_data.history" />
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn class="LibCommitBtn" size="50px" @commit="commit" :finish="finish" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="LibCancelBtn" size="50px" @close="cancel" title="取消" />

    <!-- 确认关闭 -->
    <ConfirmClose v-model="show_ConfirmClose" @close="close" />
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { updateHero } from '@/api/main/game//index';
import switchStore from '@/store/globalSwitch';
import viewHide from '../../../../hooks/useViewHide';

const $switchStore = switchStore();
const emit = defineEmits(['update:modelValue']);
const {
  hero_id, show, finish, form_data, show_ConfirmClose, cancel, close,
} = viewHide(emit, 'add_story');

if (!form_data.value) {
  form_data.value = {
    gamestory: '',
    history: '',
  };
}
onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 1000);
});

const commit = async () => {
  await updateHero(hero_id.value, form_data.value);
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
