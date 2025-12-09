const redis = require('redis')
const logger = require('./logger')

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

const client = redis.createClient({
    url: redisUrl
})

client.on('error', (err) => {
    logger.error(`Redis client error:`, err.message)
})

client.on('connect', () => {
    logger.info('Redis connected successfully')
});

(async () => {
    try {
        await client.connect()
    } catch (err) {
        logger.error(`Failed to connect redis:`, err.message)
    }
})()

module.exports = client


