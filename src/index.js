const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const HOST = '0.0.0.0'
const PORT = 8090
const mongoose = require('mongoose')

const log = require('./logger')().log
const mongoInit = require('./mongo')().init({mongoose})
const DiscordClient = require('./discord/DiscordClient')

app.use( express.json() )
app.use( express.urlencoded({ extended: true }))

const initMongoConnection = () => {
  const mongoConfig = {
    mongoUrl: process.env.MONGO_URL,
    log
  }
  mongoInit.connect(mongoConfig)
}

initMongoConnection()

app.listen(PORT, HOST)

DiscordClient.init()

console.log('[bouncer bot initialized]')