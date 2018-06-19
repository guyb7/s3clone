const multipart = require('connect-multiparty')
const staticFiles = require('./staticFiles')
const publicLibs = require('./publicLibs')

const status = require('../controllers/status')
const getFile = require('../controllers/getFile')
const updateMetadata = require('../controllers/updateMetadata')
const uploadFile = require('../controllers/uploadFile')
const deleteFile = require('../controllers/deleteFile')
const { notFound, parseError, serverError } = require('./Errors')

const multipartMiddleware = multipart()

const asyncMiddleware = promise => {
  return (req, res) => {
    promise(req)
      .then(data => {
        res.json({
          success: true,
          ...data
        })
      })
      .catch(e => {
        parseError(res, e)
      })
  }
}

module.exports = app => {
  app.get('/api/status', asyncMiddleware(status))

  app.get('/api/:bucket/*', asyncMiddleware(getFile))
  app.post('/api/:bucket/*', multipartMiddleware, asyncMiddleware(uploadFile))
  app.put('/api/:bucket/*', asyncMiddleware(updateMetadata))
  app.delete('/api/:bucket/*', asyncMiddleware(deleteFile))

  app.get('/api/*', notFound)
  app.use(serverError)

  publicLibs(app)
  app.use(staticFiles)

  app.get('*', notFound)
}
