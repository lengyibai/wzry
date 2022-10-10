<template>
  <div class="Skill view_add">
    <transition name="fade">
      <div class="content" v-if="show">
        <!-- 左边 -->
        <div class="left">
          <!-- 左上角新增 -->
          <LibSvg
            :svg="icon.ADDC"
            @click="addOne"
            class="addOne"
            color="var(--theme-color-seven)"
            enter-color="var(--theme-color-four)"
            key="LibSvg"
            size="50px"
            title="添加技能"
          />
          <!-- 设置图标 -->
          <FormImg
            :getLink="getLink"
            :imgs="[skill_list[currentIndex].img]"
            :keys="['img']"
            :values="{ img: '图标' }"
            label="图标"
            required
          />
          <SelectHero v-model="hero_id" key="SelectHero" />
          <FormInput label="名称" required v-model="skill_list[currentIndex].name" placeholder="技能名称" />
          <FormInput v-if="noFirst" label="CD" v-model="skill_list[currentIndex].cd" placeholder="冷却时间" number />
          <FormInput
            v-if="noFirst"
            label="消耗"
            v-model="skill_list[currentIndex].consume"
            placeholder="法力消耗"
            number
          />

          <!-- 设置技能类型 -->
          <FormSelect :data="types" v-model="skill_type" :value="skill_type" label="技能类型" @change="selectType" />
          <div class="type-list" v-show="skill_list[currentIndex].type.length">
            <transition-group name="delSkillType">
              <div class="skill-type" v-for="(item, index) in skill_list[currentIndex].type" :key="item">
                <span class="name">{{ item }}</span>
                <span class="del cursor-pointer" @click="delSkillType(index)">×</span>
              </div>
            </transition-group>
          </div>

          <!-- 设置技能效果 -->
          <div class="select-effect" v-if="noFirst">
            <FormSelect
              :data="effects"
              v-model="skill_effect"
              :value="skill_effect"
              label="技能效果"
              @change="selectEffect"
              :disabled="!skill_list[currentIndex].effect[effectIndex]"
            />
            <span class="add cursor-pointer" @click="addEffect">添加/下一行</span>
            <span class="add cursor-pointer" @click="editEffect">上一行</span>
            <span class="del cursor-pointer" @click="delEffect">删除一行</span>
          </div>
          <div class="select-effect" v-if="noFirst" v-show="skill_effect">
            <FormInput label="阶段值" v-model="skill_consume" placeholder="升级后的值" @keyup.enter="addConsume" />
            <span class="confirm cursor-pointer" @click="addConsume">确定</span>
            <span class="del cursor-pointer" @click="delConsume">删除一值</span>
          </div>
          <div class="effect-list">
            <transition-group name="delSkillType">
              <div
                class="skill-effect"
                :class="{ activeEffect: effectIndex === index }"
                v-for="(item, index) in skill_list[currentIndex].effect"
                :key="item"
              >
                <span class="type">{{ item.type || '待选择' }}：</span>
                <div class="phase">{{ item.phase?.join(' | ') }} |</div>
              </div>
            </transition-group>
          </div>

          <!-- 技能描述 -->
          <LibRichText v-model="skill_list[currentIndex].desc" placeholder="技能描述" :key="skill_list[currentIndex]" />
        </div>

        <!-- 右边 -->
        <div class="right">
          <div class="skill" v-for="(item, index) in skill_list" :key="index">
            <AddSkillBasic :data="item" :index="index" :activeIndex="currentIndex" @click="selectSkill(index)" />
          </div>
        </div>
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn v-model="status" class="LibCommitBtn" size="50px" @commit="commit" :finish="finish" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="LibCancelBtn" size="50px" @close="close" title="取消" />

    <!-- 确认关闭 -->
    <ConfirmClose v-model="show_ConfirmClose" />
  </div>
</template>
<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { updateHero } from '@/api/main/hero/self/index.js';
import { $removeEmptyField } from '@/utils/index.js';
import icon from '@/assets/icon/svg/icon.js';
import viewHide from '../../../../hooks/useViewHide.js';
import switchStore from '@/store/globalSwitch.js';
import AddSkillBasic from './childComps/AddSkillBasic.vue';

const $switchStore = switchStore();
const emit = defineEmits(['update:modelValue']);
const {
  show, finish, status, close,
} = viewHide(emit);
const show_ConfirmClose = ref(false);

const skill_type = ref(''); //选择的技能类型
const skill_effect = ref(''); //选择的技能效果
const skill_consume = ref(''); //阶段值
const hero_id = ref(0); //英雄id
const effectIndex = ref(-1); //处于编辑状态的技能效果索引
const currentIndex = ref(0); //用于设置编辑状态
const skill_list = ref([
  {
    name: '',
    desc: '',
    img: '',
    type: [],
  },
]);

