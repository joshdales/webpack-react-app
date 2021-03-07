const path = require('path')

const express = require('express')
const app = express()

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config')
const compiler = webpack(config)
const compilerOptions = {
  publicPath: config.output.publicPath
}

app.use(webpackDevMiddleware(compiler, compilerOptions))
app.use(webpackHotMiddleware(compiler))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

const PORT = 3000
app.listen(PORT, () => { console.log(`listening on port ${PORT}`) })