const RedisClient = require('../../DB')
const Storage = require('../../Storage')

const { REDIS_FILE_KEY } = process.env

module.exports = async req => {
  const filepath = req.params.id || req.params.bucket + '/' + req.params['0']
  const metadataRaw = await RedisClient.getAsync(REDIS_FILE_KEY + filepath)
  if (!metadataRaw) {
    throw new Error('file-not-found')
  }
  const metadata = JSON.parse(metadataRaw)
  if (metadata.isPublic !== true) {
    if (!req.headers['x-auth'] || req.headers['x-auth'] !== metadata.owner) {
      throw new Error('not-authorized')
    }
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
