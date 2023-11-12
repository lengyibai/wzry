<script setup lang="ts">
import { computed, ref } from "vue";

import AddSkillBasic from "./childComps/AddSkillBasic/index.vue";

import viewHide from "@/views/System/hooks/useViewHide";
import { skillDefault, skillEffectDefault } from "@/default";
import { API_HERO, API_SKILL } from "@/api";
import { HeroStore } from "@/store";
import { $loading, $message } from "@/utils";
import { CONFIG } from "@/config";
import {
  ConfirmClose,
  FormInput,
  FormLabel,
  FormSelect,
  ManageMask,
  ReleaseConfirm,
  SelectHero,
  SelectImg,
} from "@/components/business";
import { LibRichText } from "@/components/common";

const $emit = defineEmits<{
  "update:modelValue": [v: boolean];
}>();

const $heroStore = HeroStore();

const { show, finish, status, form_data, onConfirmRemove, onConfirmSave } = viewHide<
  Hero.Skill[][]
>($emit, "add_skill_list");

const leftRef = ref<HTMLElement>();

/** 选择的技能效果 */
const skill_effect = ref("");
/** 技能消耗单位 */
const skill_unit = ref("");
/** 阶段值 */
const skill_consume = ref<number | "">("");
/** 英雄id */
const hero_id = ref(0);
/** 处于编辑状态的技能效果索引 */
const effectIndex = ref(-1);
/** 处于编辑状态的技能 */
const active_index = ref(0);
/** 用于切换副技能的索引 */
const deputy_index = ref(0);
/** 显示技能组删除弹窗 */
const show_DelDeputys = ref(false);
/** 显示技能删除弹窗 */
const show_DelSkill = ref(false);
/** 技能效果 */
const skill_effects = ref<General[]>([]);
/** 技能类型表 */
const skill_types = ref<Hero.SkillType[]>([]);

/** 判断是否存在缓存 */
form_data.value ??= [[skillDefault()]] as Hero.Skill[][];

/** 处于编辑的技能组 */
const activeSkills = () => form_data.value![deputy_index.value];
/** 处于编辑的技能 */
const activeSkill = () => activeSkills()[active_index.value];

/** 判断是否为被动技能 */
const noFirst = computed(() => active_index.value !== 0);
/** 判断是否为被动技能 */
const exist_deputys = computed(() => form_data.value!.length > 1);
/** 技能组数量 */
const skills_num = computed(() => (form_data.value ? form_data.value.length : 0));
/** 当前技能数量 */
const skill_num = computed(() => form_data.value![deputy_index.value].length);

/* 延迟显示 */
$loading.close();
setTimeout(async () => {
  show.value = true;
}, 1000);

/* 获取技能类型 */
API_HERO.getSkillType().then((res) => {
  skill_types.value = res;
});

/* 获取技能效果 */
API_HERO.getSkillEffect().then((res) => {
  skill_effects.value = res;
});

/* 判断是否已存在该英雄技能 */
const onSelectHeroChange = (id: number) => {
  const d = localStorage.getItem(CONFIG.LOCAL_KEY.SKILL) as string;
  const v = JSON.parse(d) as Hero.SkillParams[];

  if (v.some((item) => item.id === id)) {
    $message("该英雄已拥有技能，如需修改请前往修改页面", "warning");
  }
};

/* 增加技能 */
const handleAddOne = () => {
  skill_effect.value = "";
  effectIndex.value = -1;
  activeSkills().push(skillDefault());
  active_index.value = activeSkills().length - 1;
};

/* 增加副技能 */
const handleAddDeputys = () => {
  active_index.value = 0;
  form_data.value!.push([skillDefault()]);
  deputy_index.value = skills_num.value - 1;
};

/* 切换为副技能 */
const handleToggleSkill = () => {
  if (deputy_index.value === skills_num.value - 1) {
    deputy_index.value = 0;
  } else {
    deputy_index.value += 1;
  }
  active_index.value = 0;
};

/* 删除技能 */
const onDelSkill = () => {
  show_DelSkill.value = true;
};

/* 删除技能组 */
const handleDelDeputys = () => {
  show_DelDeputys.value = true;
};

