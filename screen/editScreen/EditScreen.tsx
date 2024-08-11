import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { setIsPreview } from '../../slicers/editor/editorSlice';
import { Editor, Preview } from './components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';


type EditScreenProps = NativeStackScreenProps<RootStackParamList, 'EditScreen'>

const EditScreen: React.FC<EditScreenProps> = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const isPreview = useAppSelector((select) => select.editor.isPreview)

  const param = route.params.editId

  return (
    <EditView
      id={param}
      onChangeIsPreview={(isPreview) => {
        dispatch(setIsPreview(isPreview))
      }}
      onTapBackButton={() => {
        navigation.navigate('HomeScreen')
      }}
    >
      {isPreview && <Preview />}
      {!isPreview && <Editor />}
    </EditView>
  )
}

type EditViewProps = {
  children: React.ReactNode;
  id: number
  onChangeIsPreview: (isPreview: boolean) => void;
  onTapBackButton: VoidFunction;
}

const EditView: React.FC<EditViewProps> = ({ children, onChangeIsPreview, onTapBackButton, id }) => {

  const isPreview = useAppSelector((select) => select.editor.isPreview)

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {
          console.log("back button tapped")
          onTapBackButton()
        }} />
        <Appbar.Content title={isPreview ? "Preview" : `Editor (id = ${id})`} />
        <Appbar.Action
          icon="eye"
          color={!isPreview ? 'gray' : 'black'}
          onPress={() => {
            console.log("preview show")
            onChangeIsPreview(true)
          }} />
        <Appbar.Action
          icon="note"
          color={isPreview ? 'gray' : 'black'}
          onPress={() => {
            console.log("text show")
            onChangeIsPreview(false)
          }} />
      </Appbar.Header>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  )
}

export default EditScreen