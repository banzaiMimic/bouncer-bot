const requiredParam = require('../entity/requiredParam')

const addInit = ({
  Model = requiredParam('Model'),
  log = requiredParam('logger')
}) => {
  const add = async ({ entity = requiredParam('entity') }) => {
    try {
      const newDoc = new Model({
        ...entity
      })
      const doc = await newDoc.save()
      return doc._id
    } catch (e) {
      log.error({
        event: 'dao | add error',
        error: e.message
      })
      return null
    }
  }
  return Object.freeze({
    add
  })
}

module.exports = addInit
