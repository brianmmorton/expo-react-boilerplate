/* @flow */

import type { User, UserState } from './types'
import { saveToken } from '@store/token'
import request from 'superagent'
import { API } from '@config'

type Action = {
  type: string,
}

const LOGIN = 'LOGIN'
const SET_USER = 'SET_USER'
const GET_USER = 'GET_USER'
const LOGOUT = 'LOGOUT'

export default function user (state: UserState = { loading: true, loggedIn: null, data: null }, action: Action): UserState {

  // console.log('**** REDUX: ', action.type, action);

  switch (action.type) {

    case GET_USER:
      return { ...state, loading: true }

    case SET_USER:
      return { ...state, loading: false, loggedIn: true, data: action.user }

    case LOGOUT:
      return { ...state, loading: false, loggedIn: false, data: null }

    default:
      return state
  }
}

export const login = (email: string, password: string): Action => {
  return dispatch => {

    dispatch(getUser());

    return new Promise((resolve, reject) => {
      request.post(API + '/auth/login')
        .send({ email, password })
        .end((err, res) => {
          if (err) {
            return reject(res);
          }

          dispatch(setUser(res.body.user));
          dispatch(saveToken(res.body.token));
          return resolve(res.body);
        })
    });
  }
}

export const fetchUser = (token: string, query: ?object) => {
  return dispatch => {

    dispatch(getUser());

    return new Promise((resolve, reject) => {
      request.get(API + '/users')
        .auth('JWT ' + token)
        .query(query)
        .end((err, res) => {
          if (err) {
            return reject(res);
          }
          dispatch(setUser(res.body));
          return resolve(res.body);
        })
    });
  }
}

export const logout = (): Action => {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      request.get(API + '/auth/logout')
        .end((err, res) => {
          if (err) {
            return reject(res);
          }
          dispatch(logoutUser());
          return resolve(res.body);
        })
    });
  }
}

export const logoutUser = (): Action => ({
  type: LOGOUT,
})

export const setUser = (user: User): Action => ({
  type: SET_USER,
  user
})

export const getUser = (): Action => ({
  type: GET_USER,
})
