import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

export default function BackgroundImage({imageUrl,children}) {
  return (

      <ImageBackground source={imageUrl} style={{height:'100%', zIndex:1}}>{children}</ImageBackground>

  )
}