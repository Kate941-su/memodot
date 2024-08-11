import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import { FlatGrid } from 'react-native-super-grid';
import FileListItem from '../../components/FileListItem';

// TODO: Implement go back to parent folder

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

type SortType = 'acendant' | 'decendant' | 'folderFirstAcendant' | 'fileFirstDecendant'

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {

  const [items, setItems] = useState<MemodotFile[]>(initialList);

  const [search, setSearch] = useState("");

  const [sortType, setSortType] = useState<SortType>("folderFirstAcendant")

  const updateSearch = (search: string) => {
    setSearch(search);
    showUpItems(search)
  };

  const showUpItems = (word: string) => {
    setItems(
      initialList
        .filter(
          (it) =>
            ((it: MemodotFile): boolean => {
              const lowerWord = word.toLowerCase()
              return word.length === 0 ||
                it.fileName.includes(lowerWord)
            })(it)
        )
    )
  }

  const sortSeparateFileAndFolders = (itemList: MemodotFile[], isFolderFirst: boolean = true) => {
    const files: MemodotFile[] = []
    const folders: MemodotFile[] = []
    itemList.forEach(it => {
      it.isFolder ? folders.push(it) : files.push(it)
    });
    if (isFolderFirst) {
      files.forEach(it => {
        folders.push(it)
      })
      return folders
    } else {
      folders.forEach(it => {
        files.push(it)
      })
      return files
    }
  }

  const onTapFolderItem = (memodotFile: MemodotFile) => {
    // TODO: Get item's ids and convert to memodotFiles
    const ids = memodotFile.childrenIdList
    setItems(dummyChildItem)
  }

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      <FlatGrid
        itemDimension={Number.MAX_VALUE}
        data={(() => {
          // TODO: Implement all features
          switch (sortType) {
            case 'acendant':
              return sortSeparateFileAndFolders(items)
            case 'decendant':
              return items
            case 'folderFirstAcendant':
              return sortSeparateFileAndFolders(items)
            case 'fileFirstDecendant':
              return items
          }
        })()
        }
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => (
          <FileListItem
            memodotFile={item}
            onPressedMemodotFile={(memodotFile) => {
              memodotFile.isFolder ?
                (() => {
                  onTapFolderItem(item)
                  console.log('Open folder is about to come to soon')
                })() :
                navigation.navigate('EditScreen', { editId: memodotFile.id! })
            }}
          ></FileListItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 12,
    marginHorizontal: 12,
  },
  gridView: {
    marginTop: 0,
    flex: 1,
  },
});

const dummyChildItem = [

  {
    id: 83,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_83",
    text: "Hello id 83",
    parentFolderId: 1
  },
  {
    id: 942,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_942",
    isFolder: true,
    childrenIdList: [] as number[],
    parentFolderId: 1
  },
  {
    id: 1340,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_942",
    text: "Hello id 942",
    parentFolderId: 1
  },
]

const initialList = [
  {
    id: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_1",
    isFolder: true,
    parentFolderid: 1,
    childrenIdList: [] as number[],
  },
  {
    id: 2,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_2",
    isFolder: true,
    childrenIdList: [] as number[],
  },
  {
    id: 3,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_3",
    text: "Hello id 3",
  },
  {
    id: 4,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_4",
    isFolder: true,
    childrenIdList: [] as number[],
  },
  {
    id: 5,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_5",
    isFolder: true,
    childrenIdList: [] as number[],
  },
  {
    id: 6,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_6",
    text: "Hello id 6",
  },
  {
    id: 7,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_7",
    text: "Hello id 7",
  },
  {
    id: 8,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_8",
    text: "Hello id 8",
  },
  {
    id: 9,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    fileName: "id_9",
    isFolder: true,
    childrenIdList: [] as number[],
  },
  {
    id: 10,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFolder: false,
    fileName: "id_10",
    text: "Hello id 10",
  },
]


export default HomeScreen