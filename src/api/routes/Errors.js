const notFound = (req, res) => {
  parseError(res, new Error('no-such-route'))
}

const serverError = (err, req, res, next) => {
  parseError(res, err)
}

const errors = {
  'unhandled-error': {
    id: 10,
    code: 500,
    message: 'Server side error'
  },
  'no-such-route': {
    id: 11,
    code: 404,
    message: 'No such route'
  },
  'not-authorized': {
    id: 12,
    code: 403,
    message: 'You are not authorized to make this request'
  },
  'invalid-input': {
    id: 13,
    code: 400,
    message: 'The provided parameters are invalid'
  },
  'file-not-found': {
    id: 14,
    code: 404,
    message: 'This file does not exist'
  },
  'file-removed': {
    id: 15,
    code: 404,
    message: 'This file was removed'
  }
}

const findError = err => {
  if (err.noCatch === true) {
    return {
      id: 500,
      code: 400,
      message: err.message
    }
  }
  if (errors[err.message]) {
    return errors[err.message]
  }
  return errors['unhandled-error']
}

const parseError = (res, err) => {
  const error = findError(err)
  if (error.code >= 500) {
    console.error(err.stack)
  }
  res.status(error.code).json({
    success: false,
    error: {
      id: error.id,
      message: error.message,
      ...err.details
    }
  })
}

module.exports = {
  notFound,
  serverError,
  parseError
}
