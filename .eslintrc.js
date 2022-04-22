module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {},
  // plugins: ['autofix'],
  // plugins: ['unused-imports'],
  rules: {
    // "autofix/no-unused-vars": 'error'
    'no-param-reassign': ['error', { props: false }],
    camelcase: [
      'error',
      { allow: ['UNSAFE_componentWillMount', 'UNSAFE_componentWillReceiveProps'] }
    ],
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'no-const-assign': 'error'
    // 'unused-imports/no-unused-imports': 'error'
  }
};
