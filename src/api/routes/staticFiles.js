const path = require('path')
const express = require('express')

const PUBLIC_DIR = path.join(__dirname, '..', '..', 'public')

module.exports = express.static(PUBLIC_DIR, { extensions: ['html'] })
