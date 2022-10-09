<template>
  <div class="Hero view_add">
    <transition name="fade">
      <div class="content" v-if="show">
        <!-- 英雄名、代号、身高 -->
        <div class="flex-box">
          <FormInput label="id" required v-model="hero_data.id" />
          <FormInput label="英雄名" required v-model="hero_data.name" />
          <FormInput label="代号" required v-model="hero_data.mark" />
          <FormInput label="身高" number v-model="hero_data.height" />
        </div>

        <!-- 选择器相关 -->
        <div class="flex-box">
          <FormSelect v-for="(v, k) in info" :key="k" :label="v[0]" :data="type_tree[v[1]]" v-model="hero_data[v[2]]" />
        </div>

        <!-- 属性相关 -->
        <div class="flex-box">
          <FormInput :label="v" label-width="200px" v-for="(v, k) in attr" :key="k">
            <LibRange style="width: 200px" :text="hero_data[k] + '%'" v-model="hero_data[k]" />
          </FormInput>
        </div>

        <!-- 设置封面 -->
        <AddHeroCover />

        <!-- 设置头像&海报 -->
        <FormImg
          label="皮肤头像&海报"
          :getLink="getLink"
          :imgs="[hero_data.headImg, hero_data.poster]"
          :keys="['headImg', 'poster']"
          :values="{ headImg: '头像', poster: '海报' }"
        />
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn class="LibCommitBtn" size="50px" @commit="commit" :finish="finish" v-model="status" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="LibCancelBtn" size="50px" @close="close" title="取消" />

    <!-- 添加图片链接弹窗组件 -->
    <AddLink
      v-model="show_AddLink"
      :title="AddLink_title"
      :placeholder="AddLink_placeholder"
      @get-link="getLink"
      :keyword="AddLink_key"
    />
  </div>
</template>
<script setup>
import { provide, reactive, ref } from 'vue';
import { addHero } from '@/api/main/hero/self/index.js';
import { addHeroList } from '@/api/main/hero/basis/index.js';
import { getAreaType } from '@/api/main/tree/areaType/index.js'; //区域
import { getCampType } from '@/api/main/tree/campType/index.js'; //阵营
import { getEnergyType } from '@/api/main/tree/energyType/index.js'; //能量
import { getIdentityType } from '@/api/main/tree/identityType/index.js'; //身份
import { getLocationType } from '@/api/main/tree/locationType/index.js'; //定位
import { getPeriodType } from '@/api/main/tree/periodType/index.js'; //时期
import { getProfessionType } from '@/api/main/tree/professionType/index.js'; //职业
import { getSpecialtyType } from '@/api/main/tree/specialtyType/index.js'; //特长
import AddHeroCover from './childComps/AddHeroCover/index.vue'; //设置封面
import viewHide from '../../../../hooks/useViewHide.js';
import switchStore from '@/store/globalSwitch.js';

const emit = defineEmits(['update:modelValue']);
const {
  show, finish, status, close,
} = viewHide(emit);

const AddLink_set_desc = {
  headImg: '头像链接',
  name: '英雄名',
  mark: '代号',
  height: '身高',
  cover: '封面',
  poster: '海报',
};
const attr = {
  survival: '生存能力',
  attack: '攻击伤害',
  effect: '技能效果',
  difficulty: '上手难度',
};
const info = [
  ['区域', 'areaType', 'area'],
  ['阵营', 'campType', 'camp'],
  ['能量', 'energyType', 'energy'],
  ['身份', 'identityType', 'identity'],
  ['定位', 'locationType', 'location'],
  ['时期', 'periodType', 'period'],
  ['职业', 'professionType', 'profession'],
  ['特长', 'specialtyType', 'specialty'],
];

/* 弹窗相关 */
const show_AddLink = ref(false); //显示添加链接弹窗
const AddLink_key = ref(''); //当前谁在使用弹窗(字段名)
const AddLink_title = ref(''); //弹窗左上角标题
const AddLink_placeholder = ref(''); //弹窗输入框描述

/* 英雄数据 */
const hero_data = reactive({
  id: '',
  name: '',
  mark: '',
  cover: '',
  headImg: '',
  poster: '',
});
const type_tree = reactive({
  areaType: [],
  campType: [],
  energyType: [],
  identityType: [],
  locationType: [],
  periodType: [],
  professionType: [],
  specialtyType: [],
});

const $switchStore = switchStore();
setTimeout(async () => {
  $switchStore.$loading.show('正在加载区域类型表0/7');
  type_tree.areaType = (await getAreaType()).data;
  $switchStore.$loading.show('正在加载阵营类型表1/7');
  type_tree.campType = (await getCampType()).data;
  $switchStore.$loading.show('正在加载能量类型表2/7');
  type_tree.energyType = (await getEnergyType()).data;
  $switchStore.$loading.show('正在加载身份类型表3/7');
  type_tree.identityType = (await getIdentityType()).data;
  $switchStore.$loading.show('正在加载定位类型表4/7');
  type_tree.locationType = (await getLocationType()).data;
  $switchStore.$loading.show('正在加载时期类型表5/7');
  type_tree.periodType = (await getPeriodType()).data;
  $switchStore.$loading.show('正在加载职业类型表6/7');
  type_tree.professionType = (await getProfessionType()).data;
  $switchStore.$loading.show('正在加载特长类型表7/7');
  type_tree.specialtyType = (await getSpecialtyType()).data;
  await $switchStore.$loading.close();
  show.value = true;
}, 1000);

/* 获取链接 */
const getLink = (link, key) => {
  hero_data[key] = link;
};

/* 设置头像及名字 */
const setKey = (key) => {
  show_AddLink.value = true;
  AddLink_title.value = `设置${AddLink_set_desc[key]}`;
  AddLink_placeholder.value = `请输入${AddLink_set_desc[key]}`;
  AddLink_key.value = key;
};

/* 设置属性值 */
const setValue = (k, v) => {
  hero_data[k] = v;
};

/* 发布及取消 */
const commit = async () => {
  const {
    id, mark, name, cover, headImg, poster,
  } = hero_data;
  if (id && mark && name && cover && headImg && poster) {
    await addHero(hero_data);
    await addHeroList({ id: hero_data.id, name: hero_data.name });
    finish.value = true;
    setTimeout(() => {
      close();
      $switchStore.$tip('发布成功', 'info');
    }, 500);
  } else {
    $switchStore.$tip('请完整填写', 'error');
    status.value = 0;
  }
};

provide('hero_data', hero_data);
provide('setKey', setKey);
provide('setValue', setValue);
</script>
<style scoped lang="less">
.Hero {
  .content {
    .flex-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      margin-top: 25px;
    }
  }
}
</style>
