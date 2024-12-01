module.exports= {
    //commonJs语法
    devServer: {
        port:8020,
        proxy: {
            '/api': 'http://localhost:3001'
        }
    }
}