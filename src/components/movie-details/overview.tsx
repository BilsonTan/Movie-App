import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography, Section } from '../ui';
import { MovieApiTypes } from '../../types';
import { UserScore } from './user-score';
import { Credits } from './credits';

interface MovieOverviewProps {
  movie: MovieApiTypes.IMovieDetails;
  credits: MovieApiTypes.IMovieCredits | null;
  onAddToWatchlist: () => void;
}

export const Overview = ({
  movie,
  onAddToWatchlist: _onAddToWatchlist,
  credits,
}: MovieOverviewProps) => {
  return (
    <Section
      variant="colored"
      backgroundColor="#00B4E4"
      style={styles.container}
    >
      <View style={styles.row}>
        <UserScore score={movie.vote_average} />
        <Credits credits={credits} />
      </View>
      <Typography variant="body" style={styles.tagline}>
        {movie.tagline}
      </Typography>

      <Typography variant="sectionTitle" style={styles.sectionTitle}>
        Overview
      </Typography>
      <Typography variant="body" style={styles.overview}>
        {movie.overview}
      </Typography>
    </Section>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  tagline: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    marginBottom: 10,
  },
  overview: {
    color: '#fff',
    lineHeight: 20,
    marginBottom: 20,
    fontSize: 14
  },
  watchlistButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  watchlistIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  watchlistText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