/* 确认删除技能 */
const onConfirmDelSkill = () => {
  if (skill_num.value === 1) {
    $message("至少保留一个技能", "error");
    return;
  }
  activeSkills()?.splice(active_index.value, 1);
  if (active_index.value === 0) {
    onSelectSkill(active_index.value + 1);
  } else {
    onSelectSkill(active_index.value - 1);
  }
};

/* 确认删除技能组 */
const onConfirmDelDeputys = () => {
  form_data.value?.splice(deputy_index.value, 1);
  if (deputy_index.value === 0 && skills_num.value > 2) {
    deputy_index.value += 1;
  } else if (deputy_index.value > 0) {
    deputy_index.value -= 1;
  }
};

/* 选择技能后触发 */
const onSelectSkill = (index: number) => {
  skill_effect.value = "";
  active_index.value = index;
  const effect = activeSkill().effect;
  const data = effect?.at(-1);
  if (data && data.type) {
    skill_effect.value = data.type;
    //重置效果索引
    effectIndex.value = effect!.length - 1;
  } else {
    //重置效果索引
    effectIndex.value = -1;
  }
  //选择技能后，左侧回到顶部
  leftRef.value && leftRef.value.scroll({ behavior: "smooth", top: 0 });
};

/* 选择效果后触发 */
const onSelectEffect = (v: string | number | unknown[]) => {
  if (typeof v !== "string") return;
  activeSkill().effect![effectIndex.value].type = v;
};

/* 添加一行 */
const handleAddEffect = () => {
  if (effectIndex.value === -1) {
    effectIndex.value = activeSkill().effect!.length - 1;
  }
  if (effectIndex.value !== -1 && !skill_effect.value) return;
  effectIndex.value++;
  activeSkill().effect![effectIndex.value] ??= skillEffectDefault();
  skill_effect.value = activeSkill().effect![effectIndex.value].type;
};

/* 上一行 */
const handleEditEffect = () => {
  if (effectIndex.value <= 0) return;
  effectIndex.value--;
  skill_effect.value = activeSkill().effect![effectIndex.value].type;
};

/* 删除一行 */
const handleDelEffect = () => {
  //选择器值置空
  skill_effect.value = "";

  //技能效果索引大于等于0才执行
  if (effectIndex.value >= 0) {
    //删除自身
    activeSkill().effect!.splice(effectIndex.value, 1);
    const flag1 = effectIndex.value > 0;
    const flag2 = activeSkill().effect!.length > 0;

    if (flag1) {
      effectIndex.value--;
    }

    //当技能效果数量大于0，将技能效果类型赋给选择器
    if (flag2) {
      skill_effect.value = activeSkill().effect![effectIndex.value].type;
    }

    //当技能效果数量为空，且技能效果索引大于小于等于0，则赋初始值
    if (!flag1 && !flag2) {
      effectIndex.value = -1;
    }
  }
};

/* 添加阶段值触发 */
const handleAddConsume = () => {
  if (skill_consume.value) {
    activeSkill().effect![effectIndex.value].phase ??= [];
    activeSkill().effect![effectIndex.value].phase.push(skill_consume.value as number);
    skill_consume.value = "";
  }
};

/* 删除阶段值 */
const handleDelConsume = () => {
  activeSkill().effect![effectIndex.value].phase?.pop();
};

/* 发布 */
const onCommit = async () => {
  const is_Finish = form_data.value![0].every((item) => item.img && item.name && hero_id.value);
  if (is_Finish && form_data.value![0].length >= 3) {
    await API_SKILL.addHeroSkill({
      id: hero_id.value,
      unit: skill_unit.value,
      skills: form_data.value!,
    });
    setTimeout(() => {
      finish.value = true;
      onConfirmRemove();
      $message("发布成功", "info");
      $heroStore.getHeroList();
    }, 500);
  } else {
    $message("请完整填写必填项，且主技能个数不低于3个", "error");
    status.value = 0;
  }
};
</script>

