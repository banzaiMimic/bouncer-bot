const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  HOST = '0.0.0.0',
  PORT = 8090,
  DiscordClient = require('./discord/DiscordClient')
  auth = require('./auth')

app.use( express.json() )
app.use( express.urlencoded({ extended: true }))

app.listen(PORT, HOST)

DiscordClient.init()

console.log('[bouncer bot initialized]')