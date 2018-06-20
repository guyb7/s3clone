const RedisClient = require('../../DB')
const Storage = require('../../Storage')
const Auth = require('../models/Auth')

const { REDIS_FILE_KEY } = process.env

module.exports = async req => {
  const filepath = req.params.id || req.params.bucket + '/' + req.params['0']
  const metadataRaw = await RedisClient.getAsync(REDIS_FILE_KEY + filepath)
  if (!metadataRaw) {
    throw new Error('file-not-found')
  }
  const metadata = JSON.parse(metadataRaw)
  if (metadata.isPublic !== true) {
    await Auth.validateOwner(req.headers['x-auth'], metadata.owner)
  }
  if (req.query.metadata) {
    return {
      metadata
    }
  }
  const filePath = await Storage.getFilePath(metadata.id)
  return {
    isDownload: true,
    path: filePath,
    filename: metadata.filename
  }
}
