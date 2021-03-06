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

  const now = moment().unix()
  const file = new File({
    ...metadata,
    deletedAt: now
  })
  const fileKey = file.getKey()

  await RedisClient.setAsync(REDIS_FILE_KEY + fileKey, JSON.stringify(file.getMetadata()))
}
