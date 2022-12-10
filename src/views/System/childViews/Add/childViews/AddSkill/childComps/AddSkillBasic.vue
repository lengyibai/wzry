<template>
  <div class="add-skill-basic cursor-pointer" :class="{ active: active }">
    <div class="title">
      <img :src="data.img || 'https://lengyibai.gitee.io/wzry-material/image/unknown.png'" alt="" />
      <div class="name">{{ data.name }}</div>
      <div class="types">
        <K-SkillTypeTag v-for="(item, index) in data.type" :type="item" :key="index" />
      </div>
      <button class="del lib-click" v-show="active" @click.stop="del">删除</button>
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
        <div class="phase">{{ item.phase?.join(" | ") }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { skillDefault } from "@/defaultValue/defaults";

interface Props {
  data: typeof skillDefault; //技能信息
  index: number; //当前技能索引
  activeIndex: number; //编辑中的技能索引
}

const props = withDefaults(defineProps<Props>(), {
  data: () => skillDefault,
  index: 0,
  activeIndex: 0,
});

const active = ref(false); //是否处于被编辑中

interface Emits {
  (e: "del", v: number): void;
}
const emit = defineEmits<Emits>();

/* 删除技能 */
const del = () => {
  emit("del", props.index);
};

/* 通过判断点击的索引号设置编辑中 */
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
  }
);
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
