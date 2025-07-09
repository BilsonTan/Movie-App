import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { POSTER_URL } from '../../api/tmdb';
import { useNavigation } from '@react-navigation/native';
import { MovieApiTypes } from '../../types';
import { formatDate } from '../../utils';
import { Typography, Card, LazyImage } from '../ui';

interface IMovieCardProps {
  item: MovieApiTypes.IMovie;
}

const MovieCardComponent = ({ item }: IMovieCardProps) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Card variant="elevated" style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', { id: item.id })}
          style={styles.cardTouchable}
        >
          {item.poster_path ? (
            <LazyImage
              source={{ uri: POSTER_URL + item.poster_path }}
              style={styles.poster}
              placeholder={{ 
                width: 120, 
                height: 180, 
                text: "Loading...",
                backgroundColor: '#f0f0f0',
                textColor: '#999'
              }}
            />
          ) : null}
          <View style={styles.cardContent}>
            <Typography variant="cardTitle">{item.title}</Typography>
            <Typography style={styles.cardDate} variant="cardSubtitle">{formatDate(item.release_date)}</Typography>
            <Typography variant="body" numberOfLines={2} style={styles.cardOverview}>
              {item.overview}
            </Typography>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    marginHorizontal: 16,
    minHeight: 140,
    overflow: 'hidden',
  },
  cardTouchable: {
    flexDirection: 'row',
    flex: 1,
  },
  poster: {
    width: 100,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  cardOverview: {
    marginBottom: 0,
  },
  cardDate: {
    marginBottom: 17,
  }
});

export const MovieCard = React.memo(MovieCardComponent);
