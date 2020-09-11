const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  HOST = '0.0.0.0',
  PORT = 8090

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }))

app.listen(PORT, HOST)

console.log('hello ', process.env.DISCORD_TOKEN)