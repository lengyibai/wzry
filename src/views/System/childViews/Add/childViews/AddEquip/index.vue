<template>
  <ManageMask class="content" :show="show">
    <div class="left">
      <!-- 装备名 -->
      <FormInput label="名称" required v-model="form_data!.name" />
      <!-- 描述 -->
      <FormInput label="描述" placeholder="装备名下方描述" v-model="form_data!.desc" />
      <!-- 装备类型 -->
      <FormSelect label="类型" :data="equip_types" v-model="form_data!.type" :value="form_data!.type" required />
      <!-- 阶段 -->
      <FormInput label="阶段" placeholder="1-3" required v-model="form_data!.level" number />
      <!-- 排名 -->
      <FormInput label="阶段排名" placeholder="当前列第几个" required v-model="form_data!.num" number />
      <!-- 价格 -->
      <FormInput label="价格" required v-model="form_data!.price" number />
      <!-- 设置图标 -->
      <FormLabel label="图标" required>
        <SelectImg v-model="form_data!.icon" title="图标" />
      </FormLabel>
      <!-- 最底部灰色备注 -->
      <LibRichText width="500px" v-model="form_data!.note" placeholder="最底部灰色备注" />

      <!-- 装备效果 -->
      <div class="equip-effect">
        <div class="select-effect">
          <FormSelect label="效果类型" v-model="equip_effect_type" :value="equip_effect_type" :data="equip_effects" />
          <button class="add" @click="addEffect">添加</button>
          <button class="del" @click="delEffect">删除一行</button>
        </div>
        <div class="effect-list">
          <transition-group name="fade">
            <FormInput
              labelWidth="175px"
              :label="item.name"
              v-model="item.num"
              required
              v-for="item in form_data!.effect"
              :key="item.name"
            />
          </transition-group>
        </div>
      </div>

      <!-- 被动及主动 -->
      <div class="motivation">
        <!-- 名称 -->
        <FormInput label="主/被动名称" labelWidth="195px" v-model="motivation.name" />
        <FormInput label="冷却时间" labelWidth="195px" v-model="motivation.time" number />
        <K-Checkbox label="主动" labelWidth="195px" v-model="motivation.type" />
        <!-- 主/被动描述 -->
        <LibRichText
          width="500px"
          v-model="motivation.desc"
          placeholder="主/被动描述"
          :key="form_data!.motivation.length"
        />

        <div class="box">
          <button class="add" @click="addMotivation">添加</button>
          <button class="del" @click="delMotivation">删除一行</button>
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
<script setup lang="ts">
import { ref } from "vue";
import { getEquipType, getEquipEffect } from "@/api/main/games/equip";
import { equipDefault, equipMotivationDefault } from "@/defaultValue/defaults";
import { $deepCopy } from "@/utils/index";
import switchStore from "@/store/globalSwitch";
import equipStore from "@/store/equip";
import viewHide from "../../../../hooks/useViewHide";
import EquipDetail from "@/views/Equip/childComps/EquipDetail/index.vue"; //装备详情

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const { show, finish, status, form_data, show_ConfirmClose, EmitCancelRelease, EmitConfirmSave, EmitConfirmRemove } =
  viewHide<typeof equipDefault>(emit, "add_equip");

const $switchStore = switchStore();
const $equipStore = equipStore();

const equip_effect_type = ref(""); //当前选中的效果类型
const equip_types = ref<{ id: number; name: string }[]>([]); //装备类型
const motivation = ref<typeof equipMotivationDefault>($deepCopy(equipMotivationDefault)); //动机信息
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
const addEffect = () => {
  if (!equip_effect_type.value) return;
  form_data.value!.effect.push({
    name: equip_effect_type.value,
    num: 0,
  });
  equip_effect_type.value = "";
};

/* 删除装备效果 */
const delEffect = () => {
  equip_effect_type.value = "";
  form_data.value!.effect.pop();
};

/* 添加被动 */
const addMotivation = () => {
  if (!motivation.value.name) return;
  form_data.value!.motivation.push({
    ...motivation.value,
    type: motivation.value.type ? "主动" : "被动",
    time: Number(motivation.value.time),
  });
  motivation.value = $deepCopy(equipMotivationDefault);
};

/* 删除被动 */
const delMotivation = () => {
  form_data.value!.motivation.pop();
};

/* 提交表单 */
const EmitCommit = async () => {
  const { level, num, price, type, name, icon } = form_data.value!;
  /* 非空验证 */
  if (level && num && price && type && name && icon) {
    const type_id = equip_types.value.find((item) => form_data.value!.type === item.name); // 查找装备分类id
    /* 生成装备id */
    form_data.value!.id = Number(`${type_id!.id}${level}${num}`);
    const data = {
      ...form_data.value!,
      level: Number(level),
      num: Number(num),
      price: Number(price),
    };
    try {
      // await addEquip(data);
    } catch (error) {
      $switchStore.$tip("装备位置已被占用，请重新填写阶段排名", "error");
      status.value = 0;
      return;
    }
    setTimeout(async () => {
      finish.value = true;
      await $equipStore.getEquipList();
      $switchStore.$tip("发布成功", "info");
      EmitConfirmRemove();
    }, 500);
  } else {
    $switchStore.$tip("请完整填写", "error");
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
<style scoped lang="less">
@import url("./index.less");
</style>
