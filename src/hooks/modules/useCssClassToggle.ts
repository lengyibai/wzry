/** @description css切换类名 */
const useCssClassToggle = () => {
  const html = document.documentElement.classList;

  const ExposeMethods = {
    /** @description 设置柔光
     * @param v 柔光状态
     */
    setShine(v: boolean) {
      html.remove("soft-light");
      if (v) {
        html.add("soft-light");
      } else {
        html.remove("soft-light");
      }
    },
  };

  return {
    ...ExposeMethods,
  };
};

export { useCssClassToggle };
