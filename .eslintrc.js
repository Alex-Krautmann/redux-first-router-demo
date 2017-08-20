module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            generators: true,
            experimentalObjectRestSpread: true
        },
        sourceType: 'module',
        allowImportExportEverywhere: false
    },
    plugins: ['flowtype'],
    extends: ['airbnb', 'plugin:flowtype/recommended'],
    settings: {
        flowtype: {
            onlyFilesWithFlowAnnotation: true
        }
    },
    globals: {
        window: true,
        document: true,
        __dirname: true,
        __DEV__: true,
        CONFIG: true,
        process: true,
        jest: true,
        describe: true,
        test: true,
        it: true,
        expect: true,
        beforeEach: true,
        fetch: true,
        alert: true
    },
    rules: {
        'no-use-before-define': 0,
        'no-param-reassign': 0,
        'react/prop-types': 0,
        'react/no-render-return-value': 0,
        'no-confusing-arrow': 0,
        'react/no-array-index-key': 1,
        // react/jsx-indent is turned off, it has a bug that where it messes up code indentation on --fix.
        // Prettier handles this anyway.
        'react/jsx-indent': 0,
        'react/jsx-indent-props': [2, 4],
        'flowtype/no-weak-types': 1,
        'flowtype/semi': [2, 'never'],
        'spaced-comment': [2, 'always', { markers: ['?'] }],
        'no-unused-expressions': [
            2,
            {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: true
            }
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: true,
                peerDependencies: true
            }
        ],
        'max-len': [
            'error',
            {
                code: 100,
                tabWidth: 2,
                ignoreUrls: true,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            }
        ],
        'react/sort-comp': [
            2,
            {
                order: [
                    'propTypes',
                    'props',
                    'state',
                    'defaultProps',
                    'contextTypes',
                    'childContextTypes',
                    'getChildContext',
                    'static-methods',
                    'lifecycle',
                    'everything-else',
                    'render'
                ]
            }
        ],
        // this option sets a specific tab width for your code
        // http://eslint.org/docs/rules/indent
        indent: [2, 4],
    }
}
