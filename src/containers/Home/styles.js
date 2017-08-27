import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  gradient: {
    width,
    height,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  }
})
