import { StyleSheet, Dimensions } from 'react-native'
import { GREY, DARK_BLUE } from '@theme/colors'
const { height, width } = Dimensions.get('window')
import scale from '@utils/scale'

const center = {
  alignItems: 'center',
  justifyContent: 'center'
}

export default StyleSheet.create({
  center,
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARK_BLUE,
  },
  loginForm: {
    marginTop: scale(100),
    justifyContent: 'center',
    maxWidth: scale(300),
  },
  loginButton: {
    marginTop: scale(40)
  },
  input: {
    color: '#FFF',
    fontSize: scale(15),
    height: scale(30)
  },
  inputContainer: {
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: scale(1),
    paddingTop: scale(2),
    paddingBottom: scale(2),
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: scale(6),
  },
  buttonText: {
    color: '#7367F0',
    fontSize: scale(14),
  },
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
