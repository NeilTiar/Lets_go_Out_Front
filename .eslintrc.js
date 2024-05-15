

module.exports = {

    root: true,
    
    env: {
        browser: true,
        node: true,
    },

    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',

    ], 
    plugins: [
        "vue"

    ],

    rules: {
        'vue/require-default-prop': 0,
        'vue/html-indent': ['error', 4],
        'vue/singleline-html-element-content-newline': 0,
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/valid-template-root': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/valid-attribute-name': 'error', // Activer la règle pour les noms d'attributs valides
    },

    globals: {
        _: true,
    },
}
