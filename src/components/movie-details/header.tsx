import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { POSTER_URL } from '../../api/tmdb';
import { BackIcon } from '../icons';
import { formatDate, formatRuntime, getUSMovieRating } from '../../utils';
import { Typography, PlaceholderImage, LazyImage } from '../ui';
import { MovieApiTypes } from '../../types';

interface MovieHeaderProps {
  movie: MovieApiTypes.IMovieDetails;
  releaseDates: MovieApiTypes.IMovieReleaseDates | null;
  onBackPress: () => void;
}

export const Header = ({ movie, releaseDates, onBackPress }: MovieHeaderProps) => {
  const movieRating = getUSMovieRating(releaseDates);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.headerRow}>
            <Typography variant="heading" style={styles.headerTitle}>
              {movie.title}{' '}
              <Typography variant="body" style={styles.headerTitleYear}>
                ({formatDate(movie.release_date, { year: 'numeric' })})
              </Typography>
            </Typography>
          </View>
        </View>
        <View style={styles.movieInfoSection}>
          <View style={styles.posterContainer}>
            {movie.poster_path ? (
              <LazyImage
                source={{ uri: POSTER_URL + movie.poster_path }}
                style={styles.poster}
                placeholder={{
                  width: 115,
                  height: 150,
                  text: "Loading...",
                  backgroundColor: "#333",
                  textColor: "#FFFFFF"
                }}
              />
            ) : (
              <PlaceholderImage
                width={115}
                height={150}
                borderRadius={5}
                text="No Image"
                backgroundColor="#333"
                textColor="#FFFFFF"
              />
            )}
          </View>

          <View style={styles.movieDetails}>
            <View style={styles.ratingBadge}>
              <Typography variant="caption" style={styles.ratingText}>
                {movieRating || 'Not Rated'}
              </Typography>
            </View>
            <Typography variant="body" style={styles.dateTime}>
              {`${formatDate(movie.release_date, {
                day: 'numeric',
                month: '2-digit',
                year: 'numeric',
              })} • ${formatRuntime(movie.runtime)} `}
            </Typography>
            <Typography variant="body" style={styles.genres}>
              {movie.genres?.map((g: any) => g.name).join(', ')}
            </Typography>
            <View style={styles.textRow}>
              <Typography variant="body" style={styles.released}>
                Status: 
              </Typography>
              <Typography variant="body" style={styles.releasedText}>
                {` ${movie.status}`}
              </Typography>
            </View>
            <View style={styles.textRow}>
              <Typography variant="body" style={styles.language}>
                Original Language:
              </Typography>
              <Typography variant="body" style={styles.languageText}>
                {` ${movie?.spoken_languages[0].name}`}
              </Typography>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#01B4E4',
    marginTop: 10,
  },
  headerContainer: {
    backgroundColor: '#00000026',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    paddingLeft: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent : 'center',
    alignItems: 'center',
    width: '90%',
  },
  headerTitle: {
    color: '#fff',
  },
  headerTitleYear: {
    color: '#fff',
  },
  movieInfoSection: {
    flexDirection: 'row',
    marginHorizontal: 18,
  },
  posterContainer: {
    flex:1,
    justifyContent: 'flex-start'
  },
  poster: {
    width: 115,
    height: 150,
    borderRadius: 5,
  },
  movieDetails: {
    justifyContent: 'center',
    width: '50%',
    marginRight: 25
  },
  ratingBadge: {
    backgroundColor: '#D9D9D900',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    opacity: 0.7,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  ratingText: {
    color: '#FFFFFF',
  },
  dateTime: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  genres: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  textRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignContent: 'center',
    alignItems: 'center',
  },
  released: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  releasedText: {
    color: '#FFFFFF',
  },
  language: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  languageText: {
    color: '#FFFFFF',
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#00000026',
  },
});
