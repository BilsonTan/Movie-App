import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMovieContext } from '../../context/movie-context';

interface ISearchInputProps {
  onPress: () => void;
}

export const SearchBar = ({ onPress }: ISearchInputProps) => {
  const { search, setSearch } = useMovieContext();
  
  const onSearch = useCallback(() => {
    onPress();
  }, [onPress]);
  return (
    <View>
      <TextInput
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        placeholderTextColor="#888"
      />
      <Pressable
        style={styles.searchButton}
        onPress={onSearch}
        android_ripple={{ color: '#e0e0e0' }}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 5,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    color: '#222',
  },
  searchButton: {
    backgroundColor: '#E4E4E4',
    borderRadius: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  searchButtonText: {
    color: '#00000080',
    fontWeight: '600',
    fontSize: 16,
  },
});
