import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useMovieContext } from '../context/movie-context';
import { Filters } from '../components/filters';
import { MovieCard } from '../components/movie-card';
import { LoadMoreButton } from '../components/load-more-button';
import { LogoComponent } from '../components/logo';
import { OptimizedFlatList } from '../components/ui';


export default function HomeScreen() {
  const { fetchMovies, loadMoreMovies, isLoading, isLoadingMore, hasMorePages, errorMessage, movies } = useMovieContext();

  const renderFooter = () => (
    <LoadMoreButton 
      onPress={loadMoreMovies}
      isLoading={isLoadingMore}
      hasMore={hasMorePages}
    />
  );

  return (
      <View style={styles.container}>
        <LogoComponent />
        <Filters onPress={fetchMovies} />
        {isLoading && <ActivityIndicator style={styles.activityIndicator} />}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <OptimizedFlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard item={item} />
          )}
          ListEmptyComponent={!isLoading && !errorMessage ? <Text>No movies to show.</Text> : null}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },

  activityIndicator: {
    margin: 16,
  },
  errorText: {
    color: 'red',
    margin: 16,
  },
  flatListContent: {
    paddingBottom: 24,
  },
});
