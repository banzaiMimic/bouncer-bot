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
  let userName

  const { 
    webhookEvent,
    issue_event_type_name,
    issue
  } = req.body

  const {
    projectKey,
    boardId
  } = req.query

  switch ( webhookEvent ) {
    case 'comment_created':
      userName = req.body.comment.author.displayName
      break
    case 'jira:issue_updated':
      userName = req.body.user.displayName
      break
  }

  let msg = `${issue.key} | ${issue_event_type_name} | ${userName} \n`
    msg += `https://consultoria.atlassian.net/jira/software/projects/${projectKey}/boards/${boardId}`

  DiscordClient.messageJira( msg )

  res.send('ok')

})

console.log('[ihn-ai initialized]')