import { ref } from "vue";

export default ($switchStore: any, $tipStore: any) => {
  const show_tip = ref(false); //是否显示NPC
  const content = ref(""); //文字
  const align = ref<TipType>(); //对齐方式
  const noTipName = ref(""); //不再提示的标识符

  const tip = (name: string, a: TipType = "right-bottom") => {
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
  };

  return { show_tip, content, align, noTipName, tip };
};
