import request from '../../lib/apiClient'
import {saveAuthToken, logOff} from '../../lib/auth'
import {showError, clearError, showSuccess} from '../'
import {requestUserDetails,
  receiveUserDetails,
  getUserDetails} from './register'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'
export const LOG_OUT = 'LOG_OUT'

export const requestLogin = () => {
  return {
    type: REQUEST_LOGIN
  }
}

export const receiveLogin = (token) => {
  return {
    type: RECEIVE_LOGIN,
    token
  }
}

export const logOut = () => {
  logOff()
  return {
    type: LOG_OUT
  }
}

export function login (user, confirmSuccess) {
  return (dispatch) => {
    dispatch(requestLogin())
    request('post', '/login', user)
      .then(res => {
        const token = saveAuthToken(res.body.token)
        dispatch(receiveLogin(res.body))
        dispatch(getUserData(token.id))
        dispatch(clearError())
        confirmSuccess()
        dispatch(showSuccess('You are now logged in.'))
      })
      .catch(err => {
        const res = err.response.body
        if (res && res.errorType === 'INVALID_CREDENTIALS') {
          return dispatch(showError('Username and password do not match an existing user'))
        }
      })
  }
}

export function getUserData (id) {
  return (dispatch) => {
    dispatch(requestUserDetails())
    request('get', `/users/${id}`)
      .then(res => {
        dispatch(receiveUserDetails(res.body))
        dispatch(clearError())
      })
      .catch(() => {
        dispatch(showError('An unexpected error has occurred.'))
      })
  }
}
