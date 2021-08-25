const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const HOST = '0.0.0.0'
const PORT = 8090
const mongoose = require('mongoose')

const logger = require('./logger')().log
const mongoInit = require('./mongo')().init({mongoose})
const bouncerBot = require('./discord/bouncerBot')({
  logger,
  cmdPrefix: '!!'
})

app.use( express.json() )
app.use( express.urlencoded({ extended: true }))

const initMongoConnection = () => {
  const connectCallback = () => {
    bouncerBot.init()
  }
  const mongoConfig = {
    mongoUrl: process.env.MONGO_URL,
    log: logger,
    connectCallback
  }
  mongoInit.connect(mongoConfig)
}

// leaving this here incase we want mongo for whatever reason
//initMongoConnection()

bouncerBot.init()

app.listen(PORT, HOST)

console.log('[bouncer bot initialized]')