/* @flow */

import { compose } from 'recompose'
import { connect } from 'react-redux'

const mapStateToProps = ({ user }) => ({ user });

const mapActionsToProps = {}

export default (container) => compose(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )
)(container)
