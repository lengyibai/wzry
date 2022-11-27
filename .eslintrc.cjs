module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    camelcase: "off",
    semi: "off", //额外的分号
    "no-undef": "off",
    "no-unused-vars": "off",
    "comma-dangle": "off", //尾随的逗号
    "import/no-self-import": "off", //禁止调用引入自身
    "no-underscore-dangle": "off", //禁止标识符中有悬空下划线
    "arrow-body-style": "off", //要求箭头函数体使用大括号
    "vue/no-setup-props-destructure": "off", //不允许对传递给setup的props进行解构
    "no-restricted-syntax": "off", //禁用特定的语法
    "max-len": "off", //强制一行的最大长度
    "no-throw-literal": "off", //禁止抛出异常字面量
    "prefer-destructuring": "off", //优先使用数组和对象解构
    // "implicit-arrow-linebreak": "off",
    "vue/multi-word-component-names": "off", //要求组件名称始终为多字
    "spaced-comment": "off", // 强制在注释中 // 或 /* 使用一致的空格
    "no-shadow": "off", //禁止变量声明与外层作用域的变量同名
    "no-promise-executor-return": "off", //不能读取返回值为promise的函数，误报
    "no-plusplus": "off", // 禁用一元操作符 ++ 和 --
    "no-param-reassign": "off", //禁止对 function 的参数进行重新赋值
    "no-new": "off", //禁止使用 new 以避免产生副作用
    "no-console": "off", //不允许出现打印
    "no-await-in-loop": "off", // 禁止在循环中出现 await
    "import/prefer-default-export": "off", //禁止只有一个按需导出
    "import/no-unresolved": "off", //无法解决路径模块，别名 @ 导致的
    "import/extensions": "off", //需要补全文件后缀
    "no-restricted-globals": "off", //未知错误
    "no-unused-expressions": "off", //不能将方法用于三元运算符

    "@typescript-eslint/no-unused-vars": "warn", //禁止使用var
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off", //不允许使用any
    "@typescript-eslint/no-empty-function": "off", //不允许空函数
    "@typescript-eslint/no-non-null-assertion": "off", //禁止非空断言
    "@typescript-eslint/no-namespace": "off", //禁止使用命名空间
  },
};

