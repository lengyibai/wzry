module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
  overrides: [],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-unused-vars': 'warn',
    camelcase: 'off',
    'import/no-self-import': 'off', //禁止调用引入自身
    'no-underscore-dangle': 'off', //禁止标识符中有悬空下划线
    'arrow-body-style': 'off', //要求箭头函数体使用大括号
    'vue/no-setup-props-destructure': 'off', //不允许对传递给setup的props进行解构
    'no-restricted-syntax': 'off', //禁用特定的语法
    'max-len': 'off', //强制一行的最大长度
    'no-throw-literal': 'off', //禁止抛出异常字面量
    'prefer-destructuring': 'off', //优先使用数组和对象解构
    // 'implicit-arrow-linebreak': 'off',
    'vue/multi-word-component-names': 'off', //要求组件名称始终为多字
    'spaced-comment': 'off', // 强制在注释中 // 或 /* 使用一致的空格
    'no-shadow': 'off', //禁止变量声明与外层作用域的变量同名
    'no-promise-executor-return': 'off', //不能读取返回值为promise的函数，误报
    'no-plusplus': 'off', // 禁用一元操作符 ++ 和 --
    'no-param-reassign': 'off', //禁止对 function 的参数进行重新赋值
    'no-new': 'off', //禁止使用 new 以避免产生副作用
    'no-console': 'off', //不允许出现打印
    'no-await-in-loop': 'off', // 禁止在循环中出现 await
    'import/prefer-default-export': 'off', //禁止只有一个按需导出
    'import/no-unresolved': 'off', //无法解决路径模块，别名 @ 导致的
    'import/extensions': 'off', //需要补全文件后缀
    'no-restricted-globals': 'off', //未知错误
    'no-unused-expressions': 'off', //不能将方法用于三元运算符
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }], //未知错误
  },
};
