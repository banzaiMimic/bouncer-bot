const requiredParam = require('../entity/requiredParam')

const deleteInit = ({
  Model = requiredParam('Model'),
  log = requiredParam('log')
}) => {
  const docId = async ({ _id }) => await Model.deleteOne({ _id })
  const param = async ({ ...param }) => {
    return await Model.deleteOne(param, e => {
      if (e) {
        log.error({
          event: 'dao | deleteByParam error',
          error: e.message
        })
        throw new Error('dao | deleteByParam error', e.message)
      }
    })
  }
  return Object.freeze({
    docId,
    param
  })
}

module.exports = deleteInit
