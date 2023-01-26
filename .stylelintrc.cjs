module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-prettier",
    "stylelint-config-recommended-less",
    "stylelint-config-standard-vue",
  ],
  plugins: ["stylelint-order"],
  overrides: [
    {
      files: ["**/*.(less|css|vue|html)"],
      customSyntax: "postcss-less",
    },
    {
      files: ["**/*.(html|vue)"],
      customSyntax: "postcss-html",
    },
  ],
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts", "**/*.json", "**/*.md", "**/*.yaml"],
  rules: {
    "no-eol-whitespace": null,
    "selector-class-pattern": null,
    "property-no-vendor-prefix": null, //禁止前缀
    "custom-property-empty-line-before": null, //禁止内联css变量
    "no-descending-specificity": null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    "declaration-block-trailing-semicolon": null, //内联样式尾随分号
    "font-family-no-missing-generic-family-keyword": null, //字体名称问题
    "no-duplicate-selectors": null, //禁止重复类名
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"],
      },
    ],
    // 指定样式的排序
    "order/properties-order": [
      /* 表示定位/布局的属性 */
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "justify-content",
      "align-items",
      "visibility",
      "overflow",
      "overflow-x",
      "overflow-y",
      /* 表示盒子模型的属性 */
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "border",
      "border-style",
      "border-width",
      "border-color",
      "border-top-style",
      "border-top-width",
      "border-top-color",
      "border-right-style",
      "border-right-width",
      "border-right-color",
      "border-bottom-style",
      "border-bottom-width",
      "border-bottom-color",
      "border-left-style",
      "border-left-width",
      "border-left-color",
      "border-radius",
      "box-shadow",
      "outline",
      "resize",
      /* 字体相关的属性 */
      "color",
      "font-size",
      "font-family",
      "text-align",
      "text-justify",
      "text-indent",
      "text-overflow",
      "text-decoration",
      "text-shadow",
      "white-space",
      "list-style",
      /* 背景 */
      "background",
      "background-position",
      "background-repeat",
      "background-size",
      "background-color",
      "background-clip",
      /* CSS3 */
      "filter",
      "transition",
      "opacity",
    ],
  },
};
