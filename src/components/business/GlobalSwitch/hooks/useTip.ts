import { ref } from "vue";

import tipStore from "@/store/tip";
import settingStore from "@/store/setting";
import switchStore from "@/store/switch";

export default () => {
  const $tipStore = tipStore();
  const $settingStore = settingStore();
  const $switchStore = switchStore();

  const show_tip = ref(false); //显示NPC
  const title = ref(); //左上角标题
  const content = ref(""); //文字
  const align = ref<TipType>(); //对齐方式
  const noTipName = ref(""); //不再提示的标识符
  const btn = ref(false); // 是否需要按钮
  const btn_text = ref<string[]>([]); //按钮文字
  const btnFn = ref(() => {}); //点击按钮需要触发的函数

  const tip: Switch.Tip = (config) => {
    const {
      title: biaoti,
      text,
      btn: button = false,
      align: p = "right-bottom",
      btnText = [],
      btnFn: fn = () => {},
    } = config;

    //判断是否开启了tip
    if ($settingStore.config.tip) {
      //判断是否已经设置了不再提示
      if ($tipStore.noTips[text]) {
        show_tip.value = !show_tip.value;
        $switchStore.$clickAudio("rt25");
        noTipName.value = text;
        content.value = $tipStore.tips[text];
        align.value = p;
        setTimeout(() => {
          show_tip.value = true;
        });
      }

      //如果字符数超过4，则表示自定义tip
      if (text.length !== 4) {
        show_tip.value = !show_tip.value;
        $switchStore.$clickAudio("rt25");
        noTipName.value = text;
        title.value = biaoti;
        content.value = text;
        align.value = p;
        btn.value = button;
        btn_text.value = btnText;
        btnFn.value = fn;
        setTimeout(() => {
          show_tip.value = true;
        });
      }
    }
  };

  return {
    show_tip,
    content,
    align,
    noTipName,
    title,
    btn,
    btn_text,
    btnFn,
    tip,
  };
};
