import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'sectionTitle' | 'subtitle' | 'body' | 'caption' | 'placeholder' | 'heading' | 'cardTitle' | 'cardSubtitle';
  color?: string;
  children: React.ReactNode;
}

export const Typography = ({ variant = 'body', color, style, children, ...props }: TypographyProps) => {
  const getTextStyle = () => {
    switch (variant) {
      case 'sectionTitle':
        return styles.sectionTitle;
      case 'heading':
        return styles.heading;
      case 'subtitle':
        return styles.subtitle;
      case 'cardTitle':
        return styles.cardTitle;
      case 'cardSubtitle':
        return styles.cardSubtitle;
      case 'caption':
        return styles.caption;
      case 'placeholder':
        return styles.placeholder;
      case 'body':
      default:
        return styles.body;
    }
  };

  return (
    <Text 
      style={[getTextStyle(), color && { color }, style]} 
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666',
  },
  placeholder: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
