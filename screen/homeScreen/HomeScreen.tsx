import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import { FlatGrid } from 'react-native-super-grid';
import FileListItem from '../../components/FileListItem';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
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

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {

  const [items, setItems] = useState<MemodotFile[]>(initialList);

  const [search, setSearch] = useState("");

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
        data={items}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => (
          <FileListItem
            memodotFile={item}
          ></FileListItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 24
  },
  gridView: {
    marginTop: 0,
    flex: 1,
  },
});

export default HomeScreen