const requiredParam = require('../entity/requiredParam')

const updateInit = ({
  Model = requiredParam('Model'),
  log = requiredParam('log')
}) => {
  const update = async ({ entity }) => {
    try {
      const doc = await Model.findOne({ _id: entity._id })
      doc.set(entity)
      return await doc.save()
    } catch (e) {
      if (!entity._id) {
        log.error({
          event: 'dao | update error',
          message: 'missing entity._id'
        })
      }
      log.error({
        event: 'dao | update error!',
        error: e.message
      })
    }
  }
  return Object.freeze({
    update
  })
}

module.exports = updateInit
