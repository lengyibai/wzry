import { ref } from "vue";
import type { TipStore } from "@/store/tip";
import type { SettingStore } from "@/store/setting";
import type { SwitchStore } from "@/store/switch";

export default (
  $switchStore: SwitchStore,
  $tipStore: TipStore,
  $settingStore: SettingStore
) => {
  const show_tip = ref(false); //是否显示NPC
  const content = ref(""); //文字
  const align = ref<TipType>(); //对齐方式
  const noTipName = ref(""); //不再提示的标识符

  const tip = (name: string, a: TipType = "right-bottom") => {
    if ($settingStore.config.tip) {
      if (!$tipStore.tips[name].noTip) {
        show_tip.value = !show_tip.value;
        $switchStore.$clickAudio("tip");
        noTipName.value = name;
        content.value = $tipStore.tips[name].text;
        align.value = a;
        setTimeout(() => {
          show_tip.value = true;
        });
      }
    }
  };

  return { show_tip, content, align, noTipName, tip };
};
