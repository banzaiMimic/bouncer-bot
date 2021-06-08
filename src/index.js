const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  HOST = '0.0.0.0',
  PORT = 8090,
  DiscordClient = require('./discord/DiscordClient')
  auth = require('./auth')

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }))

app.listen(PORT, HOST)

DiscordClient.init()

app.post('/discord', auth, (req, res, next) => {
  const {
    event,
    message
  } = req.body

  const msg = `${event} | ${message}`
  DiscordClient.messageJira( msg )
  
  res.send('ok')
})

app.post('/jira/webhook', (req, res, next) => {

  let userName

  const { 
    webhookEvent,
    issue
  } = req.body

  const {
    projectKey
  } = req.query

  switch ( webhookEvent ) {
    case 'comment_created':
      userName = req.body.comment.author.displayName
      break
    default:
      userName = req.body.user.displayName
      break
  }

  let msg = `${issue.key} | ${webhookEvent} | ${userName} \n`
    msg += `https://consultoria.atlassian.net/browse/${issue.key}`

  DiscordClient.messageJira( msg )

  res.send('ok')

})

console.log('[ihn-ai initialized]')