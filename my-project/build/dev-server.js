require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'test'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable
var app = express()
var compiler = webpack(webpackConfig)

// 获取本地模拟接口数据
var appData = require('../data.json')//加载本地数据文件
var seller = appData.seller//获取对应的本地数据
var goods = appData.goods
var ratings = appData.ratings
var areas = appData.areas
var apiRoutes = express.Router()
var newInvestmentAmount = appData.newInvestmentAmount//获取对应的本地数据
var takeReward = appData.takeReward
app.use('/api', apiRoutes)
app.get('/api/newInvestmentAmount', (req, res) => {
  res.json({
    errno: 0,
    data: newInvestmentAmount
  })//接口返回json数据，上面配置的数据newInvestmentAmount就赋值给data请求后调用
}),
app.post('/api/takeReward', function (req, res) { // 注意这里改为post就可以了
  res.json({
    errno: 0,
    data: takeReward
  });
})
// 模仿接口配置本地json数据
app.get('/api/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  })//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
}),
app.get('/api/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  })
}),
app.get('/api/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  })
})
app.post('/api/goods', function (req, res) { // 注意这里改为post就可以了
  res.json({
    errno: 0,
    data: goods
  });
})
// 热门国家和地区
app.get('/api/areas', function (req, res) {
  res.json({
    errno: 0,
    data: areas
  });
})
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'test') {
    opn(uri)
  }
})
