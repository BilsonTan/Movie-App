import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, FlatListProps, ListRenderItem } from 'react-native';

interface OptimizedFlatListProps<T> extends Omit<FlatListProps<T>, 'renderItem' | 'keyExtractor'> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  itemHeight?: number; // For better performance estimation
}

function OptimizedFlatListComponent<T>({
  data,
  renderItem,
  keyExtractor,
  itemHeight,
  ...props
}: OptimizedFlatListProps<T>) {
  
  // Memoized render item to prevent unnecessary re-renders
  const memoizedRenderItem = useCallback(renderItem, [renderItem]);
  
  // Memoized key extractor
  const memoizedKeyExtractor = useCallback(keyExtractor, [keyExtractor]);
  
  // Performance optimizations
  const flatListProps = useMemo(() => ({
    // Performance optimizations
    removeClippedSubviews: true, // Remove views outside of viewport
    maxToRenderPerBatch: 10, // Reduce number of items rendered per batch
    updateCellsBatchingPeriod: 100, // Increase batching period
    initialNumToRender: 10, // Reduce initial render count
    windowSize: 5, // Reduce window size
    
    // Memory optimizations
    getItemLayout: itemHeight ? (_: any, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }) : undefined,
    
    // Scroll optimizations
    scrollEventThrottle: 16,
    
    ...props,
  }), [props, itemHeight]);

  return (
    <FlatList
      data={data}
      renderItem={memoizedRenderItem}
      keyExtractor={memoizedKeyExtractor}
      {...flatListProps}
    />
  );
}

// Memoize the component to prevent unnecessary re-renders
export const OptimizedFlatList = memo(OptimizedFlatListComponent) as <T>(
  props: OptimizedFlatListProps<T>
) => React.ReactElement;
