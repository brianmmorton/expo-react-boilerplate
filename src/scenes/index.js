/* @flow */

import React, { Component } from 'react'
import { Platform, View, Text } from 'react-native'
import { Router, Reducer, Scene, Modal } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import createStore from '@store/create'
import Exponent, { AppLoading, Font, Notifications, Segment } from 'expo'
import { Root } from 'native-base'

import LoginScene from '@Login'
import HomeScene from '@Home'

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION: ', action);
    return defaultReducer(state, action);
  };
};

const store = createStore()

class Kernel extends Component {

  state = { isReady: false, notification: {} }

  async componentDidMount() {
    Segment.initializeIOS('YOUR_SEGMENT_TOKEN');

    await Font.loadAsync({
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
      'Material Icons': require('native-base/Fonts/MaterialIcons.ttf'),
    })

    if (Platform.OS === 'android') {
      await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      })
    }

    await Font.loadAsync({
      'lato-bold': require('../../assets/fonts/Lato-Bold.ttf'),
    })
    await Font.loadAsync({
      'lato-semibold': require('../../assets/fonts/Lato-Semibold.ttf'),
    })
    await Font.loadAsync({
      'lato-regular': require('../../assets/fonts/Lato-Regular.ttf'),
    })

    this.setState({ isReady: true })

    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }

  _handleNotification = (notification) => {
    this.setState({ notification });
  };

  render () {
    if (!this.state.isReady) {
      return <AppLoading />
    }

    return (
      <Root>
        <Provider store={store}>
          <Router createReducer={reducerCreate}>
            <Scene key="root" hideNavBar hideTabBar>
              <Scene key="modal" component={Modal} lightbox>
                <Scene key="root" hideNavBar hideTabBar>
                  <Scene key="home" component={HomeScene} title="Home" hideNavBar initial />
                  <Scene key="login" component={LoginScene} title="Login" hideNavBar />
                </Scene>

                {/* <Scene key="someModal" component={SomeModal} /> */}
              </Scene>
            </Scene>
          </Router>
        </Provider>
      </Root>
    )
  }
}

export default Kernel
