/* @flow */

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { fetchUser, logout } from '@store/user'
import { fetchToken, resetToken } from '@store/token'

const mapStateToProps = ({ user, token }) => ({ user, token });

const mapActionsToProps = { fetchUser, fetchToken, logout, resetToken }

export default (container) => compose(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )
)(container)
