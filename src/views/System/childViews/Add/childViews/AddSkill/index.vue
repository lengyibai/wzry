<template>
  <div class="skill view-add">
    <transition name="fade">
      <div class="content" v-if="show">
        <!-- 左边 -->
        <div class="content-left" ref="left">
          <!-- 右上角新增 -->
          <div class="add-skill">
            <div class="deputy-index">{{ deputy_index + 1 }}/{{ skills_num }}</div>
            <button class="add" @click="handleAddOne">添加技能</button>
            <button class="add" @click="handleAddDeputys">添加副技能</button>
            <button class="add" v-if="exist_deputys" @click="handleToggleSkill">切换主/副技能</button>
            <button class="add" @click="handleDelDeputys" v-if="skills_num > 1">删除当前技能组</button>
          </div>

          <!-- 设置图标 -->
          <FormLabel label="图标" required>
            <SelectImg v-model="activeSkill().img" title="图标" />
          </FormLabel>

          <!-- 选择英雄 -->
          <SelectHero v-model="hero_id" key="SelectHero" @change="EmitSelectHeroChange" />

          <!-- 技能名称 -->
          <FormInput label="名称" required v-model="activeSkill().name" placeholder="技能名称" />

          <!-- 冷却时间 -->
          <FormInput v-if="noFirst" label="CD" v-model="activeSkill().cd" placeholder="冷却时间" number />

          <!-- 消耗 -->
          <FormInput v-if="noFirst" label="消耗" v-model="activeSkill().consume" placeholder="法力消耗" number />

          <!-- 设置技能类型 -->
          <FormSelect
            :data="skill_types"
            v-model="activeSkill().type"
            :value="activeSkill().type"
            label="技能类型"
            multi
          />

          <!-- 设置技能效果 -->
          <div class="select-effect" v-if="noFirst">
            <FormSelect
              :data="skill_effects"
              v-model="skill_effect"
              :value="skill_effect"
              label="技能效果"
              @change="EmitSelectEffect"
              :disabled="!activeSkill().effect![effectIndex]"
            />
            <button class="add" @click="handleAddEffect">添加/下一行</button>
            <button class="add" @click="handleEditEffect">上一行</button>
            <button class="del" @click="handleDelEffect">删除一行</button>
          </div>

          <!-- 设置阶段值 -->
          <div class="select-effect" v-if="noFirst" v-show="skill_effect">
            <FormInput
              label="阶段值"
              v-model="skill_consume"
              placeholder="升级后的值"
              @keyup.enter="HandleAddConsume"
            />
            <button class="confirm" @click="HandleAddConsume">确定</button>
            <button class="del" @click="handleDelConsume">删除一值</button>
          </div>

          <!-- 阶段值列表 -->
          <div class="effect-list">
            <transition-group name="del-skill-type">
              <div
                class="skill-effect"
                :class="{ 'active-effect': effectIndex === index }"
                v-for="(item, index) in activeSkill().effect"
                :key="item.type"
              >
                <span class="type">{{ item.type || "待选择" }}：</span>
                <div class="phase">{{ item.phase?.join(" | ") }} |</div>
              </div>
            </transition-group>
          </div>

          <!-- 技能描述 -->
          <LibRichText v-model="activeSkill().desc" placeholder="技能描述" :key="activeSkill().img" />
        </div>

        <!-- 右边 -->
        <AddSkillBasic
          :activeIndex="active_index"
          :skills="form_data![deputy_index]"
          @select="EmitSelectSkill"
          @del="EmitDelSkill"
        />
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn
      v-model="status"
      class="lib-commit-btn"
      size="50px"
      @commit="EmitCommit"
      :finish="finish"
      title="发布"
    />

    <!-- 取消发布 -->
    <LibCancelBtn class="lib-cancel-btn" size="50px" @close="EmitCancelRelease" title="取消" />

    <!-- 确认关闭 -->
    <ConfirmClose v-model="show_ConfirmClose" @confirm="EmitConfirmSave" @cancel="EmitConfirmRemove" />

    <!-- 确认删除技能 -->
    <ConfirmClose v-model="show_DelSkill" text="确认删除当前技能？" @confirm="EmitConfirmDelSkill" />

    <!-- 确认删除技能组 -->
    <ConfirmClose v-model="show_DelDeputys" text="确认删除当前技能组？" @confirm="EmitConfirmDelDeputys" />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { getSkillType, getSkillEffect } from "@/api/main/games/hero";
import { addHeroSkill } from "@/api/main/games/skill";
import { $deepCopy } from "@/utils";
import { skillDefault, skillEffectDefault } from "@/defaultValue/defaults";
import switchStore from "@/store/globalSwitch";
import viewHide from "../../../../hooks/useViewHide";
import AddSkillBasic from "./childComps/AddSkillBasic/index.vue";

const $switchStore = switchStore();

const emit = defineEmits(["update:modelValue"]);
const { show, finish, status, show_ConfirmClose, form_data, EmitCancelRelease, EmitConfirmRemove, EmitConfirmSave } =
  viewHide<Hero.Skill[][]>(emit, "add_skill_list");

const left = ref<HTMLElement>(); //左侧元素
const skill_effect = ref(""); //选择的技能效果
const skill_types = ref<Hero.SkillType[]>([]);
const skill_consume = ref(0); //阶段值
const hero_id = ref(0); //英雄id
const effectIndex = ref(-1); //处于编辑状态的技能效果索引
const active_index = ref(0); //处于编辑状态的技能
const exist_deputys = ref(false); //是否存在副技能
const deputy_index = ref(0); //用于切换副技能的索引
const show_DelDeputys = ref(false); //显示技能组删除弹窗
const show_DelSkill = ref(false); //显示技能删除弹窗

