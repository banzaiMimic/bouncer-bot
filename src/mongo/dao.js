const requiredParam = require('../entity/requiredParam')
const logger = require('../logger')
const addInit = require('./add')
const updateInit = require('./update')
const overwriteInit = require('./overwrite')
const find = require('./find')
const deleteInit = require('./delete')

const dao = ({
  Model = requiredParam('Model'),
  log = logger().log
}) => {
  return Object.freeze({
    add: addInit({ Model, log }).add,
    update: updateInit({ Model, log }).update,
    overwrite: overwriteInit({ Model, log }).overwrite,
    find: find({ Model, log }),
    delete: deleteInit({ Model, log })
  })
}

module.exports = dao
