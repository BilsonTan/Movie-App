import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from './ui';

interface LoadMoreButtonProps {
  onPress: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

const LoadMoreButtonComponent = ({ onPress, isLoading, hasMore }: LoadMoreButtonProps) => {
  if (!hasMore) return null;

  return (
    <Button 
      variant="primary" 
      size="medium"
      style={styles.button}
      onPress={onPress}
      isLoading={isLoading}
    >
      Load More
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
});

export const LoadMoreButton = React.memo(LoadMoreButtonComponent);
