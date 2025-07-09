import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ActivityIndicator } from 'react-native';
import { Typography } from './Typography';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  isLoading = false,
  style, 
  children, 
  disabled,
  ...props 
}: ButtonProps) => {
  const getButtonStyle = () => {
    const baseStyle: any[] = [styles.base];
    
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.secondary);
        break;
      case 'outlined':
        baseStyle.push(styles.outlined);
        break;
      case 'primary':
      default:
        baseStyle.push(styles.primary);
        break;
    }
    
    switch (size) {
      case 'small':
        baseStyle.push(styles.small);
        break;
      case 'large':
        baseStyle.push(styles.large);
        break;
      case 'medium':
      default:
        baseStyle.push(styles.medium);
        break;
    }
    
    return baseStyle;
  };

  const getTextColor = () => {
    if (variant === 'outlined') return '#01B4E4';
    return '#fff';
  };

  return (
    <TouchableOpacity 
      style={[getButtonStyle(), style]} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Typography variant="subtitle" color={getTextColor()}>
          {children}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#01B4E4',
  },
  secondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#01B4E4',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },
});
