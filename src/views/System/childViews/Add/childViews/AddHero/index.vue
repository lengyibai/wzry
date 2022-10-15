<template>
  <div class="Hero view_add">
    <transition name="fade">
      <div class="content" v-if="show">
        <!-- 英雄名、代号、身高 -->
        <div class="flex-box">
          <FormInput label="id" required v-model="form_data.id" />
          <FormInput label="英雄名" required v-model="form_data.name" />
          <FormInput label="代号" required v-model="form_data.mark" />
          <FormInput label="身高" v-model="form_data.height" />
          <FormInput label="身份" number v-model="form_data.identity" />
        </div>

        <!-- 选择器相关 -->
        <div class="flex-box">
          <FormSelect v-for="(v, k) in info" :key="k" :label="v[0]" :data="type_list[v[1]]" v-model="form_data[v[2]]" :value="form_data[v[2]]" />
        </div>

        <!-- 特长 -->
        <FormSelect :data="type_list.specialtyType" v-model="specialty_type" :value="specialty_type" label="特长" @change="selectSpecialtyType" />
        <div class="type-list">
          <transition-group name="delspecialtyType">
            <div class="specialty-type" v-for="(item, index) in form_data.specialty" :key="item">
              <span class="name">{{ item }}</span>
              <span class="del cursor-pointer" @click="delspecialtyType(index)">×</span>
            </div>
          </transition-group>
        </div>

        <!-- 属性相关 -->
        <div class="flex-box">
          <FormRange :label="v" label-width="200px" :text="form_data[k] + '%'" v-model="form_data[k]" v-for="(v, k) in attr" :key="k" />
        </div>

        <!-- 设置封面 -->
        <AddHeroCover />

        <!-- 设置头像&海报 -->
        <div class="flex-box">
          <FormImg labelWidth="240px" label="皮肤头像&海报" :getLink="getLink" :imgs="[form_data.headImg, form_data.poster]" :keys="['headImg', 'poster']" :values="{ headImg: '头像', poster: '海报' }" />
        </div>
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn class="LibCommitBtn" size="50px" @commit="commit" :finish="finish" v-model="status" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="LibCancelBtn" size="50px" @close="cancel" title="取消" />

    <!-- 添加图片链接弹窗组件 -->
    <AddLink v-model="show_AddLink" :title="AddLink_title" :placeholder="AddLink_placeholder" @get-link="getLink" :keyword="AddLink_key" />

    <!-- 确认关闭 -->
    <ConfirmClose v-model="show_ConfirmClose" @close="close" />
  </div>
</template>
<script setup lang="ts">
import { provide, reactive, ref } from 'vue';
import {
  addHero,
  addHeroList,
  getCampType,
  getEnergyType,
  getLocationType,
  getPeriodType,
  getProfessionType,
  getSpecialtyType,
} from '@/api/main/game//index';
import { Hero } from '@/interface/hero'
import { heroDefault } from '@/interface/defaults'
import AddHeroCover from './childComps/AddHeroCover/index.vue'; //设置封面
import viewHide from '../../../../hooks/useViewHide';
import switchStore from '@/store/globalSwitch';

const $switchStore = switchStore();
const emit = defineEmits(['update:modelValue']);
const { show, finish, status, form_data, show_ConfirmClose, cancel, close } = viewHide<Hero>(emit, 'add_hero');

const AddLink_set_desc = {
  headImg: '头像链接',
  name: '英雄名',
  mark: '代号',
  identity: '身份',
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
  ['阵营', 'campType', 'camp'],
  ['能量', 'energyType', 'energy'],
  ['定位', 'locationType', 'location'],
  ['时期', 'periodType', 'period'],
  ['职业', 'professionType', 'profession'],
];

/* 弹窗相关 */
const show_AddLink = ref(false); //显示添加链接弹窗
const AddLink_key = ref(''); //当前谁在使用弹窗(字段名)
const AddLink_title = ref(''); //弹窗左上角标题
const AddLink_placeholder = ref(''); //弹窗输入框描述

if (!form_data.value) {
  form_data.value = heroDefault;
}

/* 类型列表 */
const type_list = reactive({
  campType: [],
  energyType: [],
  locationType: [],
  periodType: [],
  professionType: [],
  specialtyType: []
});

setTimeout(async () => {
  $switchStore.$loading.show('正在加载阵营类型表2/7');
  type_list.campType = (await getCampType()).data;
  $switchStore.$loading.show('正在加载能量类型表3/7');
  type_list.energyType = (await getEnergyType()).data;
  $switchStore.$loading.show('正在加载定位类型表4/7');
  type_list.locationType = (await getLocationType()).data;
  $switchStore.$loading.show('正在加载时期类型表5/7');
  type_list.periodType = (await getPeriodType()).data;
  $switchStore.$loading.show('正在加载职业类型表6/7');
  type_list.professionType = (await getProfessionType()).data;
  $switchStore.$loading.show('正在加载特长类型表7/7');
  type_list.specialtyType = (await getSpecialtyType()).data;
  await $switchStore.$loading.close();
  show.value = true;
}, 1000);

/* 选择特长后触发 */
const specialty_type = ref('');
const selectSpecialtyType = (v: string) => {
  setTimeout(() => {
    form_data.value.specialty.push(v);
    form_data.value.specialty = [...new Set(form_data.value.specialty)];
    specialty_type.value = '请选择';
  });
};

/* 删除特长 */
const delspecialtyType = (index) => {
  form_data.value.specialty.splice(index, 1);
};

/* 获取链接 */
const getLink = (link, key) => {
  form_data.value[key] = link;
};

/* 设置头像及名字 */
const setKey = (key) => {
  show_AddLink.value = true;
  AddLink_title.value = `设置${ AddLink_set_desc[key] }`;
  AddLink_placeholder.value = `请输入${ AddLink_set_desc[key] }`;
  AddLink_key.value = key;
};

/* 设置属性值 */
const setValue = (k, v) => {
  form_data.value[k] = v;
};

/* 发布及取消 */
const commit = async () => {
  const { id, mark, name, cover, headImg, poster } = form_data.value;
  if (id && mark && name && cover && headImg && poster) {
    await addHero(form_data.value);
    await addHeroList({ id: form_data.value.id, name: form_data.value.name });
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

provide('hero_data', form_data.value);
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

    .type-list {
      display: flex;
      min-height: 60px;
      margin-bottom: 25px;

      .specialty-type {
        width: fit-content;
        padding: 0.5em 0.5em;
        font-size: 25px;

        .name {
          color: var(--theme-color-four);
          margin-right: 0.5em;
        }

        .del {
          color: var(--theme-color-three);

          &:hover {
            color: var(--red);
          }
        }
      }
    }
  }
}

/* 进入前状态 */
.delspecialtyType-enter-from,
.delspecialtyType-leave-active {
  opacity: 0;
}

/* 进入和离开动画属性 */
.delspecialtyType-leave-active,
.delspecialtyType-enter-active,
.delspecialtyType-move {
  transition: all 0.5s;
}

/* 解决删除元素时，其他元素补位无动画 */
.delspecialtyType-leave-active {
  position: absolute;
  /* 必须为绝对定位 */
}
</style>
