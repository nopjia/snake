module.exports = {
  env: {
    browser: true,
  },
  parser: "babel-eslint",
  extends: ["airbnb", "plugin:prettier/recommended"],
  rules: {
    curly: ["error", "all"],
    "no-unused-vars": ["error", { args: "none" }],
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off",
    "prefer-destructuring": "off",
    "import/no-commonjs": "error",
    "react/destructuring-assignment": "off",
    "react/prop-types": "off",
  },
};
