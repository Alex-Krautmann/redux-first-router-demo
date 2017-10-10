module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            generators: true,
            experimentalObjectRestSpread: true,
        },
        sourceType: 'module',
        allowImportExportEverywhere: false,
    },
    plugins: [],
    extends: ['airbnb'],
    settings: {},
    globals: {
        window: true,
        document: true,
        __dirname: true,
        __DEV__: true,
        CONFIG: true,
        process: true,
        describe: true,
        test: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        fetch: true,
        alert: true,
        shallow: true,
        render: true,
        mount: true,
    },
    rules: {
        'no-use-before-define': 'off',
        'no-param-reassign': 'off',
        'react/prop-types': 'off',
        'react/no-render-return-value': 'off',
        // react/jsx-indent is turned off, it has a bug that where it messes up code indentation on --fix.
        // Prettier handles this anyway.
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': ['error', 4],
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['to'],
            },
        ],
        'spaced-comment': ['error', 'always', { markers: ['?'] }],
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: true,
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: true,
                peerDependencies: true,
            },
        ],
        'max-len': [
            'error',
            {
                code: 120,
                tabWidth: 4,
                ignoreUrls: true,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'react/sort-comp': [
            'error',
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
                    'render',
                ],
            },
        ],
        // this option sets a specific tab width for your code
        // http://eslint.org/docs/rules/indent
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                outerIIFEBody: 1,
                FunctionDeclaration: {
                    parameters: 1,
                    body: 1,
                },
                FunctionExpression: {
                    parameters: 1,
                    body: 1,
                },
            },
        ],
    },
};
