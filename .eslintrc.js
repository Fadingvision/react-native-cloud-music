module.exports = {
  root: true, // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找配置文件。
  parser: 'babel-eslint',
  parserOptions: {
    // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
    ecmaVersion: 7,
    sourceType: 'module'
  },
  plugins: ['babel', 'react', 'react-native'],
  globals: {
    jest: true,
    fetch: true,
    __DEV__: true,
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  extends: ['airbnb', 'plugin:react/recommended'], // 配置代码检查风格
  rules: {
    // react
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'react/sort-comp': 0,
    'import/extensions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,

    // common rules
    'comma-dangle': 0,
    'no-unused-expressions': 0,
    'class-methods-use-this': 0,
    'semi': 0,
    'arrow-parens': [2, 'as-needed']
  },

  env: {
    jest: true, // 添加所有的 jest 版本的测试全局变量。
    es6: true // 支持除了modules所有 ECMAScript 6 特性。
  }
};
