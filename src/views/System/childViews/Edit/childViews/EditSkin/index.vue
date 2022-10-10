<!-- 添加铭文 -->
<template>
  <div class="skin view_add">
    <transition name="fade">
      <div class="content" ref="content" v-if="show">
        <transition-group name="fade"></transition-group>
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn class="LibCommitBtn" size="50px" @commit="commit" :finish="finish" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="LibCancelBtn" size="50px" @close="close" title="取消" />
  </div>
</template>
<script setup>
import viewHide from '../../../../hooks/useViewHide.js';
import switchStore from '@/store/globalSwitch.js';

const emit = defineEmits(['update:modelValue']);
const { show, finish, close } = viewHide(emit);

const $store = switchStore();
setTimeout(async () => {
  $store.$loading.show('正在加载');
  $store.$loading.close().then(() => {
    show.value = true;
  });
}, 1000);

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
.skin {
  .content {
  }
}
</style>
