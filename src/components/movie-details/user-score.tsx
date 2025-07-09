import React from 'react';
import { StyleSheet, View } from "react-native";
import { Typography, CircularProgress } from "../ui";

const UserScoreComponent = ({ score }: { score: number }) => {
  const scorePercentage = Math.round(score * 10);

  return (
    <View style={styles.userScoreSection}>
      <CircularProgress
        size={60}
        progress={scorePercentage}
        strokeWidth={4}
        backgroundColor="#D0D2D366"
        progressColor="#45FF8F"
        gap={2}
      >
        <View style={styles.scoreContainer}>
          <Typography variant="body" style={styles.scoreNumber}>
            {scorePercentage}
          </Typography>
          <Typography variant="body" style={styles.percentageSymbol}>
            %
          </Typography>
        </View>
      </CircularProgress>
      <Typography variant="body" style={styles.userScoreLabel}>
        User Score
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  userScoreSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  scoreNumber: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  percentageSymbol: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 6,
    marginTop: 3,

  },
  scoreText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userScoreLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 8,
  },
});

export const UserScore = React.memo(UserScoreComponent);