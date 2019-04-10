'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://172.31.29.76:8098"'
  //测试 http://54.255.145.253:8098
  //正式 http://172.31.2.198:8098
})
