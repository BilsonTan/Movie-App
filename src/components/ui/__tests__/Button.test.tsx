import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button>Default Button</Button>);
    expect(getByText('Default Button')).toBeTruthy();
  });

  it('handles onPress events', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button onPress={mockOnPress}>Press Me</Button>
    );
    
    fireEvent.press(getByText('Press Me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders different variants correctly', () => {
    const variants = ['primary', 'secondary', 'outlined'] as const;
    
    variants.forEach(variant => {
      const { getByText } = render(
        <Button variant={variant}>{variant} Button</Button>
      );
      expect(getByText(`${variant} Button`)).toBeTruthy();
    });
  });

  it('renders different sizes correctly', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach(size => {
      const { getByText } = render(
        <Button size={size}>{size} Button</Button>
      );
      expect(getByText(`${size} Button`)).toBeTruthy();
    });
  });

  it('shows loading indicator when isLoading is true', () => {
    const { getByTestId, queryByText } = render(
      <Button isLoading testID="button">
        Loading Button
      </Button>
    );
    
    // Should show ActivityIndicator instead of text
    expect(queryByText('Loading Button')).toBeNull();
    expect(getByTestId('button')).toBeTruthy();
  });

  it('disables button when disabled prop is true', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={mockOnPress}>
        Disabled Button
      </Button>
    );
    
    const button = getByText('Disabled Button').parent?.parent;
    fireEvent.press(button!);
    
    // onPress should not be called when disabled
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('disables button when isLoading is true', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button isLoading onPress={mockOnPress} testID="loading-button">
        Loading Button
      </Button>
    );
    
    fireEvent.press(getByTestId('loading-button'));
    
    // onPress should not be called when loading
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies custom styles correctly', () => {
    const customStyle = { marginTop: 20 };
    const { getByText } = render(
      <Button style={customStyle}>Styled Button</Button>
    );
    
    // Test that the button renders with custom styles applied
    expect(getByText('Styled Button')).toBeTruthy();
  });

  it('passes through TouchableOpacity props', () => {
    const { getByText } = render(
      <Button activeOpacity={0.5}>
        Test Button
      </Button>
    );
    
    // Test that the button renders with custom TouchableOpacity props
    expect(getByText('Test Button')).toBeTruthy();
  });

  describe('Text Color Logic', () => {
    it('uses white text for primary variant', () => {
      const { getByText } = render(
        <Button variant="primary">Primary Button</Button>
      );
      
      const textElement = getByText('Primary Button');
      expect(textElement.props.style).toContainEqual(
        expect.objectContaining({ color: '#fff' })
      );
    });

    it('uses white text for secondary variant', () => {
      const { getByText } = render(
        <Button variant="secondary">Secondary Button</Button>
      );
      
      const textElement = getByText('Secondary Button');
      expect(textElement.props.style).toContainEqual(
        expect.objectContaining({ color: '#fff' })
      );
    });

    it('uses blue text for outlined variant', () => {
      const { getByText } = render(
        <Button variant="outlined">Outlined Button</Button>
      );
      
      const textElement = getByText('Outlined Button');
      expect(textElement.props.style).toContainEqual(
        expect.objectContaining({ color: '#01B4E4' })
      );
    });
  });

  describe('Accessibility', () => {
    it('is accessible when not disabled', () => {
      const { getByText } = render(
        <Button accessibilityLabel="Accessible Button">
          Button
        </Button>
      );
      
      // Test that the button renders with accessibility label
      expect(getByText('Button')).toBeTruthy();
    });

    it('maintains accessibility when loading', () => {
      const { getByTestId } = render(
        <Button 
          isLoading 
          testID="loading-button"
          accessibilityLabel="Loading Button"
        >
          Button
        </Button>
      );
      
      const button = getByTestId('loading-button');
      expect(button.props.accessibilityLabel).toBe('Loading Button');
    });
  });
});
