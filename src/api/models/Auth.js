const validateOwner = async (authHeader, owner) => {
  if (authHeader !== owner) {
    throw new Error('not-authorized')
  }
}

module.exports = {
  validateOwner
}
