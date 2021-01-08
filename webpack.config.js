const path = require('path');

module.exports = function (env) {
    const res = {
        entry: {
            app: './src/index.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },

        // // I need this to use "exceljs"
        // node: {fs: "empty"},

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        debug: true,
                                        useBuiltIns: 'usage',
                                        corejs: 3,
                                        targets: {
                                            browsers: ['defaults'],
                                        },
                                    },
                                ],
                                ['@babel/preset-react'],
                            ],
                            plugins: [],
                        },
                    },
                },
            ],
        },
    };
    if (env.development) {
        res['mode'] = 'development';
        res['devtool'] = 'inline-source-map';
    }
    if (env.production) {
        res['mode'] = 'production';
        // res['plugins'] = [
        //     new (require('webpack')).DefinePlugin({
        //         'process.env.NODE_ENV': JSON.stringify('production')
        //     })
        // ];
    }

    return res;
};
