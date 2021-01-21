module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  'extends': [
    'airbnb',
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: '2018',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  plugins: [
    'eslint-plugin-import-order-alphabetical',
    'import',
    'promise',
    'react',
    'react-hooks',
  ],
  rules: {
    // specify how imports should be ordered and grouped
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        ['sibling', 'parent'],
        'index',
      ],
      'newlines-between': 'always',
    }],

    // require imports to be in alphabetical order
    'import-order-alphabetical/order': 'error',

    // force double quotes in jsx attributes
    'jsx-quotes': ['error', 'prefer-double'],

    // No more than 1 empty line in a row and the end of the file can have a max of 1 empty line.
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxEOF: 1,
    }],

    // don't allow unused variables/params unless they are prefixed with 2 underscores
    'no-unused-vars': ['error', {
      args: 'all',
      argsIgnorePattern: '^__',
      varsIgnorePattern: '^__',
    }],

    // don't require spaces around curly braces `{foo}`, not `{ foo }`
    'object-curly-spacing': ['error', 'never'],

    // inline functions can break shouldComponentUpdate optimization and harm the performance.
    'react/jsx-no-bind': ['error', {
      ignoreRefs: false,
      allowArrowFunctions: false,
      allowFunctions: false,
      allowBind: false,
      ignoreDOMComponents: true,
    }],

    // don't forbid stuff like <tag>content</tag> on a single line
    'react/jsx-one-expression-per-line': 'off',

    // spreading props is bad, but it's very useful for styled-components
    'react/jsx-props-no-spreading': 'off',

    // required using default props in alphabetical order
    'react/jsx-sort-default-props': ['error', {
      ignoreCase: true,
    }],

    // required using props in alphabetical order
    'react/jsx-sort-props': ['error', {
      ignoreCase: true,
      reservedFirst: true,
    }],

    // don't allow using of undeclared props
    'react/prop-types': ['error', {
      ignore: [
        'children',
        'className',
        'theme', // styled-components
        'variant', // styled-system
      ],
    }],

    // required using prop types in alphabetical order
    'react/sort-prop-types': ['error', {
      ignoreCase: true,
      requiredFirst: true,
      sortShapeProp: true,
    }],

    // even airbnb thinks it's better, they're just limited by their own babel preset:
    // https://github.com/airbnb/javascript/commit/089022aeff7b4d753c9f419c5b4e3a26cdf625b8
    'react/static-property-placement': ['error', 'static public field'],

    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js#L484
    'react/state-in-constructor': ['error', 'never'],

    // TODO: Conflicts with react/sort-prop-types
    // require object keys to be sorted alphabetically
    // 'sort-keys': ['error', 'asc', {
    //   caseSensitive: false,
    // }],
  },
};
