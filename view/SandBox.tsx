import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Router';
import { server } from 'typescript';

type Props = NativeStackScreenProps<RootStackParamList, 'SandBoxScreen'>;

type ColorBoxItem = {
  name: string,
  code: string,
}

const initialList = [
  { name: 'TURQUOISE', code: '#1abc9c' },
  { name: 'EMERALD', code: '#2ecc71' },
  { name: 'PETER RIVER', code: '#3498db' },
  { name: 'AMETHYST', code: '#9b59b6' },
  { name: 'WET ASPHALT', code: '#34495e' },
  { name: 'GREEN SEA', code: '#16a085' },
  { name: 'NEPHRITIS', code: '#27ae60' },
  { name: 'BELIZE HOLE', code: '#2980b9' },
  { name: 'WISTERIA', code: '#8e44ad' },
  { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
  { name: 'SUN FLOWER', code: '#f1c40f' },
  { name: 'CARROT', code: '#e67e22' },
  { name: 'ALIZARIN', code: '#e74c3c' },
  { name: 'CLOUDS', code: '#ecf0f1' },
  { name: 'CONCRETE', code: '#95a5a6' },
  { name: 'ORANGE', code: '#f39c12' },
  { name: 'PUMPKIN', code: '#d35400' },
  { name: 'POMEGRANATE', code: '#c0392b' },
  { name: 'SILVER', code: '#bdc3c7' },
  { name: 'ASBESTOS', code: '#7f8c8d' },
]

const SandBoxScreen: React.FC<Props> = ({ navigation, route }) => {

  const [items, setItems] = useState<ColorBoxItem[]>(initialList);

  const [search, setSearch] = useState("");

  const updateSearch = (search: string) => {
    setSearch(search);
    showUpItems(search)
    console.log('Current Text => ', search)
  };

  const showUpItems = (word: string) => {
    setItems(
      initialList.filter(
        (it) =>
          ((it: ColorBoxItem): boolean => {
            const lowerName = it.name.toLowerCase()
            const lowerCode = it.code.toLowerCase()
            const lowerWord = word.toLowerCase()
            return search.length === 0 ||
              lowerName.includes(lowerWord) ||
              lowerCode.includes(lowerWord);
          })(it)
      ))
  }

  return (
    <View className='flex-1'>
      <Searchbar
        style={styles.searchBar}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </View>
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
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

export default SandBoxScreen