const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const uuid = require('uuid/v4')
const moment = require('moment')

const File = require('../models/File')
const RedisClient = require('../../DB')
const Storage = require('../../Storage')

const { REDIS_FILE_KEY } = process.env

module.exports = async req => {
  const id = uuid()
  const now = moment().unix()
  const tempFile = await readFile(req.files.file.path)
  const file = new File({
    id,
    owner: req.params.bucket,
    bucket: req.params.bucket,
    filepath: req.params['0'],
    isPublic: req.query.public === 'true',
    tempPath: req.files.file.path,
    createdAt: now
  })
  const fileKey = file.getKey()
  await Storage.write(id, tempFile)
  await RedisClient.setAsync(REDIS_FILE_KEY + fileKey, JSON.stringify(file.getMetadata()))
  console.log('id', id)
  console.log('fileKey', fileKey)
  console.log('meta', file.getMetadata())
  return {
    id,
    fileKey
  }
}
