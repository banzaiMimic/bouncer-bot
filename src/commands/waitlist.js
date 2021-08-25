let userList = []

module.exports = {
  name: 'waitlist',
  description: `add | remove | next i.e. **waitlist add pipeDream**`,
  locked: false,
  execute(message, args) {
    
    const action = args[0]
    const user = args[1]
    
    if (args.length === 0) {
      let msg
      if (userList.length === 0) {
        msg = 'is empty'
      } else {
        msg = userList
      }

      message.channel.send(`current queue: ${msg}`)
      
      return
    }

    switch (action) {
      case 'add':
        userList.push(user)
        message.channel.send(`[${user}] added to queue.`)
        break
      case 'remove':
        userList = userList.filter(u => u !== user)
        message.channel.send(`if [${user}] was in there, they're not anymore...`)
        break
      case 'next':
        if (userList.length >= 1) {
          const userDeleted = userList[0]
          userList.shift()
          message.channel.send(`@${userDeleted} ready up`)
        } else {
          message.channel.send('noone to delete...')
        }
        break
      case 'clear':
        userList = []
        message.channel.send('userList has been cleared')
        break
      default:
        message.channel.send( `no clue what you're trying to do friend... try **help** command` )
        break
    }
    //message.channel.send( 'workin on it...' )
  }
}
