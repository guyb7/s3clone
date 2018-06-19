const path = require('path')
const express = require('express')

const NODE_MODULES_DIR = path.join(__dirname, '..', '..', '..', 'node_modules')

module.exports = app => {
  app.use('/lib/uikit', express.static(path.join(NODE_MODULES_DIR, 'uikit', 'dist')))
  app.use('/lib/axios', express.static(path.join(NODE_MODULES_DIR, 'axios', 'dist')))
}