//处于编辑的技能组
const activeSkills = () => form_data.value![deputy_index.value];
//处于编辑的技能
const activeSkill = () => activeSkills()[active_index.value];

//用于判断是否为被动技能
const noFirst = computed(() => active_index.value !== 0);
//技能组数量
const skills_num = computed(() => (form_data.value ? form_data.value.length : 0));
//当前技能数量
const skill_num = computed(() => form_data.value![deputy_index.value].length);

/* 判断是否存在缓存 */
form_data.value ??= [[$deepCopy<Hero.Skill>(skillDefault)]] as Hero.Skill[][];

//是否存在副技能
exist_deputys.value = form_data.value.length > 1;

/* 获取技能类型 */
getSkillType().then((res) => {
  skill_types.value = res;
});

/* 技能效果 */
const skill_effects = ref<Hero.General[]>([]);
getSkillEffect().then((res) => {
  skill_effects.value = res;
});

/* 判断是否已存在该英雄技能 */
const EmitSelectHeroChange = (id: number) => {
  const d = localStorage.getItem("data_skill") as string;
  const v = JSON.parse(d) as Hero.SkillParams[];
  const isExist = v.some((item) => {
    return item.id === id;
  });
  if (isExist) {
    $switchStore.$tip("该英雄已拥有技能，如需修改请前往修改页面", "warning");
  }
};

/* 增加技能 */
const handleAddOne = () => {
  skill_effect.value = "";
  effectIndex.value = -1;
  activeSkills().push($deepCopy(skillDefault));
  active_index.value = activeSkills().length - 1;
};
/* 增加副技能 */
const handleAddDeputys = () => {
  active_index.value = 0;
  form_data.value!.push([$deepCopy(skillDefault)]);
  deputy_index.value = skills_num.value - 1;
};
/* 切换为副技能 */
const handleToggleSkill = () => {
  if (deputy_index.value === skills_num.value - 1) {
    deputy_index.value = 0;
  } else {
    deputy_index.value += 1;
  }
};
/* 删除技能 */
const EmitDelSkill = () => {
  show_DelSkill.value = true;
};
/* 删除技能组 */
const handleDelDeputys = () => {
  show_DelDeputys.value = true;
};

/* 确认删除技能 */
const EmitConfirmDelSkill = () => {
  if (skill_num.value === 1) {
    $switchStore.$tip("至少保留一个技能", "error");
    return;
  }
  activeSkills()?.splice(active_index.value, 1);
  if (active_index.value === 0) {
    EmitSelectSkill(active_index.value + 1);
  } else {
    EmitSelectSkill(active_index.value - 1);
  }
};
/* 确认删除技能组 */
const EmitConfirmDelDeputys = () => {
  form_data.value?.splice(deputy_index.value, 1);
  if (deputy_index.value === 0) {
    deputy_index.value += 1;
  } else {
    deputy_index.value -= 1;
  }
  console.log(deputy_index.value);
};
/* 选择技能后触发 */
const EmitSelectSkill = (index: number) => {
  skill_effect.value = "";
  active_index.value = index;
  const effect = activeSkill().effect;
  const data = effect?.at(-1);
  if (data && data.type) {
    skill_effect.value = data.type;
    effectIndex.value = effect!.length - 1; //重置效果索引
  } else {
    effectIndex.value = -1; //重置效果索引
  }
  left.value && left.value.scroll({ behavior: "smooth", top: 0 }); //选择技能后，左侧回到顶部
};

/* 选择效果后触发 */
const EmitSelectEffect = (v: string | number | any[]) => {
  activeSkill().effect![effectIndex.value].type = v as string;
};

/* 添加一行 */
const handleAddEffect = () => {
  if (effectIndex.value !== -1 && !skill_effect.value) return;
  effectIndex.value++;
  activeSkill().effect![effectIndex.value] ??= $deepCopy(skillEffectDefault);
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
  skill_effect.value = ""; //选择器值置空
  //技能效果索引大于等于0才执行
  if (effectIndex.value >= 0) {
    activeSkill().effect!.splice(effectIndex.value, 1); //删除自身
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
const HandleAddConsume = () => {
  activeSkill().effect![effectIndex.value].phase ??= [];
  activeSkill().effect![effectIndex.value].phase.push(skill_consume.value);
  skill_consume.value = 0;
};

/* 删除阶段值 */
const handleDelConsume = () => {
  activeSkill().effect![effectIndex.value].phase?.pop();
};

/* 发布 */
const EmitCommit = async () => {
  const is_Finish = form_data.value!.every((item) => {
    return item.every((item) => {
      return item.img && item.name && hero_id.value;
    });
  });
  if (form_data.value![0].length >= 3 && is_Finish) {
    await addHeroSkill({
      id: hero_id.value,
      skills: form_data.value!,
    });
    setTimeout(() => {
      finish.value = true;
      EmitConfirmRemove();
      $switchStore.$tip("发布成功", "info");
    }, 500);
  } else {
    $switchStore.$tip("请完整填写必填项，且至少包含3个技能", "error");
    status.value = 0;
  }
};

setTimeout(async () => {
  $switchStore.$loading.show("正在加载");
  $switchStore.$loading.close().then(() => {
    show.value = true;
  });
}, 1000);
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
