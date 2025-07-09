import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../ui';
import { getDirectorsWriters } from '../../utils';
import { MovieApiTypes } from '../../types';

interface CreditsProps {
  credits: MovieApiTypes.IMovieCredits | null;
}

export const Credits = ({ credits }: CreditsProps) => {
  if (!credits || !credits.crew || !credits.crew.length) return null;

  const relevantPeople = getDirectorsWriters(credits);

  const renderRelevantPeople = () => {
    return relevantPeople.map((person, index) => {
      const isLastIndex = index === relevantPeople.length - 1;
      const style = isLastIndex ? styles.lastCreditRow : styles.creditRow;
      return (
        <View style={style} key={index}>
          <Typography variant="body" style={styles.creditNames}>
            {person.name}
          </Typography>
          <Typography variant="body" style={styles.creditJobs}>
            {person.job}
          </Typography>
        </View>
      );
    });
  };

  return <View style={styles.creditsContainer}>{renderRelevantPeople()}</View>;
};

const styles = StyleSheet.create({
  creditsContainer: {
    marginLeft: 16,
    flex: 1,
  },
  creditRow: {
    marginBottom: 12,
  },
  lastCreditRow: {
    marginBottom: 0,
  },
  creditNames: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  creditJobs: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
