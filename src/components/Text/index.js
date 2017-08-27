/* @flow */

import { Font } from 'expo'
import React from 'react'
import { Text as NativeText, PixelRatio } from 'react-native'
import styles from './styles'
import scale from '@utils/scale'

export const sizes = {
  xxs: {
    fontSize: scale(10),
  },
  xs: {
    fontSize: scale(12),
  },
  small: {
    fontSize: scale(13),
  },
  medium: {
    fontSize: scale(14),
  },
  large: {
    fontSize: scale(16),
  },
  xlarge: {
    fontSize: scale(18),
  },
}

type Props = {
  children?: string,
  bold?: boolean,
  semibold?: boolean,
}

const Text = (props: Props): React$Element<any> => {
  const children = props.children || ''

  const fontKey = props.bold ? 'lato-bold' : props.semibold ? 'lato-semibold' : 'lato-regular'
  const size = props.size || 'small'

  delete props.size;
  delete props.bold;
  delete props.semibold;

  return (
    <NativeText
      {...props}
      style={[Font.style(fontKey), sizes[size], props.style]}>
      {children}
    </NativeText>
  )
}

export default Text
