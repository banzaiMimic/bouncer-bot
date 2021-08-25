const path = require('path')
const fs = require('fs')

const commandFiles = fs.readdirSync(path.join(__dirname, './')).filter(file => file.endsWith('.js'))
let commandNames = []

for (const file of commandFiles) {
  if (file !== 'index.js' && file !== 'help.js') {
    commandNames.push(file.replace('.js', ''))
  }
}

module.exports = {
  name: 'help',
  description: `help commands`,
  locked: false,
  execute(message, args) {
    let helpMenu = `**bouncer-bot** command list : \n`
    commandNames.forEach( command => {
      const cmd = message.client.commands.get( command )
      helpMenu += `${cmd.name} : ${cmd.description} \n`
    })
    message.channel.send( helpMenu )
  }
}
