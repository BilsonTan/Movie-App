import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '../Card';

describe('Card Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>First Child</Text>
        <Text>Second Child</Text>
      </Card>
    );
    
    expect(getByText('First Child')).toBeTruthy();
    expect(getByText('Second Child')).toBeTruthy();
  });

  it('applies different variants correctly', () => {
    const variants = ['default', 'elevated', 'outlined'] as const;
    
    variants.forEach(variant => {
      const { getByTestId } = render(
        <Card variant={variant} testID={`card-${variant}`}>
          <Text>{variant} Card</Text>
        </Card>
      );
      
      expect(getByTestId(`card-${variant}`)).toBeTruthy();
    });
  });

  it('applies custom styles correctly', () => {
    const customStyle = { backgroundColor: 'red', margin: 10 };
    const { getByTestId } = render(
      <Card style={customStyle} testID="styled-card">
        <Text>Styled Card</Text>
      </Card>
    );
    
    const card = getByTestId('styled-card');
    expect(card.props.style).toContainEqual(
      expect.objectContaining(customStyle)
    );
  });

  it('passes through View props', () => {
    const { getByTestId } = render(
      <Card testID="card-test" accessible accessibilityLabel="Test Card">
        <Text>Test Card</Text>
      </Card>
    );
    
    const card = getByTestId('card-test');
    expect(card.props.accessible).toBe(true);
    expect(card.props.accessibilityLabel).toBe('Test Card');
  });

  describe('Variant Styles', () => {
    it('applies base styles to all variants', () => {
      const { getByTestId } = render(
        <Card testID="base-card">
          <Text>Base Card</Text>
        </Card>
      );
      
      const card = getByTestId('base-card');
      expect(card.props.style).toContainEqual(
        expect.objectContaining({
          backgroundColor: '#fff',
          borderRadius: 5,
        })
      );
    });

    it('applies default variant styles correctly', () => {
      const { getByTestId } = render(
        <Card variant="default" testID="default-card">
          <Text>Default Card</Text>
        </Card>
      );
      
      const card = getByTestId('default-card');
      expect(card.props.style).toContainEqual(
        expect.objectContaining({
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
          padding: 16,
        })
      );
    });

    it('handles undefined variant as default', () => {
      const { getByTestId } = render(
        <Card testID="undefined-variant-card">
          <Text>Card with undefined variant</Text>
        </Card>
      );
      
      const card = getByTestId('undefined-variant-card');
      // Should apply default variant styles
      expect(card.props.style).toContainEqual(
        expect.objectContaining({
          backgroundColor: '#FFFFFF',
          padding: 16,
        })
      );
    });
  });

  describe('Accessibility', () => {
    it('is accessible by default', () => {
      const { getByTestId } = render(
        <Card testID="accessible-card">
          <Text>Accessible Card</Text>
        </Card>
      );
      
      const card = getByTestId('accessible-card');
      expect(card).toBeTruthy();
    });

    it('supports custom accessibility properties', () => {
      const { getByTestId } = render(
        <Card 
          testID="custom-accessible-card"
          accessible
          accessibilityRole="button"
          accessibilityLabel="Custom Card"
        >
          <Text>Custom Accessible Card</Text>
        </Card>
      );
      
      const card = getByTestId('custom-accessible-card');
      expect(card.props.accessible).toBe(true);
      expect(card.props.accessibilityRole).toBe('button');
      expect(card.props.accessibilityLabel).toBe('Custom Card');
    });
  });

  describe('Style Merging', () => {
    it('merges custom styles with variant styles correctly', () => {
      const customStyle = { marginTop: 20, backgroundColor: 'blue' };
      const { getByTestId } = render(
        <Card variant="elevated" style={customStyle} testID="merged-style-card">
          <Text>Merged Style Card</Text>
        </Card>
      );
      
      const card = getByTestId('merged-style-card');
      expect(card.props.style).toContainEqual(
        expect.objectContaining(customStyle)
      );
    });

    it('preserves base styles when custom styles are applied', () => {
      const customStyle = { marginTop: 20 };
      const { getByTestId } = render(
        <Card style={customStyle} testID="preserved-base-card">
          <Text>Preserved Base Card</Text>
        </Card>
      );
      
      const card = getByTestId('preserved-base-card');
      // Should still have base styles
      expect(card.props.style).toContainEqual(
        expect.objectContaining({
          backgroundColor: '#fff',
          borderRadius: 5,
        })
      );
      // Plus custom styles
      expect(card.props.style).toContainEqual(
        expect.objectContaining(customStyle)
      );
    });
  });
});
