import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const CustomActivityIndicator = ({...props}) => {
  return (
    <ActivityIndicator animating={true} size='large' {...props}/>
  )
}

export default CustomActivityIndicator