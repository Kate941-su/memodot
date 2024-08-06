import { View, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react'

type Props = {
  iconName: string,
  size?: number,
  color?: string,
  onPress: VoidFunction,
}


const IconButton: React.FC<Props> = ({
  iconName,
  color = 'black',
  size = 24,
  onPress,
}) => {
  return (
    <View>
      <Pressable onPress={() => { onPress() }}>
        <Icon name={iconName} size={size} color={color}></Icon>
      </Pressable>
    </View>
  )
}

export { IconButton }