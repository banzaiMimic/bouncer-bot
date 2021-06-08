const
  Discord = require('discord.js'),
  client = new Discord.Client(),
  token = process.env.DISCORD_BOT_TOKEN,
  JIRA_CHANNEL = process.env.JIRA_CHANNEL_ID

const init = () => {
  getClient()
}

const getClient = async() => {
  return (!client.readyAt) ? client.login( token ) : client
}

client.once( 'ready', () => {
  console.log('DiscordClient | client ready.')
  setupListeners()
})

const setupListeners = () => {
  console.log('  readyAt', client.readyAt)
  client.on( 'message', async message => {
    // console.log('message', message)
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

const messageJira = async( message ) => {
  let channel = await getChannel( JIRA_CHANNEL )
  channel.send( message )
}

module.exports = {
  init,
  messageJira,
  messageChannel
}