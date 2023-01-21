import { ref } from "vue";

import tipStore from "@/store/tip";
import settingStore from "@/store/setting";
import switchStore from "@/store/switch";

export default () => {
  const $tipStore = tipStore();
  const $settingStore = settingStore();
  const $switchStore = switchStore();

  const show_tip = ref(false); //是否显示NPC
  const content = ref(""); //文字
  const align = ref<TipType>(); //对齐方式
  const noTipName = ref(""); //不再提示的标识符

  const tip = (name: string, p: TipType = "right-bottom") => {
    if ($settingStore.config.tip) {
      if (!$tipStore.tips[name].noTip) {
        show_tip.value = !show_tip.value;
        $switchStore.$clickAudio("rt25");
        noTipName.value = name;
        content.value = $tipStore.tips[name].text;
        align.value = p;
        setTimeout(() => {
          show_tip.value = true;
        });
      }
    }
  };

  return { show_tip, content, align, noTipName, tip };
};
