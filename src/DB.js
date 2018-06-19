const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const redisHost = process.env.REDIS_HOST
const redisPort = process.env.REDIS_PORT || 6380
const redisPassword = process.env.REDIS_PASSWORD || ''
const redisIsTLS = process.env.REDIS_TLS !== 'false'
const redisHostOptions = redisIsTLS ? {
  tls: {
    host: redisHost,
    port: redisPort
  }
} : {
  host: redisHost,
  port: redisPort
}

const client = redisHost ? redis.createClient({
  ...redisHostOptions,
  password: redisPassword.length > 0 ? redisPassword : undefined
}) : false

module.exports = client
