import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

interface SectionProps extends ViewProps {
  variant?: 'default' | 'colored' | 'padded';
  backgroundColor?: string;
  padding?: number;
  children: React.ReactNode;
}

export const Section = ({ 
  variant = 'default', 
  backgroundColor = '#fff',
  padding,
  style, 
  children, 
  ...props 
}: SectionProps) => {
  const getSectionStyle = () => {
    const baseStyles: any[] = [styles.base];
    
    switch (variant) {
      case 'colored':
        baseStyles.push({ backgroundColor });
        break;
      case 'padded':
        baseStyles.push(styles.padded);
        if (padding) baseStyles.push({ padding });
        break;
      case 'default':
      default:
        baseStyles.push({ backgroundColor });
        break;
    }
    
    return baseStyles;
  };

  return (
    <View style={[getSectionStyle(), style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff',
  },
  colored: {
    // Used when a specific background color is applied
  },
  padded: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});
