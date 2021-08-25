const dao = require('./dao')
const init = require('./init')

const mongo = () => {
  return Object.freeze({
    dao,
    init
  })
}

module.exports = mongo
