const requiredParam = param => {
  throw new Error(`${param} can not be null or undefined.`)
}

module.exports = requiredParam
