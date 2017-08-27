/* @flow */

import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import io from '@services/socket-io'

const { height, width } = Dimensions.get('window');

import styles from './styles'
import connect from './connect'

import { Text } from '@components';

type Props = {
  user: object,
  token: string,
  fetchUser: Function,
  fetchToken: Function,
  resetToken: Function,
}

class HomeContainer extends Component {

  state = {}

  componentWillReceiveProps ({ user }) {
    if (!user.loading && user.data) {
      console.log(`Initiating user for ${user.data.name} ${user.data.id}`);

      Segment.identifyWithTraits(user.data.id, { name: user.data.name, company: user.data.company.name, created_at: user.data.created_at })
      Segment.track('view-home-mobile');

      /*
        Register that this socket is for this user_id.
      */
      io.on('connect', (s) => {
        console.log('Connected to socket', s);
        io.emit('register-mobile', user.data.id);
      });

      io.on('disconnect', () => {
        console.log('Disconnected from socket');
      });
    }
  }

  init () {
    this.props.fetchToken()
      .then(token => {
        return this.props.fetchUser(token)
      })
      .catch(res => {
        if (!res || res.status === 503) {
          this.setState({ error: 'Server not available. Please try again later!' })
        }
        else if (res.status === 401) {
          Actions.login()
        }
      });
  }

  logout () {
    this.props.logout()
    this.props.resetToken().then(Actions.login)
  }

  render () {
    const { monthlyStats, projects, user } = this.props;

    return (
      <Container>

        <LinearGradient colors={['#CE9FFC', '#7367F0']} style={styles.gradient} />

        <Header style={{ backgroundColor: 'rgba(0, 0, 0, 0)', borderBottomColor: 'rgba(255, 255, 255, 0.1)' }}>
          <Left>
            <Text size='small' style={{ color: '#FFF' }}>{user.data && user.data.name}</Text>
          </Left>
          <Right>
            <TouchableOpacity
              onPress={_ => this.logout()}
              style={{ justifyContent: 'center', alignItems: 'center', height: scale(40), width: scale(60) }}>
              <Text size='small' style={{ color: '#FFF' }}>Logout</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <Content>
          {this.renderMain()}
        </Content>

      </Container>
    )
  }

  renderMain () {
    const { month, year, error, loading } = this.state;
    const { monthlyStats, projects } = this.props;

    if (error) {
      return (
        <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#FFF' }}>{error}</Text>
          <View style={{ marginTop: 20, justifyContent: 'center' }}>
            <Butan
              raised
              name='Try Again'
              onPress={::this.retry}
             />
          </View>
        </View>
      )
    }

    if (loading) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height }}>
          <Spinner color='#FFF' fontSize={scale(12)} />
          <Text style={{ color: '#FFF' }}>Loading month...</Text>
        </View>
      )
    }

    const weeks = getWeeks(month, year);

    return (
      <View style={{ marginTop: scale(25) }}>
        <Text>Hello!</Text>
      </View>
    )
  }
}

export default connect(HomeContainer)
