<template>
  <div class="skin view-add">
    <transition name="fade">
      <div class="content" ref="scrollBox" v-if="show">
        <transition-group name="fade">
          <!--左上角新增-->
          <i class="add-one iconfont wzry-addcircle cursor-pointer" @click="addOne" key="LibSvg" />

          <!--指派英雄-->
          <SelectHero class="select-hero" v-model="hero_id" key="SelectHero" />

          <!--皮肤盒子列表-->
          <div
            class="skin"
            @mouseenter="currentIndex = index"
            @mouseleave="currentIndex = null"
            v-for="(item, index) in form_data"
            :key="item.id"
          >
            <!--··皮肤名··-->
            <FormInput label="皮肤编号" required v-model="item.num" placeholder="第几款皮肤" number />
            <FormInput label="皮肤名" required v-model="item.name" />
            <FormInput label="价格" v-model="item.price" placeholder="请输入" number />

            <!-- 在输入框内部限制数字 -->

            <!--··皮肤类型··-->
            <FormSelect label="皮肤类型" required :data="skin_types" v-model="item.type" />

            <!--··皮肤头像、海报··-->
            <FormImg
              label="皮肤头像&海报"
              label-width="240px"
              :getLink="getLink"
              :imgs="[item.head, item.img]"
              :keys="['head', 'img']"
              :values="{ head: '头像', img: '海报' }"
            />

            <!--··右上角删除··-->
            <transition name="fade">
              <i class="del iconfont wzry-guanbi" @click="delOne(index)" />
            </transition>
          </div>
        </transition-group>
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn class="lib-commit-btn" size="50px" @commit="commit" :finish="finish" v-model="status" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="lib-cancel-btn" size="50px" @close="cancel" title="取消" />

    <!-- 确认关闭 -->
    <ConfirmClose v-model="show_ConfirmClose" @close="close" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { getSkinType, addSkin } from "@/api/main/game/index";
import viewHide from "../../../../hooks/useViewHide";
import switchStore from "@/store/globalSwitch";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();
const { hero_id, show, finish, status, form_data, show_ConfirmClose, cancel, close } = viewHide<Hero.Skin[]>(
  emit,
  "add_skin_list"
);

/* 判断是否存在缓存 */
form_data.value ??= [];

const skin_types = ref([]); //皮肤类型表
const currentIndex = ref<number | null>(null); //根据悬浮的位置显示垃圾桶

/* 获取皮肤类型表 */
setTimeout(async () => {
  $switchStore.$loading.show("正在加载皮肤类型表");
  skin_types.value = (await getSkinType()).data;
  await $switchStore.$loading.close();
  show.value = true;
}, 1000);

/* 获取链接 */
const getLink = (link: string, key: string) => {
  const last_index = form_data.value!.length === 0 ? 0 : form_data.value!.length - 1;
  form_data.value![last_index] = {
    ...form_data.value!.slice(-1)[0],
    [key]: link,
  };
};

/* 增加一项 */
const scrollBox = ref();
const addOne = () => {
  form_data.value!.push({
    id: Date.now(),
    num: 0,
    hero: hero_id.value as number,
    name: "",
    img: "",
    head: "",
    type: "",
    price: 0,
  });
  // 滚动到底部
  setTimeout(() => {
    scrollBox.value.scroll({
      top: scrollBox.value.scrollHeight,
      behavior: "smooth",
    });
  });
};

/* 删除一项 */
const delOne = (i: number) => {
  form_data.value!.splice(i, 1);
  currentIndex.value = null;
};

/* 发布 */
const commit = async () => {
  const flag = form_data.value!.every((item) => {
    return item.hero !== 0;
  });

  if (flag) {
    for (let i = 0; i < form_data.value!.length; i++) {
      const item = form_data.value![i];
      await addSkin(item);
      finish.value = true;
      setTimeout(() => {
        close();
        $switchStore.$tip("发布成功", "info");
      }, 500);
    }
  } else {
    $switchStore.$tip("请完整填写", "error");
    status.value = 0;
  }
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
