import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import { FlatGrid } from 'react-native-super-grid';
import FileListItem from '../../components/FileListItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentFile } from '../../slicers/homeScreen/homeScreenSlice';


// TODO: Implement go back to parent folder

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

type SortType = 'acendant' | 'decendant' | 'folderFirstAcendant' | 'fileFirstDecendant'

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {

  const dispatch = useDispatch()

  const currentFolder = useAppSelector(selectCurrentFile)

  const [items, setItems] = useState<MemodotFile[]>(currentFolder?.children!);

  const [search, setSearch] = useState("");

  const [sortType, setSortType] = useState<SortType>("folderFirstAcendant")

  const insets = useSafeAreaInsets()

  const goToNextFolder = () => {

  }

  const updateSearch = (search: string) => {
    setSearch(search);
    showUpItems(search)
  };

  const showUpItems = (word: string) => {
    setItems(
      currentFolder.children!
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
    setItems(memodotFile.children!)
  }

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <View>
        {process.env.FLAVOR == "DEV" && <Text>`${currentFolder.id}`</Text>}
      </View>


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

export default HomeScreen