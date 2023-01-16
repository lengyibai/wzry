<script setup lang="ts">
import { ref } from "vue";
// import { updateHero } from "@/api/main/games/voice";
import viewHide from "../../../../hooks/useViewHide";
import switchStore from "@/store/switch";

type AddStatus = "wzry-addcircle" | "wzry-shanchu";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const {
  hero_id,
  show,
  finish,
  status,
  form_data,
  show_ConfirmClose,
  EmitCancelRelease,
  EmitConfirmRemove,
  EmitConfirmSave,
} = viewHide<Hero.Voice[]>(emit, "add_voice_list");

const voice_link = ref(""); //语音链接
const voice_text = ref(""); //语音文字
const play_link = ref(""); //用于播放
const add_status = ref<AddStatus>("wzry-addcircle"); //添加&&删除&&保存状态
const current_index = ref<number | null>(null); //点击的语音
const show_AddLink = ref(false); //显示设置语音链接弹窗
const show_box = ref(false); //是否显示填写盒子
if (!form_data.value) {
  form_data.value = [];
}

setTimeout(async () => {
  $switchStore.$loading.show("正在加载皮肤类型表");
  await $switchStore.$loading.close();
  show.value = true;
}, 1000);

/* 添加一项 */
const handleAddVoice = (status: AddStatus) => {
  if (voice_link.value) {
    form_data.value!.push({
      text: voice_text.value,
      link: voice_link.value,
    });
    voice_text.value = "";
    voice_link.value = "";
    add_status.value = "wzry-addcircle";
    show_box.value = false;
    return;
  }
  if (status === "wzry-addcircle") {
    show_box.value = true;
    add_status.value = "wzry-shanchu";
  }
  if (status === "wzry-shanchu") {
    add_status.value = "wzry-addcircle";
    voice_text.value = "";
    show_box.value = false;
  }
};

/* 设置语音 */
const handleSetVoice = () => {
  if (voice_link.value) {
    play_link.value = voice_link.value;
  } else {
    show_AddLink.value = true;
  }
};

/* 重置语音 */
const handleResetVoice = () => {
  voice_link.value = "";
};

/* 获取语音链接 */
const EmitGetLink = (link: string) => {
  voice_link.value = link;
  current_index.value = null;
};

/* 点击语音列表 */
const handleVoiceEnter = (index: number | null) => {
  current_index.value = index;
};

/* 播放语音 */
const handlePlay = (link: string) => {
  play_link.value = link;
};

/* 删除语音 */
const handleDel = (index: number) => {
  form_data.value!.splice(index, 1);
};

/* 发布 */
const EmitCommit = async () => {
  if (form_data.value!.length !== 0) {
    // await updateHero(hero_id.value!, { voices: form_data.value });
    setTimeout(() => {
      finish.value = true;
      EmitConfirmRemove();
      $switchStore.$msg("发布成功", "info");
    }, 500);
  } else {
    $switchStore.$msg("你还没有添加语音", "error");
    status.value = 0;
  }
};
</script>

<template>
  <ManageMask
    class="content"
    :show="show"
    :styles="{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }"
  >
    <transition-group name="fade">
      <SelectHero v-model="hero_id" key="SelectHero" />

      <!--添加完毕的语音列表-->
      <div class="voice-list" v-show="form_data!.length" key="b">
        <div
          class="voice"
          v-for="(item, index) in form_data"
          @mouseleave="handleVoiceEnter(null)"
          @mouseenter="handleVoiceEnter(index)"
          :key="item.text"
        >
          <span class="desc" v-show="current_index !== index">
            {{ item.text }}</span
          >
          <div class="voice-box" v-show="current_index === index">
            <i
              class="iconfont wzry-bofangyuyin cursor-pointer"
              @click="handlePlay(item.link)"
            />
            <i
              class="iconfont wzry-lajitong cursor-pointer"
              style="color: var(--red)"
              @click="handleDel(index)"
            />
          </div>
        </div>
      </div>

      <!--正在添加语音的输入框盒子-->
      <div class="add-box" v-if="show_box" key="c">
        <transition-group v-if="show_box" name="fade" key="c">
          <FormInput
            v-model="voice_text"
            required
            autoWidth
            placeholder="请输入语音文字"
            label="语音文字"
            labelWidth="190px"
            key="a"
          />

          <!--设置/播放语音-->
          <i
            class="iconfont cursor-pointer"
            :class="voice_link ? 'wzry-bofangyuyin' : 'wzry-mic'"
            v-show="voice_text"
            key="b"
            @click="handleSetVoice"
          />

          <!--重置语音链接-->
          <i
            class="iconfont wzry-zhongzhi cursor-pointer"
            v-show="voice_link"
            key="c"
            @click="handleResetVoice"
          />
        </transition-group>
      </div>

      <!--添加/删除/保存按钮-->
      <i
        class="iconfont cursor-pointer"
        :class="voice_link ? 'wzry-finish' : add_status"
        key="d"
        @click="handleAddVoice(add_status)"
      />
    </transition-group>

    <!--播放语音-->
    <PlayVoice @ended="play_link = ''" v-if="play_link" :link="play_link" />

    <!--设置语音链接-->
    <transition name="fade">
      <AddLink
        v-if="show_AddLink"
        v-model="show_AddLink"
        title="设置语音"
        placeholder="请输入语音链接"
        @get-link="EmitGetLink"
      />
    </transition>

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
