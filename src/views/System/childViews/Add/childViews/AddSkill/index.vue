<template>
  <div class="skill view-add">
    <transition name="fade">
      <div class="content" v-if="show">
        <!-- 左边 -->
        <div class="left">
          <!-- 左上角新增 -->
          <i class="add-one iconfont wzry-addcircle cursor-pointer" @click="addOne" key="LibSvg" title="添加技能" />
          <!-- 设置图标 -->
          <FormImg
            :getLink="getLink"
            :imgs="[form_data![currentIndex].img]"
            :keys="['img']"
            :values="{ img: '图标' }"
            label="图标"
            required
          />
          <SelectHero v-model="hero_id" key="SelectHero" />
          <FormInput label="名称" required v-model="form_data![currentIndex].name" placeholder="技能名称" />
          <FormInput v-if="noFirst" label="CD" v-model="form_data![currentIndex].cd" placeholder="冷却时间" number />
          <FormInput
            v-if="noFirst"
            label="消耗"
            v-model="form_data![currentIndex].consume"
            placeholder="法力消耗"
            number
          />

          <!-- 设置技能类型 -->
          <FormSelect
            :data="skill_types"
            v-model="skill_type"
            :value="skill_type"
            label="技能类型"
            @change="selectType"
          />
          <div class="type-list" v-show="form_data![currentIndex].type.length">
            <transition-group name="delSkillType">
              <div class="skill-type" v-for="(item, index) in form_data![currentIndex].type" :key="item">
                <span class="name">{{ item }}</span>
                <span class="del" @click="delSkillType(index)">×</span>
              </div>
            </transition-group>
          </div>

          <!-- 设置技能效果 -->
          <div class="select-effect" v-if="noFirst">
            <FormSelect
              :data="skill_effects"
              v-model="skill_effect"
              :value="skill_effect"
              label="技能效果"
              @change="selectEffect"
              :disabled="!form_data![currentIndex].effect![effectIndex]"
            />
            <span class="add" @click="addEffect">添加/下一行</span>
            <span class="add" @click="editEffect">上一行</span>
            <span class="del" @click="delEffect">删除一行</span>
          </div>
          <div class="select-effect" v-if="noFirst" v-show="skill_effect">
            <FormInput label="阶段值" v-model="skill_consume" placeholder="升级后的值" @keyup.enter="addConsume" />
            <span class="confirm" @click="addConsume">确定</span>
            <span class="del" @click="delConsume">删除一值</span>
          </div>
          <div class="effect-list">
            <transition-group name="del-skill-type">
              <div
                class="skill-effect"
                :class="{ activeEffect: effectIndex === index }"
                v-for="(item, index) in form_data![currentIndex].effect"
                :key="item.type"
              >
                <span class="type">{{ item.type || "待选择" }}：</span>
                <div class="phase">{{ item.phase?.join(" | ") }} |</div>
              </div>
            </transition-group>
          </div>

          <!-- 技能描述 -->
          <LibRichText
            v-model="form_data![currentIndex].desc"
            placeholder="技能描述"
            :key="form_data![currentIndex].name"
          />
        </div>

        <!-- 右边 -->
        <div class="right">
          <div class="skill" v-for="(item, index) in form_data" :key="index">
            <AddSkillBasic :data="item" :index="index" :activeIndex="currentIndex" @click="selectSkill(index)" />
          </div>
        </div>
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn v-model="status" class="lib-commit-btn" size="50px" @commit="commit" :finish="finish" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="lib-cancel-btn" size="50px" @close="cancel" title="取消" />

    <!-- 确认关闭 -->
    <ConfirmClose v-model="show_ConfirmClose" @close="close" />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { updateHero, getSkillType, getSkillEffect } from "@/api/main/game/index";
import { $removeEmptyField, $deepCopy } from "@/utils";
import { skillDefault, skillEffectDefault } from "@/defaultValue/defaults";
import switchStore from "@/store/globalSwitch";
import viewHide from "../../../../hooks/useViewHide";
import AddSkillBasic from "./childComps/AddSkillBasic.vue";

const $switchStore = switchStore();

const emit = defineEmits(["update:modelValue"]);
const { show, finish, status, show_ConfirmClose, form_data, cancel, close } = viewHide<typeof skillDefault[]>(
  emit,
  "add_skill_list"
);

const skill_type = ref(""); //选择的技能类型
const skill_effect = ref(""); //选择的技能效果
const skill_consume = ref(0); //阶段值
const hero_id = ref(0); //英雄id
const effectIndex = ref(-1); //处于编辑状态的技能效果索引
const currentIndex = ref(0); //用于设置编辑状态

