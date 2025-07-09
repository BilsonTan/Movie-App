import React, { useState, useCallback, useMemo } from 'react';
import { Image, View, ImageStyle, ViewStyle } from 'react-native';
import { PlaceholderImage } from './PlaceholderImage';

interface LazyImageProps {
  source: { uri: string } | null;
  style?: ImageStyle;
  placeholder?: {
    width: number;
    height: number;
    text?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: () => void;
}

export const LazyImage = ({
  source,
  style,
  placeholder,
  resizeMode = 'cover',
  onLoadStart,
  onLoadEnd,
  onError,
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Memoized handlers to prevent unnecessary re-renders
  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    onLoadStart?.();
  }, [onLoadStart]);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    setIsLoaded(true);
    onLoadEnd?.();
  }, [onLoadEnd]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  }, [onError]);

  // Memoized styles
  const containerStyle: ViewStyle = useMemo(() => ({
    ...style,
    position: 'relative',
  }), [style]);

  const imageStyle: ImageStyle = useMemo(() => ({
    ...style,
    opacity: isLoaded && !hasError ? 1 : 0,
    position: 'absolute',
    top: 0,
    left: 0,
  }), [style, isLoaded, hasError]);

  // Don't render image if no source
  if (!source?.uri) {
    return placeholder ? (
      <PlaceholderImage
        width={placeholder.width}
        height={placeholder.height}
        text={placeholder.text || 'No Image'}
        backgroundColor={placeholder.backgroundColor || '#f0f0f0'}
        textColor={placeholder.textColor || '#999'}
        style={style}
      />
    ) : null;
  }

  return (
    <View style={containerStyle}>
      {/* Placeholder shown while loading or on error */}
      {(isLoading || hasError) && placeholder && (
        <PlaceholderImage
          width={placeholder.width}
          height={placeholder.height}
          text={hasError ? 'Failed to load' : (placeholder.text || 'Loading...')}
          backgroundColor={placeholder.backgroundColor || '#f0f0f0'}
          textColor={placeholder.textColor || '#999'}
          style={style}
        />
      )}
      
      {/* Actual image */}
      <Image
        testID="lazy-image"
        source={source}
        style={imageStyle}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        // Optimize memory usage
        progressiveRenderingEnabled={true}
        fadeDuration={300}
      />
    </View>
  );
};
