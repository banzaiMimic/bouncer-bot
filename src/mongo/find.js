const requiredParam = require('../entity/requiredParam')

const find = ({
  Model = requiredParam('Model'),
  log = requiredParam('log')
}) => {
  const all = async (params) => {
    try {
      return params ? Model.find({ ...params }) : Model.find({})
    } catch (e) {
      log.error({
        event: 'dao | get error',
        error: e.message
      })
      return null
    }
  }

  const param = ({ ...param }) => {
    const one = async () => await Model.findOne(param).exec()
    const all = async () => await Model.find(param).exec()
    return Object.freeze({
      one,
      all
    })
  }

  const docId = async ({ _id }) => await Model.findById({ _id }).exec()

  return Object.freeze({
    all,
    param,
    docId
  })
}

module.exports = find
