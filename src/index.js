const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  HOST = '0.0.0.0',
  PORT = 8090,
  DiscordClient = require('./discord/DiscordClient')

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }))

app.listen(PORT, HOST)

DiscordClient.init()

app.post('/jira/webhook', (req, res, next) => {

  console.log('/jira/webhook POST ---')
  console.log('  req.body:', req.body)
  console.log('  req.query:', req.query)

  discordApi.messageChannel( channelId, message )
  res.send('ok')

})

console.log('[ihn-ai initialized]')