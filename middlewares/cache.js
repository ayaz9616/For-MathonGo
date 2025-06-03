const redisClient = require('../utils/redisClient');

module.exports = async (req, res, next) => {
  const key = 'chapters_cache:' + JSON.stringify(req.query);
  const cached = await redisClient.get(key);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  res.sendResponse = res.json;
  res.json = (body) => {
    redisClient.set(key, JSON.stringify(body), 'EX', 3600);
    res.sendResponse(body);
  };
  next();
};
