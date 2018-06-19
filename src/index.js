require('dotenv').config()

const DB = require('./DB')
const Storage = require('./Storage')
const express = require('express')
const mountRoutes = require('./api/routes/')

const { PORT } = process.env || 3033

const main = async () => {
  const app = express()
  mountRoutes(app)
  await Storage.init()

  app.listen(PORT, () => console.log(`S3clone is listening on port ${PORT}`))
}

main()