/* 判断是否存在缓存 */
form_data.value ??= [$deepCopy(skillDefault)];

/* 技能类型 */
const skill_types = ref<Hero.SkillType[]>([]);
getSkillType().then((res) => {
  skill_types.value = res.data;
});
/* 技能效果 */
const skill_effects = ref<Hero.SkillEffect[]>([]);
getSkillEffect().then((res) => {
  skill_effects.value = res.data;
});

const noFirst = computed(() => currentIndex.value !== 0); //用于判断是否为被动技能

/* 增加技能 */
const addOne = () => {
  skill_effect.value = "";
  effectIndex.value = -1;
  currentIndex.value = form_data.value!.length;
  form_data.value!.push({
    name: "",
    desc: "",
    cd: 0,
    consume: 0,
    img: "",
    type: [],
    effect: [],
  });
};

/* 选择技能后触发 */
const selectSkill = (index: number) => {
  skill_effect.value = "";
  currentIndex.value = index;
  form_data.value![currentIndex.value] ??= $deepCopy(skillDefault);
};

/* 设置头像后触发 */
const getLink = (v: string) => {
  form_data.value![currentIndex.value].img = v;
};

/* 选择类型后触发 */
const selectType = (v: string | number) => {
  setTimeout(() => {
    form_data.value![currentIndex.value].type.push(v as string);
    form_data.value![currentIndex.value].type = [...new Set(form_data.value![currentIndex.value].type)];
    skill_type.value = "请选择";
  });
};

/* 删除类型 */
const delSkillType = (index: number) => {
  form_data.value![currentIndex.value].type.splice(index, 1);
};

/* 选择效果后触发 */
const selectEffect = (v: string) => {
  form_data.value![currentIndex.value].effect![effectIndex.value].type = v;
};

/* 添加一行 */
const addEffect = () => {
  if (effectIndex.value !== -1 && !skill_effect.value) return;
  effectIndex.value++;
  form_data.value![currentIndex.value].effect![effectIndex.value] ??= $deepCopy(skillEffectDefault);
  skill_effect.value = form_data.value![currentIndex.value].effect![effectIndex.value].type;
};

/* 上一行 */
const editEffect = () => {
  if (effectIndex.value <= 0) return;
  effectIndex.value--;
  skill_effect.value = form_data.value![currentIndex.value].effect![effectIndex.value].type;
};

/* 删除一行 */
const delEffect = () => {
  skill_effect.value = ""; //选择器值置空

  /* 技能效果索引大于等于0才执行 */
  if (effectIndex.value >= 0) {
    form_data.value![currentIndex.value].effect!.splice(effectIndex.value, 1); //删除自身
    const flag1 = effectIndex.value > 0;
    const flag2 = form_data.value![currentIndex.value].effect!.length > 0;
    if (flag1) {
      effectIndex.value--;
    }
    if (flag2) {
      skill_effect.value = form_data.value![currentIndex.value].effect![effectIndex.value].type; //当技能效果数量大于0，将技能效果类型赋给选择器
    }
    if (!flag1 && !flag2) {
      effectIndex.value = -1; //当技能效果数量为空，且技能效果索引大于小于等于0，则赋初始值
    }
  }
};
/* 添加阶段值触发 */
const addConsume = () => {
  form_data.value![currentIndex.value].effect![effectIndex.value].phase ??= [];
  form_data.value![currentIndex.value].effect![effectIndex.value].phase.push(skill_consume.value);
  skill_consume.value = 0;
};
/* 删除阶段值 */
const delConsume = () => {
  form_data.value![currentIndex.value].effect![effectIndex.value].phase?.pop();
};

setTimeout(async () => {
  $switchStore.$loading.show("正在加载");
  $switchStore.$loading.close().then(() => {
    show.value = true;
  });
}, 1000);

/* 发布 */
const commit = async () => {
  const is_Finish = form_data.value!.every((item) => {
    return item.img && item.name && hero_id.value;
  });
  if (form_data.value!.length >= 3 && is_Finish) {
    await updateHero(hero_id.value, {
      skills: $removeEmptyField(form_data.value),
    });
    setTimeout(() => {
      finish.value = true;
      close();
      $switchStore.$tip("发布成功", "info");
    }, 500);
  } else {
    $switchStore.$tip("至少包含3个技能，且完整填写必填项", "error");
    status.value = 0;
  }
};
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
