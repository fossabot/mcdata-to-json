// https://gist.github.com/leny/064f18f8924d5b172c7d
module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "extends": "eslint:recommended",
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "comma-dangle": [2, "never"],
    "no-console": 1,
    "no-constant-condition": 2,
    "no-control-regex": 2,
    "no-debugger": 1,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty-character-class": 2,
    "no-empty": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-semi": 2,
    "no-func-assign": 2,
    "no-inner-declarations": 2,
    "no-invalid-regexp": 2,
    "no-irregular-whitespace": 2,
    "no-negated-in-lhs": 2,
    "no-unreachable": 2,
    "use-isnan": 2,
    "valid-typeof": 2,

    "accessor-pairs": 2,
    "block-scoped-var": 2,
    "curly": 2,
    "default-case": 2,
    "dot-location": [2, "property"],
    "dot-notation": 2,
    "eqeqeq": [2, "smart"],
    "no-alert": 1,
    "no-caller": 2,
    "no-case-declarations": 2,
    "no-div-regex": 1,
    "no-else-return": 2,
    "no-eval": 2,
    "no-extend-native": 2,
    "no-extra-bind": 2,
    "no-fallthrough": 2,
    "no-floating-decimal": 2,
    "no-implied-eval": 2,
    "no-iterator": 2,
    "no-labels": 2,
    "no-lone-blocks": 2,
    "no-loop-func": 2,
    "no-multi-spaces": 2,
    "no-multi-str": 2,
    "no-native-reassign": 2,
    "no-new-func": 2,
    "no-new-wrappers": 2,
    "no-new": 2,
    "no-octal-escape": 2,
    "no-octal": 2,
    "no-param-reassign": 2,
    "no-proto": 2,
    "no-redeclare": 2,
    "no-return-assign": 2,
    "no-self-compare": 2,
    "no-throw-literal": 2,
    "no-unused-expressions": [2, {
      "allowShortCircuit": true
    }],
    "no-useless-call": 2,
    "no-useless-concat": 2,
    "no-void": 2,
    "no-warning-comments": 1,
    "no-with": 2,
    "radix": [2, "as-needed"],
    "vars-on-top": 2,
    "wrap-iife": [2, "inside"],
    "yoda": 2,

    "strict": [2, "function"],

    "no-catch-shadow": 2,
    "no-delete-var": 2,
    "no-shadow-restricted-names": 2,
    "no-shadow": 2,
    "no-undef-init": 2,
    "no-unused-vars": 2,
    "no-use-before-define": 2,

    "global-require": 2,
    "handle-callback-err": 1,
    "no-new-require": 2,

    "array-bracket-spacing": [2, "always"],
    "block-spacing": [2, "always"],
    "brace-style": [2, "1tbs", {
      "allowSingleLine": false
    }],
    "camelcase": [2, {
      "properties": "always"
    }],
    "comma-spacing": [2, {
      "before": false,
      "after": true
    }],
    "comma-style": [2, "last"],
    "consistent-this": [2, "self"],
    "eol-last": 2,
    "func-style": [2, "expression"],
    "indent": [2, 4, {
      "SwitchCase": 1
    }],
    "key-spacing": [2, {
      "beforeColon": false,
      "afterColon": true
    }],
    "new-cap": 2,
    "new-parens": 2,
    "newline-after-var": [2, "always"],
    "no-array-constructor": 2,
    "no-bitwise": 2,
    "no-continue": 2,
    "no-lonely-if": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-multiple-empty-lines": [2, {
      "max": 2,
      "maxEOF": 1
    }],
    "no-nested-ternary": 2,
    "no-new-object": 2,
    "no-spaced-func": 2,
    "no-trailing-spaces": [2, {
      "skipBlankLines": true
    }],
    "no-unneeded-ternary": 2,
    "object-curly-spacing": [2, "always"],
    "one-var": [2, "always"],
    "operator-linebreak": [2, "none"],
    "quote-props": [2, "always"],
    "quotes": [2, "single", "avoid-escape"],
    "semi": [2, "always"],
    "keyword-spacing": ["error", {"before": true, "after": true}],
    "space-before-blocks": [2, "always"],
    "space-before-function-paren": [2, "never"],
    "space-infix-ops": 2,
    "space-unary-ops": [2, {
      "words": true,
      "nonwords": false
    }],
    "spaced-comment": [2, "always"],

    "arrow-parens": [2, "always"],
    "arrow-spacing": 2,
    "constructor-super": 2,
    "generator-star-spacing": [2, {
      "before": true,
      "after": false
    }],
    "no-confusing-arrow": 1,
    "no-class-assign": 2,
    "no-const-assign": 2,
    "no-dupe-class-members": 2,
    "no-this-before-super": 2,
    "no-var": 2,
    "prefer-arrow-callback": 1,
    "prefer-spread": 1,
    "prefer-template": 1,
    "require-yield": 2
  }
};