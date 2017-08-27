/* @flow */

export type User = {
  name: string,
  company: object,
  phoneNumber: number,
  email: string,
}

export type UserState = {
  data: User,
  loading: boolean,
  loggedIn: boolean
}
