module.exports = {
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "eslint-plugin-import",
    "prettier",
    "jest-dom",
  ],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:eslint-comments/recommended",
    "plugin:promise/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["tsconfig.eslint.json"],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "react/function-component-definition": 0,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "newline-before-return": "error",
    "eol-last": "error",

    // Alows callbacks typing in interfaces props
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_(?!n$).+" },
    ],

    // Preventng default exports
    // https://www.codeandchaos.com/2021/2021-09-26-JavaScriptDefaultExport/
    "import/no-default-export": "error",
    "import/prefer-default-export": 0,

    // Disabling typescript any
    "@typescript-eslint/no-explicit-any": 1,

    // Turning on the errors for the hooks problems
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",

    "react/jsx-filename-extension": "off",

    // Allows nesting inputs inside labels
    "jsx-a11y/label-has-associated-control": 0,

    // Dropping the file extensions
    // https://stackoverflow.com/a/59268871
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],

    // note you must disable the base rule as it can report incorrect errors
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": [
      "error",
      { exceptAfterOverload: false },
    ],

    // Enforcing the separate import for the types
    // import type { Meeting } from ...
    // instead of
    // import { Meeting } from ...
    "@typescript-eslint/consistent-type-imports": "error",

    // Enforcing the destructuring
    // const { title, id } = meeting; => title || id
    // instead of
    // meeting.title || meeting.id
    "prefer-destructuring": [
      "error",
      {
        object: true,
        array: false,
      },
    ],

    // Eslint imports fix
    // https://github.com/import-js/eslint-plugin-import/issues/422
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
  ignorePatterns: [
    "build/**/*",
    "public/**/*",
    "dist/**/*",
    "coverage/**/*",
    "cypress/**/*",
    ".eslintrc.cjs",
  ],
  overrides: [
    {
      files: [
        "src/stories/**/*.stories.tsx",
        "vite.config.ts",
        "cypress.config.ts",
      ],
      rules: {
        "import/no-default-export": "off",
        "react/jsx-props-no-spreading": "off",
        "no-alert": "off",
      },
    },
  ],
};
