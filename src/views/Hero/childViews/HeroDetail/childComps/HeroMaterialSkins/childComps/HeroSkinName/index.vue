<template>
  <div class="HeroSkinName">
    <div class="skin-name" v-if="toggle && name" v-typewriterSingle key="a">
      {{ name }}
    </div>
    <!--····用于触发打字机····-->
    <div class="skin-name" v-if="!toggle && name" v-typewriterSingle key="b">
      {{ name }}
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  toggle: boolean; //触发打字机
  name: string; //皮肤名
}

withDefaults(defineProps<Props>(), {
  toggle: false,
  name: ''
})
</script>
<style scoped lang="less">
@import './index.less';
</style>
