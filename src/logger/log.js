const { createLogger, format, transports } = require('winston')
const { combine, timestamp } = format

const log = createLogger({
  format: combine(
    timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console()
  ]
})

module.exports = log
