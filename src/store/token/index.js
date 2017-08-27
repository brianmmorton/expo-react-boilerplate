/* @flow */

import type { Token } from './types'
import { AsyncStorage } from 'react-native';

type Action = {
  type: string,
}

const SET_TOKEN = 'SET_TOKEN'

export default function token (state: Token = '', action: Action): Token {
  switch (action.type) {

    case SET_TOKEN:
      return action.token

    default:
      return state
  }
}

export const setToken = (token: Token): Action => ({
  type: SET_TOKEN,
  token
})

export const fetchToken = () => {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      AsyncStorage.getItem('token', (err, token) => {
        if (err) {
          reject(err);
          return dispatch(setToken(null))
        }

        dispatch(setToken(token));
        return resolve(token);
      })
    });
  }
}

export const saveToken = (token: string) => {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      AsyncStorage.setItem('token', token, err => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      })
    });
  }
}

export const resetToken = () => {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      AsyncStorage.removeItem('token', err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      })
    });
  }
}
