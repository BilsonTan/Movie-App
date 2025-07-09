import React, { useEffect, useCallback } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Alert,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDetailsContext } from '../context/details-context';
import { Header } from '../components/movie-details/header';
import { Overview } from '../components/movie-details/overview';
import { CastSection } from '../components/movie-details/cast';
import { RecommendationsSection } from '../components/movie-details/recommendation';
import { LogoComponent } from '../components/logo';

export default function DetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { movie, credits, releaseDates, recommendations, loading, error, fetchDetails } =
    useDetailsContext();


  const { id } = (route.params as { id?: string }) || {};

  useEffect(() => {
    if (id) {
      fetchDetails(id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddToWatchlist = useCallback(() => {
    Alert.alert(
      'Add to Watchlist',
      `${movie?.title} has been added to your watchlist!`,
      [{ text: 'OK' }],
    );
  }, [movie?.title]);

  const handleMoviePress = useCallback((movieId: number) => {
    (navigation as any).navigate('Details', { id: movieId });
  }, [navigation]);

  if (loading) return <ActivityIndicator style={styles.loading} />;
  if (error)
    return (
      <ScrollView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </ScrollView>
    );
  if (!movie)
    return (
      <ScrollView style={styles.errorContainer}>
        <Text style={styles.noDataText}>No details found.</Text>
      </ScrollView>
    );

  return (
    <View style={styles.container}>
      <LogoComponent />
      <ScrollView>
        <Header movie={movie}  releaseDates={releaseDates} onBackPress={handleBackPress} />
        <Overview movie={movie} credits={credits} onAddToWatchlist={handleAddToWatchlist} />
        <CastSection credits={credits} />
        <RecommendationsSection
          recommendations={recommendations}
          onMoviePress={handleMoviePress}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