<template>
  <ManageMask class="content" :show="show">
    <div ref="leftRef" class="content-left">
      <!-- 右上角新增 -->
      <div class="add-skill">
        <span v-show="exist_deputys" class="desc">
          副技能无被动或低于3个，可以留空，但要与主技能数量一致
        </span>
        <div class="deputy-index">{{ deputy_index + 1 }}/{{ skills_num }}</div>
        <button class="add" @click="handleAddOne">添加技能</button>
        <button class="add" @click="handleAddDeputys">添加副技能</button>
        <button v-if="exist_deputys" class="add" @click="handleToggleSkill">切换主/副技能</button>
        <button v-if="skills_num > 1" class="add" @click="handleDelDeputys">删除当前技能组</button>
      </div>

      <!-- 设置图标 -->
      <FormLabel label="图标" required>
        <SelectImg v-model="activeSkill().img" title="图标" />
      </FormLabel>

      <!-- 选择英雄 -->
      <SelectHero key="SelectHero" v-model="hero_id" @update:model-value="onSelectHeroChange" />

      <!-- 技能名称 -->
      <FormInput v-model="activeSkill().name" label="名称" required placeholder="技能名称" />

      <FormInput v-model="skill_unit" label="消耗单位" required placeholder="技能消耗单位" />

      <!-- 冷却时间 -->
      <FormInput
        v-if="noFirst"
        v-model="activeSkill().cd"
        label="CD"
        placeholder="冷却时间"
        number
      />

      <!-- 消耗 -->
      <FormInput
        v-if="noFirst"
        v-model="activeSkill().consume"
        label="消耗"
        placeholder="法力消耗"
        number
      />

      <!-- 设置技能类型 -->
      <FormSelect
        v-model="activeSkill().type"
        :data="skill_types"
        :value="activeSkill().type"
        label="技能类型"
        multi
      />

      <!-- 设置技能效果 -->
      <div v-if="noFirst" class="select-effect">
        <FormSelect
          v-model="skill_effect"
          :data="skill_effects"
          :value="skill_effect"
          label="技能效果"
          :disabled="!activeSkill().effect![effectIndex]"
          @update:model-value="onSelectEffect"
        />
        <button class="add" @click="handleAddEffect">添加/下一行</button>
        <button class="add" @click="handleEditEffect">上一行</button>
        <button class="del" @click="handleDelEffect">删除一行</button>
      </div>

      <!-- 设置阶段值 -->
      <div v-if="noFirst" v-show="skill_effect" class="select-effect">
        <FormInput
          v-model="skill_consume"
          label="阶段值"
          placeholder="升级后的值"
          @keyup.enter="handleAddConsume"
        />
        <button class="confirm" @click="handleAddConsume">确定</button>
        <button class="del" @click="handleDelConsume">删除一值</button>
      </div>

      <!-- 阶段值列表 -->
      <div class="effect-list">
        <transition-group name="del-skill-type">
          <div
            v-for="(item, index) in activeSkill().effect"
            :key="item.type"
            class="skill-effect"
            :class="{ 'active-effect': effectIndex === index }"
          >
            <span class="type">{{ item.type || "待选择" }}：</span>
            <div class="phase">{{ item.phase?.join(" | ") }} |</div>
          </div>
        </transition-group>
      </div>

      <!-- 技能描述 -->
      <LibRichText :key="activeSkill().img" v-model="activeSkill().desc" placeholder="技能描述" />
    </div>

    <!-- 右边 -->
    <AddSkillBasic
      :active-index="active_index"
      :skills="form_data![deputy_index]"
      @select="onSelectSkill"
      @del="onDelSkill"
    />

    <!-- 发布相关 -->
    <ReleaseConfirm
      v-model:status="status"
      :finish="finish"
      @commit="onCommit"
      @confirm="onConfirmSave"
      @cancel="onConfirmRemove"
    />

    <!-- 确认删除技能 -->
    <transition name="fade">
      <ConfirmClose
        v-if="show_DelSkill"
        v-model="show_DelSkill"
        text="确认删除当前技能？"
        @confirm="onConfirmDelSkill"
      />
    </transition>

    <!-- 确认删除技能组 -->
    <transition name="fade">
      <ConfirmClose
        v-if="show_DelDeputys"
        v-model="show_DelDeputys"
        text="确认删除当前技能组？"
        @confirm="onConfirmDelDeputys"
      />
    </transition>
  </ManageMask>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
