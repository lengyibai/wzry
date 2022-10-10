<template>
  <div class="Story view_add">
    <transition name="fade">
      <div class="content" v-show="show">
        <div class="title">英雄故事</div>
        <LibRichText class="LibRichText" v-model="a" />
        <div class="title">历史故事</div>
        <LibRichText class="LibRichText" v-model="b" />
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
import viewHide from '../../../../hooks/useViewHide.js';

const emit = defineEmits(['update:modelValue']);
const { show, finish, close } = viewHide(emit);

const a = ref('');
const b = ref('');
const story_data = reactive({
  gamestory: '',
  history: '',
});

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 1000);
});

const commit = () => {
  setTimeout(() => {
    finish.value = true;
    setTimeout(() => {
      close();
    }, 250);
  }, 250);
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
      margin-bottom: 50px;
      width: 75%;
    }
  }
}
</style>
