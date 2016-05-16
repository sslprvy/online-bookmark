module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname+'/build',
        filename: 'online-bookmark.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
