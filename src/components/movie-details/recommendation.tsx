import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { POSTER_URL } from '../../api/tmdb';
import { Typography, Section, PlaceholderImage, LazyImage, OptimizedFlatList } from '../ui';

interface RecommendationsSectionProps {
  recommendations?: any[];
  onMoviePress: (movieId: number) => void;
}

export const RecommendationsSection = ({ recommendations = [], onMoviePress }: RecommendationsSectionProps) => {
  const renderRecommendation = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.recommendationItem}
      onPress={() => onMoviePress(item.id)}
    >
      {item.poster_path ? (
        <LazyImage 
          source={{ uri: POSTER_URL + item.poster_path }} 
          style={styles.recommendationImage}
          placeholder={{
            width: 290,
            height: 152,
            text: "Loading...",
            backgroundColor: "#ddd",
            textColor: "#666"
          }}
        />
      ) : (
        <PlaceholderImage 
          width={290}
          height={152}
          borderRadius={5}
          text="No Image"
          backgroundColor="#ddd"
          textColor="#666"
          style={styles.recommendationImage}
        />
      )}
      <View style={styles.recommendationInfo}>
        <Typography variant="subtitle" style={styles.recommendationTitle}>
          {item.title}
        </Typography>
        <Typography variant="caption" style={styles.recommendationRating}>
          {Math.round(item.vote_average * 10)}%
        </Typography>
      </View>
    </TouchableOpacity>
  );

  if (!recommendations.length) {
    return null;
  }

  return (
    <Section variant="padded" style={styles.container}>
      <Typography variant="sectionTitle" style={styles.sectionTitle}>
        Recommendations
      </Typography>
      <OptimizedFlatList
        data={recommendations.slice(0, 5)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecommendation}
        contentContainerStyle={styles.recommendationsList}
      />
    </Section>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  sectionTitle: {
    marginBottom: 20,
  },
  recommendationsList: {
    height: 220
  },
  recommendationItem: {
    marginRight: 16,
    width: 290,
    height: 190
  },
  recommendationImage: {
    width: '100%',
    height: '90%',
    borderRadius: 5,
  },
  recommendationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendationTitle: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    fontWeight: '400'
  },
  recommendationRating: {
    fontSize: 14,
    color: '#000000'
  },
});
