import { TextInput } from "react-native-paper"
import { View, StyleSheet } from "react-native"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { RootState } from "../../../app/store";
import { selectText, setText } from "../../../slicers/editor/editorSlice"

const Editor: React.FC = () => {
  const dispatch = useAppDispatch()
  const text = useAppSelector((state: RootState) => state.editor.text)
  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        placeholderTextColor='white'
        textColor="white"
        placeholder='You can write by Markdown'
        multiline // Allows the text field to be scrollable if text exceeds screen size
        onChangeText={(newText) => {
          dispatch(setText(newText))
        }
        }
        value={text}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
  input: {
    flex: 1,
    backgroundColor: 'black',
    padding: 2,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
  }
})

export default Editor