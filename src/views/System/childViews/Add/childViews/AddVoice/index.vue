<template>
  <div class="voice view-add">
    <transition name="fade">
      <div class="content" v-if="show">
        <transition-group name="fade">
          <SelectHero v-model="hero_id" key="SelectHero" />

          <!--添加完毕的语音列表-->
          <div class="voice-list" v-show="form_data!.length" key="b">
            <div
              class="voice"
              v-for="(item, index) in form_data"
              @mouseleave="voiceEnter(null)"
              @mouseenter="voiceEnter(index)"
              :key="item.desc"
            >
              <span class="desc" v-show="currentIndex !== index"> {{ item.desc }}</span>
              <div class="voice-box" v-show="currentIndex === index">
                <i class="iconfont wzry-bofangyuyin cursor-pointer" @click="play(item.voice)" />
                <i class="iconfont wzry-lajitong cursor-pointer" style="color: var(--red)" @click="del(index)" />
              </div>
            </div>
          </div>

          <!--正在添加语音的输入框盒子-->
          <div class="add-box" v-if="show_box" key="c">
            <transition-group v-if="show_box" name="fade" key="c">
              <FormInput
                v-model="voice_text"
                required
                placeholder="请输入语音文字"
                label="语音文字"
                labelWidth="190px"
                key="a"
                autoSize
              />

              <!--设置/播放语音-->
              <i
                class="iconfont cursor-pointer"
                :class="voice_link ? 'wzry-bofangyuyin' : 'wzry-mic'"
                v-show="voice_text"
                key="b"
                @click="setVoice"
              />

              <!--重置语音链接-->
              <i class="iconfont wzry-zhongzhi cursor-pointer" v-show="voice_link" key="c" @click="resetVoice" />
            </transition-group>
          </div>

          <!--添加/删除/保存按钮-->
          <i
            class="iconfont cursor-pointer"
            :class="voice_link ? 'wzry-finish' : add_status"
            key="d"
            @click="addVoice(add_status)"
          />
        </transition-group>
      </div>
    </transition>

    <!--播放语音-->
    <PlayVoice @ended="play_link = ''" v-if="play_link" :link="play_link" />

    <!--设置语音链接-->
    <AddLink v-model="show_AddLink" title="设置语音" placeholder="请输入语音链接" @get-link="getLink" />

    <!-- 发布按钮 -->
    <LibCommitBtn v-model="status" title="发布" size="50px" class="lib-commit-btn" @commit="commit" :finish="finish" />

    <!-- 取消发布 -->
    <LibCancelBtn class="lib-cancel-btn" size="50px" @close="cancel" title="取消" />

    <!-- 确认关闭 -->
    <ConfirmClose v-model="show_ConfirmClose" @close="close" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { updateHero } from "@/api/main/game/index";
import viewHide from "../../../../hooks/useViewHide";
import switchStore from "@/store/globalSwitch";

type AddStatus = "wzry-addcircle" | "wzry-shanchu";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const { hero_id, show, finish, status, form_data, show_ConfirmClose, cancel, close } = viewHide<Hero.Voice[]>(
  emit,
  "add_voice_list"
);

const voice_link = ref(""); //语音链接
const voice_text = ref(""); //语音文字
const play_link = ref(""); //用于播放
const add_status = ref<AddStatus>("wzry-addcircle"); //添加&&删除&&保存状态
const currentIndex = ref<number | null>(null); //点击的语音
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
const addVoice = (status: AddStatus) => {
  if (voice_link.value) {
    form_data.value!.push({
      desc: voice_text.value,
      voice: voice_link.value,
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
const setVoice = () => {
  if (voice_link.value) {
    play_link.value = voice_link.value;
  } else {
    show_AddLink.value = true;
  }
};

/* 重置语音 */
const resetVoice = () => {
  voice_link.value = "";
};

/* 获取语音链接 */
const getLink = (link: string) => {
  voice_link.value = link;
  currentIndex.value = null;
};

/* 点击语音列表 */
const voiceEnter = (index: number | null) => {
  currentIndex.value = index;
};

/* 播放语音 */
const play = (link: string) => {
  play_link.value = link;
};

/* 删除语音 */
const del = (index: number) => {
  form_data.value!.splice(index, 1);
};

/* 发布 */
const commit = async () => {
  if (form_data.value!.length !== 0) {
    await updateHero(hero_id.value!, { voices: form_data.value });
    setTimeout(() => {
      finish.value = true;
      close();
      $switchStore.$tip("发布成功", "info");
    }, 500);
  } else {
    $switchStore.$tip("你还没有添加语音", "error");
    status.value = 0;
  }
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
