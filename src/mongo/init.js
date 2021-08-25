const requiredParam = require('../entity/requiredParam')

const init = ({
  mongoose = requiredParam('mongoose')
}) => {
  const connect = async ({
    mongoUrl = requiredParam('mongoUrl'),
    log = requiredParam('log'),
    connectCallback = () => {}
  }) => {
    const options = { connectTimeoutMS: 10000 }

    await mongoose.connect(mongoUrl, options)
      .then(async (data, args) => {
        log.info('', {
          event: 'mongo connected'
        })
        connectCallback()
      })
      .catch(e => {
        log.error('', {
          event: 'utils.mongo | connection error',
          message: e.message
        })
      })
    mongoose.connection.on('error', e => {
      log.error('', {
        event: 'utils.mongo | mongoose error',
        message: e.message
      })
    })

    mongoose.connection.on('disconnected', () => {
      log.info('', {
        event: 'utils.mongo | mongo disconnected'
      })
    })

    process.on('SIGINT', function () {
      mongoose.connection.close(() => {
        log.info('', {
          event: 'utils.mongo | mongo disconnected from process.SIGINT'
        })
        process.exit(0)
      })
    })
    return true
  }
  return Object.freeze({
    connect
  })
}

module.exports = init
