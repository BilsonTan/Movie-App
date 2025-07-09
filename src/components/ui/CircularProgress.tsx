import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

interface CircularProgressProps {
  size: number;
  progress: number; // 0-100
  strokeWidth?: number;
  backgroundColor?: string;
  progressColor?: string;
  gap?: number; // Space between background circle and progress ring
  children?: React.ReactNode;
}

export const CircularProgress = ({
  size,
  progress,
  strokeWidth = 4,
  backgroundColor = '#D0D2D366',
  progressColor = '#45FF8F',
  gap = 4, // Default gap of 4px between background and progress ring
  children,
}: CircularProgressProps) => {
  const progressPercentage = Math.min(Math.max(progress, 0), 100);
  
  // Calculate radius with gap consideration
  const radius = (size - strokeWidth * 2 - gap * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;
  
  const center = size / 2;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View 
        style={[
          styles.backgroundCircle, 
          { 
            width: size, 
            height: size, 
            borderRadius: size / 2,
          }
        ]} 
      />
      
      <Svg 
        width={size} 
        height={size} 
        style={styles.progressSvg}
      >
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={progressColor}
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
      
      {/* Content overlay */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#042541',
  },
  progressSvg: {
    position: 'absolute',
  },
  content: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
