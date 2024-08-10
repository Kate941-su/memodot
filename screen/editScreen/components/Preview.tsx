import { View, ScrollView, StyleSheet } from "react-native"
import Markdown from "react-native-markdown-display"
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";


const copy = `

# h1 Heading 8-)

## h2

[link](https://www.google.com/search?sca_esv=847412b30e358a21&sca_upv=1&rlz=1C5CHFA_enJP1058JP1058&sxsrf=ADLYWIKr4X3yCOVao-ZeUtzgOpnu-EOx5A:1723153630133&q=%E4%B8%8A%E5%9D%82%E3%81%99%E3%81%BF%E3%82%8C&udm=2&fbs=AEQNm0COtQ6qE5snXClm_cWqGTLX_jMP5V4l2v9LemFtanifXVoSDc4z6nO25TAUUgCi_PqCbebMxH2l70BIpVN1tqaotXuhxLKSz0A7jFus2NRBE1IzXbKlu4T6U4i0S56MHfKseo1LkFYlRacP3ANIt81UHHz_xmAfwY47cvJIyr8IDpHSNdh5YyClmG0uHzxOx4K9hegDLLwym00ZuHOE4WKtb1FDJw&sa=X&sqi=2&ved=2ahUKEwjT0ZHAr-aHAxWGbPUHHdPkDyQQtKgLegQIDBAB&biw=1238&bih=622&dpr=1#vhid=pAXvs4RNGNnWIM&vssid=mosaic)

![Sonny and Mariel high fiving.](https://content.codecademy.com/courses/learn-cpp/community-challenge/highfive.gif)

**This is some bold text!**

This is normal text
`;

const Preview: React.FC = () => {

  const dispatch = useDispatch()

  const text = useAppSelector((select) => select.editor.text)

  return (
    <View style={style.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={style.scrollVIew}
      >
        <Markdown>
          {text}
        </Markdown>
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollVIew: {
    height: '100%',
    padding: 18
  }
})

export default Preview