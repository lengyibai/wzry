<!-- eslint-disable @typescript-eslint/no-non-null-assertion -->
<script setup lang="ts">
import { ref } from "vue";

import viewHide from "../../../../hooks/useViewHide";

import { getEquipType, getEquipEffect } from "@/api/main/games/equip";
import { equipDefault, equipMotivationDefault } from "@/defaultValue";
import { $deepCopy } from "@/utils";
import switchStore from "@/store/switch";
import equipStore from "@/store/equip";
import EquipDetail from "@/views/Equip/childComps/EquipDetail/index.vue"; //装备详情

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const {
  show,
  finish,
  status,
  form_data,
  show_ConfirmClose,
  EmitCancelRelease,
  EmitConfirmSave,
  EmitConfirmRemove,
} = viewHide<typeof equipDefault>(emit, "add_equip");

const $switchStore = switchStore();
const $equipStore = equipStore();

const equip_effect_type = ref(""); //当前选中的效果类型
const equip_types = ref<{ id: number; name: string }[]>([]); //装备类型
const motivation = ref<typeof equipMotivationDefault>(
  $deepCopy(equipMotivationDefault)
); //动机信息
const equip_effects = ref<{ id: number; name: string }[]>([]);

/* 判断是否存在缓存 */
form_data.value ??= $deepCopy(equipDefault);

/* 获取装备效果 */
getEquipEffect().then((res) => {
  equip_effects.value = res;
});

/* 获取装备类型 */
getEquipType().then((res) => {
  equip_types.value = res;
});

/* 添加装备效果 */
const handleAddEffect = () => {
  if (!equip_effect_type.value) return;
  form_data.value!.effect.push({
    name: equip_effect_type.value,
    num: 0,
  });
  equip_effect_type.value = "";
};

/* 删除装备效果 */
const handleDelEffect = () => {
  equip_effect_type.value = "";
  form_data.value!.effect.pop();
};

/* 添加被动 */
const handleAddMotivation = () => {
  if (!motivation.value.name) return;
  form_data.value!.motivation.push({
    ...motivation.value,
    type: motivation.value.type ? "主动" : "被动",
    time: Number(motivation.value.time),
  });
  motivation.value = $deepCopy(equipMotivationDefault);
};

/* 删除被动 */
const handleDelMotivation = () => {
  form_data.value!.motivation.pop();
};

/* 提交表单 */
const EmitCommit = async () => {
  const { level, num, price, type, name, icon } = form_data.value!;
  //非空验证
  if (level && num && price && type && name && icon) {
    const type_id = equip_types.value.find(
      (item) => form_data.value!.type === item.name
    ); // 查找装备分类id
    //生成装备id
    form_data.value!.id = Number(`${type_id!.id}${level}${num}`);
    // const data = {
    //   ...form_data.value!,
    //   level: Number(level),
    //   num: Number(num),
    //   price: Number(price),
    // };
    try {
      // await addEquip(data);
    } catch (error) {
      $switchStore.$msg("装备位置已被占用，请重新填写阶段排名", "error");
      status.value = 0;
      return;
    }
    setTimeout(async () => {
      finish.value = true;
      await $equipStore.getEquipList();
      $switchStore.$msg("发布成功", "info");
      EmitConfirmRemove();
    }, 500);
  } else {
    $switchStore.$msg("请完整填写", "error");
    status.value = 0;
  }
};

/* 延迟显示 */
setTimeout(async () => {
  $switchStore.$loading.show("正在加载");
  $switchStore.$loading.close().then(() => {
    show.value = true;
  });
}, 1000);
</script>

<template>
  <ManageMask class="content" :show="show">
    <div class="left">
      <!-- 装备名 -->
      <FormInput v-model="form_data!.name" label="名称" required />
      <!-- 描述 -->
      <FormInput
        v-model="form_data!.desc"
        label="描述"
        placeholder="装备名下方描述"
      />
      <!-- 装备类型 -->
      <FormSelect
        v-model="form_data!.type"
        label="类型"
        :data="equip_types"
        :value="form_data!.type"
        required
      />
      <!-- 阶段 -->
      <FormInput
        v-model="form_data!.level"
        label="阶段"
        placeholder="1-3"
        required
        number
      />
      <!-- 排名 -->
      <FormInput
        v-model="form_data!.num"
        label="阶段排名"
        placeholder="当前列第几个"
        required
        number
      />
      <!-- 价格 -->
      <FormInput v-model="form_data!.price" label="价格" required number />
      <!-- 设置图标 -->
      <FormLabel label="图标" required>
        <SelectImg v-model="form_data!.icon" title="图标" />
      </FormLabel>
      <!-- 最底部灰色备注 -->
      <LibRichText
        v-model="form_data!.note"
        width="500px"
        placeholder="最底部灰色备注"
      />

      <!-- 装备效果 -->
      <div class="equip-effect">
        <div class="select-effect">
          <FormSelect
            v-model="equip_effect_type"
            label="效果类型"
            :value="equip_effect_type"
            :data="equip_effects"
          />
          <button class="add" @click="handleAddEffect">添加</button>
          <button class="del" @click="handleDelEffect">删除一行</button>
        </div>
        <div class="effect-list">
          <transition-group name="fade">
            <FormInput
              v-for="item in form_data!.effect"
              :key="item.name"
              v-model="item.num"
              label-width="175px"
              :label="item.name"
              required
            />
          </transition-group>
        </div>
      </div>

      <!-- 被动及主动 -->
      <div class="motivation">
        <!-- 名称 -->
        <FormInput
          v-model="motivation.name"
          label="主/被动名称"
          label-width="195px"
        />
        <FormInput
          v-model="motivation.time"
          label="冷却时间"
          label-width="195px"
          number
        />
        <K-Checkbox
          v-model="motivation.type"
          label="主动"
          label-width="195px"
        />
        <!-- 主/被动描述 -->
        <LibRichText
          :key="form_data!.motivation.length"
          v-model="motivation.desc"
          width="500px"
          placeholder="主/被动描述"
        />

        <div class="box">
          <button class="add" @click="handleAddMotivation">添加</button>
          <button class="del" @click="handleDelMotivation">删除一行</button>
        </div>
      </div>
    </div>
    <div class="right">
      <EquipDetail :equip="form_data" :show="true" />
    </div>

    <!-- 发布相关 -->
    <ReleaseConfirm
      v-model:showConfirmclose="show_ConfirmClose"
      v-model:status="status"
      size="50px"
      :finish="finish"
      @commit="EmitCommit"
      @confirm="EmitConfirmSave"
      @cancel="EmitConfirmRemove"
      @close="EmitCancelRelease"
    />
  </ManageMask>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
