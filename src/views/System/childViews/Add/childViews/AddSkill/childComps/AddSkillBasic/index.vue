<script setup lang="ts">
import { KSkillTypeTag } from "@/components/business";
import { $concise } from "@/utils";

interface Props {
  /** 技能列表 */
  skills: Hero.Skill[];
  /** 当前点击的技能 */
  activeIndex: number;
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  select: [v: number];
  del: [];
}>();

const { getImgLink } = $concise;

/* 处于被编辑中 */
const active = (index: number) => $props.activeIndex === index;

/* 选择技能 */
const handleSelectSkill = (index: number) => $emit("select", index);

/* 删除技能 */
const handleDel = () => $emit("del");
</script>

<template>
  <div class="right">
    <div
      v-for="(item, index) in skills"
      :key="index"
      class="add-skill-basic global_cursor-pointer"
      :class="{ active: active(index) }"
      @click="handleSelectSkill(index)"
    >
      <!-- 标题 -->
      <div class="title">
        <img :src="item.img || getImgLink('unknown')" alt="" />
        <div class="name">{{ item.name }}</div>
        <div class="types">
          <KSkillTypeTag v-for="(type, index) in item.type" :key="index" :type="type" />
        </div>
        <button v-show="active(index)" v-if="index !== 0" class="del" @click.stop="handleDel">
          删除
        </button>
        <div v-show="active(index)" class="editing">编辑中...</div>
      </div>

      <!-- 数字 -->
      <div v-if="item.cd || item.consume" class="nums">
        <div class="cd">CD：{{ item.cd }}</div>
        <div class="consume">法力消耗：{{ item.consume }}</div>
      </div>

      <!-- 描述 -->
      <div class="desc" v-html="item.desc"></div>

      <!-- 效果 -->
      <div v-if="item.effect" class="effect">
        <div v-for="(effect, index) in item.effect" :key="index" class="box">
          <div class="type">{{ effect.name }}：</div>
          <div class="phase">{{ effect.phase?.join(" | ") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
