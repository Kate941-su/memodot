import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import OctionIcon from 'react-native-vector-icons/Octicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { Button } from 'react-native-paper'

type Props = {
  memodotFile: MemodotFile,
  onPressedMemodotFile: (memodotFile: MemodotFile) => void
}

const FileListItem: React.FC<Props> = ({ memodotFile, onPressedMemodotFile }) => {
  return (
    <Pressable
      onPress={() => {
        console.log(`${memodotFile.id} is tapped`)
        onPressedMemodotFile(memodotFile)
      }
      }
    >
      <View style={[styles.container]}>
        <View style={styles.alignContainer}>
          <View style={styles.itemContaner}>
            <OctionIcon name={memodotFile.isFolder ? "file-directory" : "file"}
              size={24}
            />
          </View>
          <Text style={styles.itemName}>{memodotFile.fileName}</Text>
        </View>
        <EntypoIcon.Button
          name="dots-three-vertical"
          size={12}
          color='black'
          backgroundColor='#00000000'
          onPress={() => {
            console.log(`${memodotFile.fileName} menu pressed
              
              `)
          }
          }
        />
      </View>
    </Pressable>
  )
}

export default FileListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    height: 50,
  },
  alignContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
  itemContaner: {
    width: 30,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
})