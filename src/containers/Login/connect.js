/* @flow */

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { fetchUser, setUser, login } from '@store/user'
import { saveToken } from '@store/token'

const mapStateToProps = ({ user, token }) => ({ user, token });

const mapActionsToProps = { saveToken, fetchUser, setUser, login }

export default (container) => compose(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )
)(container)
