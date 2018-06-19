require('dotenv').config()

const DB = require('./DB')
const express = require('express')
const mountRoutes = require('./api/routes/')

const { PORT } = process.env || 3033

const app = express()
mountRoutes(app)

app.listen(PORT, () => console.log(`S3clone is listening on port ${PORT}`))
