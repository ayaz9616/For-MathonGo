// Simple admin authentication middleware (API key based)
module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    return next();
  }
  return res.status(403).json({ error: 'Admin access required' });
};
