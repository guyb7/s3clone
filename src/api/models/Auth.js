const userTokens = [
  'qAzef32F',
  'hT9Lmdx'
]

const authUserToken = async authHeader => {
  if (!userTokens.includes(authHeader)) {
    throw new Error('not-authorized')
  }
}

const validateOwner = async (authHeader, owner) => {
  await authUserToken(authHeader)
  if (authHeader !== owner) {
    throw new Error('not-authorized')
  }
}

module.exports = {
  authUserToken,
  validateOwner
}
