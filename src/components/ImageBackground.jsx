import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
const image = {uri: 'https://wallpaperaccess.com/full/3348599.jpg'};
export default function BackgroundImage({imageUrl,children}) {
  return (

      <ImageBackground source={image} style={{height:'100%', zIndex:1}}>{children}</ImageBackground>

  )
}