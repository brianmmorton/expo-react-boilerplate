/* @flow */

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { fetchUser, logout } from '@store/user'
import { fetchToken, resetToken } from '@store/token'
import { fetchMonthlyStats } from '@store/monthly-stats'
import { fetchProjects } from '@store/projects'

const mapStateToProps = ({ user, token, monthlyStats, projects }) => ({ user, token, monthlyStats, projects });

const mapActionsToProps = { fetchProjects, fetchUser, fetchToken, logout, resetToken, fetchMonthlyStats }

export default (container) => compose(
  connect(
    mapStateToProps,
    mapActionsToProps,
  )
)(container)
