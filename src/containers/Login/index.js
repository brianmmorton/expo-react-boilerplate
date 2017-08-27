/* @flow */

import React, { Component } from 'react'
import { View, Image } from 'react-native'
import connect from './connect'
import { Actions } from 'react-native-router-flux'
import styles from './styles'
import { LIGHT_BLUE, DARK_BLUE, PURPLE } from '@theme/colors'
import { BaseGradient, Text, Butan } from '@components'
import { LinearGradient, Segment } from 'expo'
import scale from '@utils/scale'

import {
  Container
  , Header
  , Title
  , Content
  , Spinner
} from 'native-base';

import {
  List
  , ListItem
  , FormLabel
  , FormInput
  , Icon
} from 'react-native-elements'

type Props = {
  counter: number,
  login: Function,
  fetchUser: Function,
  saveToken: Function,
}

class LoginContainer extends Component {

  constructor (props: Props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: null,
      loading: false,
    }
  }

  componentDidMount () {
    Segment.track('view-login')
    this.refs.form2.refs.emailRef.focus()
  }

  login = () => {
    const { email, password } = this.state;

    if (!email) {
      return this.setState({ error: 'Please enter email' });
    }

    if (!password) {
      return this.setState({ error: 'Please enter password' });
    }

    this.setState({ loading: true });

    this.props.login(email, password)
      .then(async data => {
        Segment.identifyWithTraits(data.user.id, { name: data.user.name, company: data.user.company.name, created_at: data.user.created_at })
        Segment.track('login')
        await this.props.saveToken(data.token)
        Actions.home();
      })
      .catch(err => {
        console.log(err);
        if (err.status === 401) {
          this.setState({ loading: false, error: 'Incorrect email or password' });
        }
        else {
          this.setState({ loading: false, error: 'Something went wrong, try again' });
        }
      })
  }

  render() {
    return (
      <Container style={styles.loginContainer}>

        <LinearGradient colors={['#CE9FFC', '#7367F0']} style={styles.gradient} />

        <Content
          contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >

          <View>
            <Image
              style={{ width: scale(190), height: scale(40) }}
              source={require('../../img/logo.png')}
            />
          </View>

          <View style={styles.loginForm}>
            <FormLabel labelStyle={{ color: '#FFF', fontSize: scale(12) }}>Email</FormLabel>
            <FormInput
              placeholderTextColor='rgba(250, 250, 250, 0.4)'
              selectionColor='rgba(250, 250, 250, 0.75)'
              inputStyle={styles.input}
              containerStyle={styles.inputContainer}
              onChangeText={email => this.setState({ email: email.toLowerCase(), error: null })}
              ref='form2'
              containerRef='containerRefYOYO'
              textInputRef='emailRef'
              placeholder='zzz@gmail.com'
              value={this.state.email}
              keyboardType='email-address'
            />

            <View style={{ marginTop: scale(10) }}>
              <FormLabel labelStyle={{ color: '#FFF', fontSize: scale(12) }}>Password</FormLabel>
              <FormInput
                onSubmitEditing={e => this.login()}
                returnKeyType='go'
                placeholderTextColor='rgba(250, 250, 250, 0.4)'
                selectionColor='rgba(250, 250, 250, 0.75)'
                ref='form3'
                placeholder='********'
                containerRef='containerRefYOYO'
                textInputRef='passwordRef'
                inputStyle={styles.input}
                containerStyle={styles.inputContainer}
                value={this.state.password}
                secureTextEntry
                onChangeText={password => this.setState({ password, error: null })}
              />
            </View>

            {!!this.state.error && (
              <View style={{ marginLeft: 18, marginTop: 10 }}>
                <Text style={{ color: '#FFF' }}>{this.state.error}</Text>
              </View>
            )}

            {!!this.state.loading && (
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Spinner color='#FFF' />
              </View>
            )}

            <View style={styles.loginButton}>
              {!this.state.loading && (
                <Butan
                  block
                  textStyle={{ color: '#CE9FFC' }}
                  fontSize={scale(14)}
                  height={scale(40)}
                  onPress={() => this.login()}
                  name='Login'
                />
              )}
            </View>
          </View>

        </Content>

      </Container>
    )
  }

}


export default connect(LoginContainer)
