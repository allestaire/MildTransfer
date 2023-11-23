import Lang from '@/Lang'
import AuthenticationFailed from '@/exceptions/AuthenticationFailed'
import FailureException from '@/exceptions/FailureException'
import InvalidCredential from '@/exceptions/InvalidCredential'
import SessionExpired from '@/exceptions/SessionExpired'
import { NextResponse } from 'next/server'
import * as Yup from 'yup'
import io from 'socket.io-client'

const parseYupValidator = (e) => {
  let errors = {}
  if (e instanceof Yup.ValidationError) {
    errors = e.inner.reduce((acc, curr) => {
      acc[curr.path] = curr.errors
      return acc
    }, {})
  }
  return errors
}

const setFieldError = (errors, schema, mapper = {}) => {
  if (errors) {
    Object.keys(errors).forEach(field => {
      let fieldKey = field
      if (mapper[field]) {
        fieldKey = mapper[field]
      }
      schema.setFieldError(fieldKey, errors[field].join(''))
    })
  }
}

const handleException = (exception) => {
  if (exception instanceof Yup.ValidationError) {
    return NextResponse.json(parseYupValidator(exception), {
      status: 422
    })
  } else if (exception instanceof AuthenticationFailed) {
    return NextResponse.json({
      message: Lang.getString('api.middleware.UNAUTHORIZED_ACCESS')
    }, {
      status: 401
    })
  } else if (exception instanceof InvalidCredential) {
    return NextResponse.json({
      username: [Lang.getString('api.validation.INVALID_CREDENTIAL')]
    }, {
      status: 422
    })
  } else if (exception instanceof SessionExpired) {
    return NextResponse.json({
      message: Lang.getString('api.validation.SESSION_EXPIRED')
    }, {
      status: 400
    })
  } else if (exception instanceof FailureException) {
    return NextResponse.json({
      message: exception.toString()
    }, {
      status: 400
    })
  }
  console.error(exception)
  return NextResponse.json({
    message: Lang.getString('api.middleware.SERVER_ERROR')
  }, {
    status: 500
  })
}

const socket = async (port) => {
  await fetch("/api/socket/io");
  const _socket = io('ws://localhost:' + port, {});
  _socket.on('connect', () => {
    console.log('Connected to the server');
  });

  return _socket
}


export default {
  handleException, setFieldError, socket
}
