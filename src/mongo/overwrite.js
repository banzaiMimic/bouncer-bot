const requiredParam = require('../entity/requiredParam')

const overwriteInit = ({
  Model = requiredParam('Model'),
  log = requiredParam('log')
}) => {
  const overwrite = async ({ entity = requiredParam('entity') }) => {
    try {
      const doc = await Model.findOne({ _id: entity._id })
      doc.overwrite({ ...entity })
      return await doc.save()
    } catch (e) {
      log.error({
        event: 'dao | overwrite error',
        error: e.message
      })
    }
  }
  return Object.freeze({
    overwrite
  })
}

module.exports = overwriteInit
