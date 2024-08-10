import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { setIsPreview } from '../../slicers/editor/editorSlice';
import { Editor, Preview } from './components';

type EditViewProps = {
  children: React.ReactNode;
  onChangeIsPreview: (isPreview: boolean) => void;
}

const EditScreen: React.FC = () => {

  const dispatch = useDispatch()
  const isPreview = useAppSelector((select) => select.editor.isPreview)

  return (
    <EditView
      onChangeIsPreview={(isPreview) => {
        dispatch(setIsPreview(isPreview))
      }}
    >
      {isPreview && <Preview />}
      {!isPreview && <Editor />}
    </EditView>
  )
}

const EditView: React.FC<EditViewProps> = ({ children, onChangeIsPreview }) => {

  const isPreview = useAppSelector((select) => select.editor.isPreview)

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {
          console.log("back button tapped")
        }} />
        <Appbar.Content title={isPreview ? "Preview" : 'Editor'} />
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