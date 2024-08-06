import { View, Text, Pressable } from 'react-native'
import React from 'react'


type Props = {
  onPress: VoidFunction,
  title: string,
  textStyle?: string,
  buttonStyle?: string,
}


const TextButton: React.FC<Props> = ({
  title,
  onPress,
  textStyle = 'font-bold text-white',
  buttonStyle = '',
}) => {

  return (
    <Pressable
      onPress={() => { onPress() }}
      className={buttonStyle}>
      <Text className={textStyle}>{title}</Text>
    </Pressable>
  )
}

export default TextButton