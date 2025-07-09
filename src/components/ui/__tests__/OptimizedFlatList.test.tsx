import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { OptimizedFlatList } from '../OptimizedFlatList';

// Mock data for testing
const mockData = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
];

// Mock render item component
const renderTestItem = ({ item }: { item: { id: string; name: string } }) => (
  <View testID={`item-${item.id}`}>
    <Text>{item.name}</Text>
  </View>
);

const keyExtractor = (item: { id: string; name: string }) => item.id;

describe('OptimizedFlatList Component', () => {
  it('renders correctly with basic props', () => {
    const { getByText } = render(
      <OptimizedFlatList
        data={mockData}
        renderItem={renderTestItem}
        keyExtractor={keyExtractor}
      />
    );
    
    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
    expect(getByText('Item 3')).toBeTruthy();
  });

  it('renders all items with correct testIDs', () => {
    const { getByTestId } = render(
      <OptimizedFlatList
        data={mockData}
        renderItem={renderTestItem}
        keyExtractor={keyExtractor}
      />
    );
    
    expect(getByTestId('item-1')).toBeTruthy();
    expect(getByTestId('item-2')).toBeTruthy();
    expect(getByTestId('item-3')).toBeTruthy();
  });

  it('renders with custom itemHeight', () => {
    const { getByText } = render(
      <OptimizedFlatList
        data={mockData}
        renderItem={renderTestItem}
        keyExtractor={keyExtractor}
        itemHeight={50}
      />
    );
    
    expect(getByText('Item 1')).toBeTruthy();
  });

  it('renders empty list correctly', () => {
    const { queryByText } = render(
      <OptimizedFlatList
        data={[]}
        renderItem={renderTestItem}
        keyExtractor={keyExtractor}
      />
    );
    
    expect(queryByText('Item 1')).toBeNull();
  });

  it('handles single item correctly', () => {
    const singleItem = [{ id: '1', name: 'Single Item' }];
    
    const { getByText } = render(
      <OptimizedFlatList
        data={singleItem}
        renderItem={renderTestItem}
        keyExtractor={keyExtractor}
      />
    );
    
    expect(getByText('Single Item')).toBeTruthy();
  });

  it('passes additional FlatList props', () => {
    const { getByText } = render(
      <OptimizedFlatList
        data={mockData}
        renderItem={renderTestItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    );
    
    expect(getByText('Item 1')).toBeTruthy();
  });

  describe('Performance Optimizations', () => {
    it('applies performance optimizations', () => {
      const { getByText } = render(
        <OptimizedFlatList
          data={mockData}
          renderItem={renderTestItem}
          keyExtractor={keyExtractor}
          itemHeight={100}
        />
      );
      
      // Test that the component renders with performance optimizations
      expect(getByText('Item 1')).toBeTruthy();
    });

    it('handles itemHeight for getItemLayout', () => {
      const { getByText } = render(
        <OptimizedFlatList
          data={mockData}
          renderItem={renderTestItem}
          keyExtractor={keyExtractor}
          itemHeight={75}
        />
      );
      
      expect(getByText('Item 1')).toBeTruthy();
    });

    it('works without itemHeight', () => {
      const { getByText } = render(
        <OptimizedFlatList
          data={mockData}
          renderItem={renderTestItem}
          keyExtractor={keyExtractor}
        />
      );
      
      expect(getByText('Item 1')).toBeTruthy();
    });
  });

  describe('Different Data Types', () => {
    it('handles string data', () => {
      const stringData = ['Apple', 'Banana', 'Cherry'];
      const stringRenderItem = ({ item }: { item: string }) => (
        <Text>{item}</Text>
      );
      const stringKeyExtractor = (item: string, index: number) => `${item}-${index}`;

      const { getByText } = render(
        <OptimizedFlatList
          data={stringData}
          renderItem={stringRenderItem}
          keyExtractor={stringKeyExtractor}
        />
      );
      
      expect(getByText('Apple')).toBeTruthy();
      expect(getByText('Banana')).toBeTruthy();
      expect(getByText('Cherry')).toBeTruthy();
    });

    it('handles number data', () => {
      const numberData = [1, 2, 3, 4, 5];
      const numberRenderItem = ({ item }: { item: number }) => (
        <Text>Number: {item}</Text>
      );
      const numberKeyExtractor = (item: number) => item.toString();

      const { getByText } = render(
        <OptimizedFlatList
          data={numberData}
          renderItem={numberRenderItem}
          keyExtractor={numberKeyExtractor}
        />
      );
      
      expect(getByText('Number: 1')).toBeTruthy();
      expect(getByText('Number: 5')).toBeTruthy();
    });

    it('handles complex object data', () => {
      const complexData = [
        { id: 1, title: 'Movie 1', rating: 8.5, year: 2021 },
        { id: 2, title: 'Movie 2', rating: 7.2, year: 2022 },
      ];
      
      const complexRenderItem = ({ item }: { item: typeof complexData[0] }) => (
        <View>
          <Text>{item.title}</Text>
          <Text>Rating: {item.rating}</Text>
          <Text>Year: {item.year}</Text>
        </View>
      );
      
      const complexKeyExtractor = (item: typeof complexData[0]) => item.id.toString();

      const { getByText } = render(
        <OptimizedFlatList
          data={complexData}
          renderItem={complexRenderItem}
          keyExtractor={complexKeyExtractor}
        />
      );
      
      expect(getByText('Movie 1')).toBeTruthy();
      expect(getByText('Rating: 8.5')).toBeTruthy();
      expect(getByText('Year: 2021')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles very large data sets', () => {
      const largeData = Array.from({ length: 1000 }, (_, index) => ({
        id: index.toString(),
        name: `Item ${index}`,
      }));

      const { getByText } = render(
        <OptimizedFlatList
          data={largeData}
          renderItem={renderTestItem}
          keyExtractor={keyExtractor}
          itemHeight={50}
        />
      );
      
      // Only check for the first few items as FlatList virtualizes
      expect(getByText('Item 0')).toBeTruthy();
    });

    it('handles zero itemHeight', () => {
      const { getByText } = render(
        <OptimizedFlatList
          data={mockData}
          renderItem={renderTestItem}
          keyExtractor={keyExtractor}
          itemHeight={0}
        />
      );
      
      expect(getByText('Item 1')).toBeTruthy();
    });

    it('handles undefined data gracefully', () => {
      const { queryByText } = render(
        <OptimizedFlatList
          data={undefined as any}
          renderItem={renderTestItem}
          keyExtractor={keyExtractor}
        />
      );
      
      expect(queryByText('Item 1')).toBeNull();
    });
  });
});
