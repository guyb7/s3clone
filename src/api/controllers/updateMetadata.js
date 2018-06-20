const moment = require('moment')

const RedisClient = require('../../DB')
const Auth = require('../models/Auth')
const File = require('../models/File')

const { REDIS_FILE_KEY } = process.env

module.exports = async req => {
  const filepath = req.params.id || req.params.bucket + '/' + req.params['0']
  const metadataRaw = await RedisClient.getAsync(REDIS_FILE_KEY + filepath)
  if (!metadataRaw) {
    throw new Error('file-not-found')
  }
  const metadata = JSON.parse(metadataRaw)
  await Auth.validateOwner(req.headers['x-auth'], metadata.owner)
  if (metadata.deletedAt !== null) {
    throw new Error('file-removed')
  }

  const now = moment().unix()
  const oldFile = new File({
    ...metadata
  })
  const file = new File({
    ...metadata,
    modifiedAt: now,
    isPublic: req.query.public === 'true'
  })
  const oldFileKey = oldFile.getKey()
  const fileKey = file.getKey()

  await RedisClient.delAsync(REDIS_FILE_KEY + oldFileKey)
  await RedisClient.setAsync(REDIS_FILE_KEY + fileKey, JSON.stringify(file.getMetadata()))
}
