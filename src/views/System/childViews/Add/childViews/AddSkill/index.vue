<template>
  <div class="Skill view_add">
    <transition name="fade">
      <div class="content" v-if="show">
        <!-- 左边 -->
        <div class="left">
          <FormInput label="名称" v-model="skill_data.name" placeholder="技能名称" />
          <FormInput label="CD" v-model="skill_data.cd" placeholder="冷却时间" />
          <FormInput label="消耗" v-model="skill_data.consume" placeholder="法力消耗" />

          <!-- 设置技能类型 -->
          <FormSelect :data="types" v-model="skill_type" :value="skill_type" label="技能类型" @change="selectType" />
          <div class="type-list">
            <transition-group name="delSkillType">
              <div class="skill-type" v-for="(item) in select_types" :key="item">
                <span class="name">{{ item }}</span>
                <span class="del cursor-pointer" @click="delSkillType(index)">×</span>
              </div>
            </transition-group>
          </div>

          <!-- 技能描述 -->
          <LibRichText v-model="skill_data.desc" placeholder="技能描述" />
        </div>

        <!-- 右边 -->
        <div class="right">
          <div class="skill" v-for="(item, index) in skills" :key="index">
            <AddSkillBasic :data="item" :index="index" :activeIndex="currentIndex" @click="currentIndex = index" />
          </div>
        </div>
      </div>
    </transition>

    <!--//%%%%%··········发布按钮··········%%%%%//-->
    <LibCommitBtn class="LibCommitBtn" size="50px" @commit="add" :finish="finish" title="发布" />

    <!--//%%%%%··········取消发布··········%%%%%//-->
    <LibCancelBtn class="LibCancelBtn" size="50px" @close="close" title="取消" />
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import viewHide from '../../../../hooks/useViewHide.js';
import switchStore from '@/store/globalSwitch.js';
import AddSkillBasic from './childComps/AddSkillBasic.vue';

const $store = switchStore();
const emit = defineEmits(['update:modelValue']);
const { show, finish, close } = viewHide(emit);

const skill_type = ref('');
const currentIndex = ref(0); //用于设置编辑状态
const select_types = ref([]);
const skill_data = reactive({
  name: '',
  desc: '',
  cd: '',
  consume: '',
  img: '',
  type: [],
  effect: [],
});
const skills = [
  {
    name: '纵横兵法',
    desc: '鬼谷子脱离敌方视野3秒后，玄微子会再次归巢到法杖中，下一次普通攻击变更为强化攻击，强化攻击会造成300（+45%法术加成）点法术伤害并将范围内的敌人减少50%移动速度，持续1.5秒；如果使用强化攻击时，鬼谷子不处于敌方视野，则纵横兵法的冷却时间将会增加至10秒',
    img: 'http://lengyibai.gitee.io/wzry-material/hero/67/ji_neng/0.png',
    type: ['法术', '控制'],
  },
  {
    name: '先知·神隐',
    desc: '鬼谷子命令玄微子包裹自身和1500距离内的队友，准备1秒后进入伪装状态；伪装状态下鬼谷子和队友将增加30%移动速度；同时将会探查到距离鬼谷子最近的一名敌方英雄视野，伪装状态最多持续4秒；伪装状态下，如果使用普通攻击、技能或敌方造成负面效果时会立即解除伪装状态',
    cd: 10,
    consume: 70,
    img: 'http://lengyibai.gitee.io/wzry-material/hero/67/ji_neng/1.png',
    type: ['法术'],
    effect: [
      {
        type: '基础伤害',
        phase: [450, 540, 630, 720, 810, 900],
      },
      {
        type: '降低双防',
        phase: ['25%', '28%', '31%', '34%', '37%', '40%'],
      },
    ],
  },
  {
    name: '万物有灵',
    desc: '<p>鬼谷子召唤大量玄微子在自身周围聚集，对范围内敌人每0.5秒造成<span style="color: rgb(153, 51, 255);">100/120/140/160/180/200（+15%法术加成）点法术伤害</span>，持续2秒；2秒后玄微子集结完毕，对范围内敌人造成<span style="color: rgb(153, 51, 255);">400（+60%法术加成）</span>点法术伤害，同时将敌人拉扯到鬼谷子身旁并将其晕眩1秒；如果该伤害命中敌方英雄，鬼谷子和范围内的队友将获得可抵免<span style="color: rgb(153, 51, 255);">500/600/700/800/900/1000（+100%法术加成）</span>点伤害的护盾。</p>',
    type: ['法术', '控制'],
    cd: 10,
    consume: 60,
    img: 'http://lengyibai.gitee.io/wzry-material/hero/67/ji_neng/2.png',
    effect: [
      {
        type: '基础伤害',
        phase: [100, 120, 140, 160, 180, 200],
      },
      {
        type: '冷却时间',
        phase: [10, 9.8, 9.6, 9.4, 9.2, 9],
      },
      {
        type: '护盾减免',
        phase: [500, 600, 700, 800, 900, 1000],
      },
    ],
  },
  {
    name: '先知·雾隐',
    desc: '鬼谷子命令玄微子包裹自身和1500距离内的队友，准备1秒后进入伪装状态；伪装状态下鬼谷子和队友将增加30%移动速度；同时将会探查到距离鬼谷子最近的一名敌方英雄视野，伪装状态最多持续4秒；伪装状态下，如果使用普通攻击、技能或敌方造成负面效果时会立即解除伪装状态',
    cd: 35,
    consume: 120,
    img: 'http://lengyibai.gitee.io/wzry-material/hero/67/ji_neng/3.png',
    effect: [
      {
        type: '冷却时间',
        phase: [35, 30, 25],
      },
    ],
  },
];
const types = [
  {
    id: 1,
    name: '真实',
  },
  {
    id: 2,
    name: '物理',
  },
  {
    id: 3,
    name: '法术',
  },
  {
    id: 4,
    name: '控制',
  },
];

const selectType = (v) => {
  setTimeout(() => {
    select_types.value.push(v);
    select_types.value = [...new Set(select_types.value)];
    skill_type.value = '请选择';
  });
};

const delSkillType = (index) => {
  select_types.value.splice(index, 1);
};

setTimeout(async () => {
  $store.$loading.show('正在加载');
  $store.$loading.close().then(() => {
    show.value = true;
  });
}, 1000);

const add = () => {
  setTimeout(() => {
    finish.value = true;
    setTimeout(() => {
      close();
    }, 250);
  }, 250);
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
