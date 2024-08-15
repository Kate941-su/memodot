import React, { useEffect, useMemo, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import { FlatGrid } from 'react-native-super-grid';
import FileListItem from '../../components/FileListItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { goNext, selectCurrentFile } from '../../slicers/homeScreen/homeScreenSlice';
import { Appbar } from 'react-native-paper';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';


// TODO: Implement go back to parent folder

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

type SortType = 'acendant' | 'decendant' | 'folderFirstAcendant' | 'fileFirstDecendant'

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {

  const dispatch = useDispatch()

  const currentStack = useAppSelector((state: RootState) => state.homeScreenState)

  const currentFolder = currentStack?.stack.top!

  // Sample of how to use `useMemo`
  // const selector = useMemo(
  //   () => (state: RootState) => state.homeScreenState.stack)
  // const idList = useSelector(selector)

  const [items, setItems] = useState<MemodotFile[]>(currentFolder.children!);

  const [search, setSearch] = useState("");

  const [sortType, setSortType] = useState<SortType>("folderFirstAcendant")

  const insets = useSafeAreaInsets()

  useEffect(() => {
    console.log(`[HomeScreen] Current folder 👉 ${currentFolder.fileName}`)
  }, [currentStack])

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


  const getPath = () => {
    var path: string = ""
    currentStack.stack.asList.forEach((it) => {
      '/' + path + it.fileName
    })
    return path
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
    dispatch(goNext(memodotFile))
  }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {
            console.log("back button tapped")
          }} />
          <Appbar.Content title={getPath()} />
          <Appbar.Action
            icon="eye"
            color={'black'}
            onPress={() => {
              console.log("preview show")
            }} />
        </Appbar.Header>
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
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appBar: {
    width: '100%',
    flexShrink: 1
  },
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