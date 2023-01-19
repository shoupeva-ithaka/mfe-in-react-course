const HtmlWebpackPlugin = require('html-webpack-plugin');

// Shared webpack between dev and prod
module.exports = {
    module: {
        rules: [
            /**
             * LOADERS
             * ------------------------------------------------------------
             * Tells webpack to process different files as we import them
             * THe loader we will use is Babel
             */
            {
                // whenever a file is imported with an extension of 'mjs' or 'js', we want it to be processed by Babel
                test: /\.m?js$/, 
                // don't run Babel on anything in this dir
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            // processes any jsx tags we add in (react files)
                            '@babel/preset-react', 
                            // transforms different es syntaxes to es5
                            '@babel/preset-env'
                        ],
                        // adds the ability for async syntax and others
                        plugins: ['@babel/plugin-transform-runtime']
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};