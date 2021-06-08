/*
  checks if 'x-api-key is present in headers
*/

async function auth (req, res, next) {

  const apiKey = req.headers['x-api-key']

  if (!apiKey) {
    return res.status(401).json({ message: 'Missing Authorization Header' })
  }

  if (apiKey === process.env.API_KEY) {
    next()
  } else {
    return res.status(403).json({ message: 'Authorization Invalid' })
  }
}

module.exports = auth
