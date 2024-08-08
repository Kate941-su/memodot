import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Markdown from 'react-native-markdown-display';
import { TextInput } from 'react-native-paper';

const copy = `

# h1 Heading 8-)

## h2

[link](https://www.google.com/search?sca_esv=847412b30e358a21&sca_upv=1&rlz=1C5CHFA_enJP1058JP1058&sxsrf=ADLYWIKr4X3yCOVao-ZeUtzgOpnu-EOx5A:1723153630133&q=%E4%B8%8A%E5%9D%82%E3%81%99%E3%81%BF%E3%82%8C&udm=2&fbs=AEQNm0COtQ6qE5snXClm_cWqGTLX_jMP5V4l2v9LemFtanifXVoSDc4z6nO25TAUUgCi_PqCbebMxH2l70BIpVN1tqaotXuhxLKSz0A7jFus2NRBE1IzXbKlu4T6U4i0S56MHfKseo1LkFYlRacP3ANIt81UHHz_xmAfwY47cvJIyr8IDpHSNdh5YyClmG0uHzxOx4K9hegDLLwym00ZuHOE4WKtb1FDJw&sa=X&sqi=2&ved=2ahUKEwjT0ZHAr-aHAxWGbPUHHdPkDyQQtKgLegQIDBAB&biw=1238&bih=622&dpr=1#vhid=pAXvs4RNGNnWIM&vssid=mosaic)

![Sonny and Mariel high fiving.](https://content.codecademy.com/courses/learn-cpp/community-challenge/highfive.gif)

**This is some bold text!**

This is normal text
`;

const EditScreen: React.FC = () => {

  const sayHello = () => {
    console.log('Say Hello!')
  }

  return (

    <EditView></EditView>

  )
}

const EditView: React.FC = () => {
  return (
    <View style={editViewStyles.container}>
      <TextInput
        style={editViewStyles.textInput}
        placeholder='You can write by Markdown'
        multiline // Allows the text field to be scrollable if text exceeds screen size
      />
    </View>

  )
}

const PreviewView: React.FC = () => {
  return (
    <View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ height: '100%' }}
      >
        <Markdown>
          {copy}
        </Markdown>
      </ScrollView>
    </View>
  )
}

export default EditScreen

const editViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  textInput: {
    flex: 1,
    width: '100%',
    padding: 16,
    borderColor: 'gray',
    borderWidth: 5
  }
})