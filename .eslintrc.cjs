module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["import"],
  rules: {
    //组件属性使用中划线命名法
    "vue/attribute-hyphenation": [
      2,
      "always",
      {
        ignore: ["custom-prop"],
      },
    ],
    //import排序
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
      },
    ],
    //属性排序
    "vue/attributes-order": [
      "error",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          "UNIQUE",
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT",
        ],
      },
    ],
    //禁止使用驼峰命名法
    camelcase: "off",
    //额外的分号
    semi: "off",
    //禁止使用未定义的变量
    "no-undef": "off",
    //禁止定义未使用的变量
    "no-unused-vars": "off",
    //禁止使用空代码块
    "no-empty": "off",
    //禁止尾随逗号
    "comma-dangle": "off",
    //禁止自我引入
    "import/no-self-import": "off",
    //禁止在标识符中使用悬空下划线
    "no-underscore-dangle": "off",
    //箭头函数体不需要使用大括号
    "arrow-body-style": "off",
    //禁用特定的语法
    "no-restricted-syntax": "off",
    //禁止对传递给 setup 的 props 进行解构
    "vue/no-setup-props-destructure": "off",
    //禁止抛出字面量异常
    "no-throw-literal": "off",
    //组件名称可以为单词
    "vue/multi-word-component-names": "off",
    //注释中不需要使用一致的空格
    "spaced-comment": "off",
    //允许变量声明与外层作用域的变量同名
    "no-shadow": "off",
    //允许返回 promise 的函数
    "no-promise-executor-return": "off",
    //允许使用一元操作符 ++ 和 --
    "no-plusplus": "off",
    //允许对函数的参数进行重新赋值
    "no-param-reassign": "warn",
    //允许使用 new
    "no-new": "off",
    //允许使用不必要的转义字符
    "no-useless-escape": "off",
    //不允许使用 console
    "no-console": "warn",
    //允许在循环中使用 await
    "no-await-in-loop": "off",
    //不强制要求只有一个按需导出
    "import/prefer-default-export": "off",
    //允许解析不到路径模块，包括别名 @
    "import/no-unresolved": "off",
    //不需要补全文件后缀
    "import/extensions": "off",
    //不限制全局变量
    "no-restricted-globals": "off",
    //允许将方法用于三元运算符
    "no-unused-expressions": "off",
    //允许使用对象原型方法
    "no-prototype-builtins": "off",

    //禁止使用未使用的变量
    "@typescript-eslint/no-unused-vars": "warn",
    //允许使用 any 类型
    "@typescript-eslint/no-explicit-any": "off",
    //允许空函数
    "@typescript-eslint/no-empty-function": "off",
    //允许使用命名空间
    "@typescript-eslint/no-namespace": "off",
    //允许使用特定类型
    "@typescript-eslint/ban-types": "off",

    //禁止使用未使用的变量
    "vue/no-unused-vars": "warn",
  },
};
