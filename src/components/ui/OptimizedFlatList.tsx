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
  
  const memoizedRenderItem = useCallback(renderItem, [renderItem]);
  
  const memoizedKeyExtractor = useCallback(keyExtractor, [keyExtractor]);
  
  const flatListProps = useMemo(() => ({
    removeClippedSubviews: true,
    maxToRenderPerBatch: 10,
    updateCellsBatchingPeriod: 100,
    initialNumToRender: 10,
    windowSize: 5,
    
    getItemLayout: itemHeight ? (_: any, index: number) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }) : undefined,
    
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

export const OptimizedFlatList = memo(OptimizedFlatListComponent) as <T>(
  props: OptimizedFlatListProps<T>
) => React.ReactElement;
