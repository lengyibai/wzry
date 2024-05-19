/**
 * v-wave-diffuse
 * 点击水波效果
 */
const vWaveDiffuse = {
  mounted(el: HTMLElement, { value = "#ccc" }) {
    el.style.cssText = `
      overflow: hidden;
    `;
    const style = `
      position: absolute;
      background-color: ${value};
      transform: translate(-50%, -50%);
      pointer-events: none;
      border-radius: 50%;
      width: 0;
      height: 0;
      transition: all 1s linear;
      opacity: 0.75;
    `;
    el.addEventListener("mousedown", function (e: MouseEvent) {
      const v = e.target as HTMLInputElement;
      const c = document.createElement("span");
      c.style.cssText = style;
      const x = e.clientX - v.getBoundingClientRect().left;
      const y = e.clientY - v.getBoundingClientRect().top;
      c.style.left = x + "px";
      c.style.top = y + "px";
      this.appendChild(c);
      const width = v.offsetWidth;
      const height = v.offsetHeight;
      const size = width > height ? width : height;
      c.style.width = `${size * 5}px`;
      c.style.height = `${size * 5}px`;
      function fn() {
        c.style.transition = "all 0.675s ease-out";
        c.style.opacity = "0";
        setTimeout(() => {
          c.remove();
        }, 675);
      }
      el.addEventListener("mouseup", fn);
      el.addEventListener("mouseleave", fn);
    });
  },
};

export { vWaveDiffuse };
