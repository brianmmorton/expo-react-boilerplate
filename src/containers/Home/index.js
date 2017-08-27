/* @flow */

import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import io from '@services/socket-io'
import { Dimensions, TouchableOpacity, View } from 'react-native'

const { height, width } = Dimensions.get('window');
import scale from '@utils/scale';

import styles from './styles'
import connect from './connect'

import { Text } from '@components';
import { LinearGradient } from 'expo';

import {
  Container
  , Content
  , Header
  , Title
  , Body
  , Icon
  , Left
  , Right
  , Spinner
} from 'native-base'

type Props = {
  user: object,
  token: string,
  fetchUser: Function,
  fetchToken: Function,
  resetToken: Function,
}

class HomeContainer extends Component {

  state = {}

  componentDidMount () {
    this.init();
  }

  componentWillReceiveProps ({ user }) {
    console.log('LOADING HOME CONTAINER');
    if (!user.loading && user.data) {
      console.log(`Initiating user for ${user.data.name} ${user.data.id}`);

      Segment.identifyWithTraits(user.data.id, { name: user.data.name, created_at: user.data.created_at })
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
    console.log('INIT');
    this.props.fetchToken()
      .then(token => {
        if (!token) {
          throw { status: 401 }
        }
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
    const { user } = this.props;

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
    const { error } = this.state;

    if (error) {
      return (
        <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#FFF' }}>{error}</Text>
        </View>
      )
    }

    return (
      <View style={{ marginTop: scale(25) }}>
        <Text style={{ color: '#FFF', textAlign: 'center' }}>Hello!</Text>
      </View>
    )
  }
}

export default connect(HomeContainer)
