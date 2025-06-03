const { RateLimiterRedis } = require('rate-limiter-flexible');
const redisClient = require('../utils/redisClient');

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 30, 
  duration: 60, 
});

module.exports = async (req, res, next) => {
  try {
    console.log('Rate limit check for IP:', req.ip);
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    console.error('Rate limiter error:', rejRes);
    try {
      res.status(429).json({ error: 'Too many requests, please try again later.' });
    } catch (sendErr) {
      console.error('Error sending rate limit response:', sendErr);
      res.statusCode = 429;
      res.end('Too many requests, please try again later.');
    }
  }
};
