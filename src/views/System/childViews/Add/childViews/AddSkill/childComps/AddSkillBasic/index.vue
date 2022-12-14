<template>
  <div class="right">
    <div
      class="add-skill-basic cursor-pointer"
      v-for="(item, index) in skills"
      :key="index"
      @click="handleSelectSkill(index)"
      :class="{ active: active(index) }"
    >
      <!-- 标题 -->
      <div class="title">
        <img :src="item.img || 'https://lengyibai.gitee.io/wzry-material/image/unknown.png'" alt="" />
        <div class="name">{{ item.name }}</div>
        <div class="types">
          <K-SkillTypeTag v-for="(type, index) in item.type" :type="type" :key="index" />
        </div>
        <button class="del lib-click" v-show="active(index)" v-if="index !== 0" @click.stop="del">删除</button>
        <div class="editing" v-show="active(index)">编辑中...</div>
      </div>

      <!-- 数字 -->
      <div class="nums" v-if="item.cd">
        <div class="cd">CD：{{ item.cd }}</div>
        <div class="consume">法力消耗：{{ item.consume }}</div>
      </div>

      <!-- 描述 -->
      <div class="desc" v-html="item.desc"></div>

      <!-- 效果 -->
      <div class="effect" v-if="item.effect">
        <div class="box" v-for="(effect, index) in item.effect" :key="index">
          <div class="type">{{ effect.type }}：</div>
          <div class="phase">{{ effect.phase?.join(" | ") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { skillDefault } from "@/defaultValue/defaults";

interface Props {
  skills: Hero.Skill[]; //技能列表
  activeIndex: number;
}

const props = withDefaults(defineProps<Props>(), {
  skills: () => [skillDefault],
  activeIndex: 0,
});

interface Emits {
  (e: "select", v: number): void;
  (e: "del"): void;
}
const emit = defineEmits<Emits>();

/* 是否处于被编辑中 */
const active = (index: number) => {
  return props.activeIndex === index;
};

/* 选择技能 */
const handleSelectSkill = (index: number) => {
  emit("select", index);
};

/* 删除技能 */
const del = () => {
  emit("del");
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
