const express = require('express')
const mountRoutes = require('./api/routes/')

const PORT = 3033

const app = express()
mountRoutes(app)

app.listen(PORT, () => console.log(`S3clone is listening on port ${PORT}`))
