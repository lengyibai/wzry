<template>
  <div class="AddSkillBasic" :class="{ active: active }">
    <div class="title">
      <img :src="data.img" alt="" />
      <div class="name">{{ data.name }}</div>
      <div class="types">
        <K-SkillTypeTag v-for="(item, index) in data.type" :type="item" :key="index" />
      </div>
      <div class="editing" v-show="active">编辑中...</div>
    </div>
    <div class="nums" v-if="data.cd">
      <div class="cd">CD：{{ data.cd }}</div>
      <div class="consume">法力消耗：{{ data.consume }}</div>
    </div>
    <div class="desc" v-html="data.desc"></div>
    <div class="effect" v-if="data.effect">
      <div class="box" v-for="(item, index) in data.effect" :key="index">
        <div class="type">{{ item.type }}：</div>
        <div class="phase">{{ item.phase.join(' | ') }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {};
    },
  },
  index: {
    type: Number,
    default: 0,
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
});

const active = ref(false);
watch(
  () => props.activeIndex,
  (v) => {
    if (v === props.index) {
      active.value = true;
    } else {
      active.value = false;
    }
  },
  {
    immediate: true,
  },
);
</script>
<style scoped lang="less">
.AddSkillBasic {
  margin: 15px;
  padding: 15px;
  .title {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    img {
      width: 75px;
      height: 75px;
      margin-right: 25px;
    }
    .name {
      font-size: 25px;
      margin-right: 2em;
    }
    .types {
      display: flex;
      align-items: center;
    }
    .editing{
      position: absolute;
      right: 0;
      font-size: 25px;
      color: var(--theme-color-two);
    }
  }
  .nums {
    display: flex;
    margin-bottom: 10px;
    .cd {
      margin-right: 2em;
    }
  }
  .desc {
    margin-bottom: 10px;
  }
  .effect {
    .box {
      display: flex;
    }
  }
}

.active {
  outline: 1px dashed #fff;
}
</style>
