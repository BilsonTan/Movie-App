import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';

interface PlaceholderImageProps {
  width: number;
  height: number;
  borderRadius?: number;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  style?: any;
}

export const PlaceholderImage = ({ 
  width, 
  height, 
  borderRadius = 5, 
  text = 'No Image',
  backgroundColor = '#ddd',
  textColor = '#666',
  style
}: PlaceholderImageProps) => {
  return (
    <View 
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style
      ]}
    >
      <Typography variant="placeholder" color={textColor}>
        {text}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
