/**
 * v-prevent-overflow
 * 适配屏幕宽度，防止溢出
 */
import { type Directive } from "vue";

interface ElType extends HTMLElement {
  /** 宽度更新函数 */
  _updateWidth: () => void;
  /** 元素内容更新前的内容 */
  _last_content: string;
}

const vPreventOverflow: Directive<ElType> = {
  mounted(el) {
    //保存元素的初始宽度和内容

    const updateWidth = () => {
      const { innerWidth } = window;

      el.style.width = "";
      el.style.whiteSpace = "nowrap";
      el._last_content = el.innerHTML;

      //如果元素初始宽度小于窗口宽度的35%，则不做处理
      if (el.offsetWidth < innerWidth * 0.35) return;

      el.style.whiteSpace = "initial";
      el.style.width = `${innerWidth * 0.35}px`;
    };

    el._updateWidth = updateWidth;
    updateWidth();
  },
  updated(el) {
    //当元素内容改变时，重新调用鼠标移动事件处理函数
    if (el.innerHTML === el._last_content) return;
    el._updateWidth();
  },
};

export { vPreventOverflow };
