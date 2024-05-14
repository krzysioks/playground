module.exports = {
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true
    },
    parser: '@typescript-eslint',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        'no-prototype-builtins': 'off',
        'no-undef': 'off',
        'no-useless-escape': 'off'
    },
    settings: {
        react: {
            createClass: 'createReactClass',
            pragma: 'React',
            version: 'detect',
            flowVersion: '0.53'
        }
    }
};
