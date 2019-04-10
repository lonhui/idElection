'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://54.255.145.253:8098"'
  //测试 http://54.255.145.253:8098
  //正式 http://campaign.caping.co.id:8098
})
