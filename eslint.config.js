// @ts-check
const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const angular = require("@angular-eslint/eslint-plugin");
const angularTemplate = require("@angular-eslint/eslint-plugin-template");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
    // TypeScript & Angular Configuration
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                sourceType: "module"
            }
        },
        plugins: {
            "@angular-eslint": angular,
            "@typescript-eslint": tseslint,
            prettier: prettierPlugin
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...tseslint.configs.stylistic.rules,
            ...angular.configs.recommended.rules,

            "prettier/prettier": "error",
            "no-undef": "off",
            "@typescript-eslint/no-explicit-any": "warn",

            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    prefix: "app",
                    style: "camelCase"
                }
            ],
            "@angular-eslint/component-selector": [
                "error",
                {
                    type: "element",
                    prefix: "app",
                    style: "kebab-case"
                }
            ]
        }
    },

    // Angular HTML Templates Configuration
    {
        files: ["**/*.html"],
        languageOptions: {
            parser: require("@angular-eslint/template-parser")
        },
        plugins: {
            "@angular-eslint/template": angularTemplate
        },
        rules: {
            ...angularTemplate.configs.recommended.rules
        }
    }
];