const cache = localStorage.getItem('add_skill_list');
if (cache) {
  skill_list.value = JSON.parse(cache);
}
const types = [
  {
    id: 4,
    name: '控制',
  },
  {
    id: 5,
    name: '金币',
  },
  {
    id: 6,
    name: '伤害',
  },
  {
    id: 7,
    name: '护盾',
  },
  {
    id: 8,
    name: '冷却',
  },
  {
    id: 9,
    name: '回复',
  },
  {
    id: 10,
    name: '复活',
  },
];
const effects = [
  {
    id: 1,
    name: '基础伤害',
  },
  {
    id: 2,
    name: '降低双防',
  },
  {
    id: 3,
    name: '冷却时间',
  },
  {
    id: 4,
    name: '护盾减免',
  },
  {
    id: 5,
    name: '最大伤害',
  },
  {
    id: 6,
    name: '护盾',
  },
  {
    id: 6,
    name: '复活生命',
  },
];

const noFirst = computed(() => currentIndex.value !== 0);

/* 增加技能 */
const addOne = () => {
  skill_effect.value = '';
  effectIndex.value = -1;
  currentIndex.value = skill_list.value.length;
  skill_list.value.push({
    name: '',
    desc: '',
    cd: '',
    consume: '',
    img: '',
    type: [],
    effect: [],
  });
};

/* 选择技能后触发 */
const selectSkill = (index) => {
  skill_effect.value = '';
  currentIndex.value = index;
  skill_list.value[currentIndex.value] ??= {};
};

/* 设置头像后触发 */
const getLink = (v) => {
  skill_list.value[currentIndex.value].img = v;
};

/* 选择类型后触发 */
const selectType = (v) => {
  setTimeout(() => {
    skill_list.value[currentIndex.value].type.push(v);
    skill_list.value[currentIndex.value].type = [...new Set(skill_list.value[currentIndex.value].type)];
    skill_type.value = '请选择';
  });
};
/* 删除类型 */
const delSkillType = (index) => {
  skill_list.value[currentIndex.value].type.splice(index, 1);
};

/* 选择效果后触发 */
const selectEffect = (v) => {
  skill_list.value[currentIndex.value].effect[effectIndex.value].type = v;
};
/* 添加一行 */
const addEffect = () => {
  if (effectIndex.value !== -1 && !skill_effect.value) return;
  effectIndex.value++;
  skill_list.value[currentIndex.value].effect[effectIndex.value] ??= {};
  skill_effect.value = skill_list.value[currentIndex.value].effect[effectIndex.value].type;
};
/* 上一行 */
const editEffect = () => {
  if (effectIndex.value <= 0) return;
  effectIndex.value--;
  skill_effect.value = skill_list.value[currentIndex.value].effect[effectIndex.value].type;
};
/* 删除一行 */
const delEffect = () => {
  skill_effect.value = ''; //选择器值置空

  /* 技能效果索引大于等于0才执行 */
  if (effectIndex.value >= 0) {
    skill_list.value[currentIndex.value].effect.splice(effectIndex.value, 1); //删除自身
    const flag1 = effectIndex.value > 0;
    const flag2 = skill_list.value[currentIndex.value].effect.length > 0;
    if (flag1) {
      effectIndex.value--;
    }
    if (flag2) {
      skill_effect.value = skill_list.value[currentIndex.value].effect[effectIndex.value].type; //当技能效果数量大于0，将技能效果类型赋给选择器
    }
    if (!flag1 && !flag2) {
      effectIndex.value = -1; //当技能效果数量为空，且技能效果索引大于小于等于0，则赋初始值
    }
  }
};
/* 添加阶段值触发 */
const addConsume = () => {
  skill_list.value[currentIndex.value].effect[effectIndex.value].phase ??= [];
  skill_list.value[currentIndex.value].effect[effectIndex.value].phase.push(skill_consume.value);
  skill_consume.value = '';
};
/* 删除阶段值 */
const delConsume = () => {
  skill_list.value[currentIndex.value].effect[effectIndex.value].phase?.pop();
};

setTimeout(async () => {
  $switchStore.$loading.show('正在加载');
  $switchStore.$loading.close().then(() => {
    show.value = true;
  });
}, 1000);

const timer = setInterval(() => {
  localStorage.setItem('add_skill_list', JSON.stringify(skill_list.value));
}, 1000);

/* 发布 */
const commit = async () => {
  const is_Finish = skill_list.value.every((item) => {
    return item.img && item.name && hero_id.value;
  });
  if (skill_list.value.length >= 3 && is_Finish) {
    await updateHero(hero_id.value, { skills: $removeEmptyField(skill_list.value) });
    setTimeout(() => {
      finish.value = true;
      close();
      $switchStore.$tip('发布成功', 'info');
      localStorage.removeItem('add_skill_list');
    }, 500);
  } else {
    $switchStore.$tip('至少包含3个技能，且完整填写必填项', 'error');
    status.value = 0;
  }
};

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="less">
@import './index.less';
</style>
