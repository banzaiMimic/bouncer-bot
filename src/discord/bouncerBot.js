const path = require('path')
const Discord = require('discord.js')
const client = new Discord.Client()
const token = process.env.DISCORD_BOT_TOKEN
const fs = require('fs')

const makeBouncerBot = ({logger, cmdPrefix}) => {

  const init = () => {
    loadCommands()
    getClient()
  }
  const loadCommands = () => {
    try {
      client.commands = new Discord.Collection()
      const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'))

      for (const file of commandFiles) {
        const command = require(`../commands/${file}`)
        console.log('adding command:', command.name)
        client.commands.set(command.name, command)
      }
    } catch(e) {
      logger.error({
        event: 'bouncerBot | loadCommands error',
        message: e.message
      })
    }
  }
  const getClient = async() => (!client.readyAt) ? client.login( token ) : client

  client.once( 'ready', () => {
    logger.info({
      event: 'bouncer-bot init',
      message: `${client.readyAt} : setting up listeners...`
    })
    setupListeners()
    //messageChannel('879893083104358421', 'testing init')
  })

  const setupListeners = () => {

    client.on( 'message', async message => {
      if (!message.content.startsWith( cmdPrefix ) || message.author.bot) return
      // console.log('------------------')
      // console.log('message received : ' + message.content)
      // console.log('------------------')

      const args = message.content.slice(cmdPrefix.length).split(/ +/)
      const command = args.shift()
      
      if (!client.commands.has(command)) {
        message.reply(`nani??! try **${cmdPrefix}help**`)
        return false
      }
      try {
        client.commands.get(command).execute(message, args)
        return false
      } catch (e) {
        logger.error({
          event: 'error executing command',
          message: e.message
        })
        message.reply(`error executing command ${command}`)
      }

    })

    logger.info({
      event: 'bouncer-bot init',
      message: 'listeners ready.'
    })
    
  }

  const getChannel = async( channelId ) => {
    let client = await getClient()
    return client.channels.cache.get( channelId )
  }

  const messageChannel = async( channelId, message ) => {
    let channel = await getChannel( channelId )
    channel.send( message )
  }

  return Object.freeze({
    init,
    messageChannel
  })
}

module.exports = makeBouncerBot
