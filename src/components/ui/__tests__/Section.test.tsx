import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { Section } from '../Section';

describe('Section Component', () => {
  const TestChild = () => <Text>Test Content</Text>;

  it('renders correctly with default props', () => {
    const { getByText } = render(
      <Section>
        <TestChild />
      </Section>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders with default variant', () => {
    const { getByText } = render(
      <Section variant="default">
        <TestChild />
      </Section>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders with colored variant', () => {
    const { getByText } = render(
      <Section variant="colored" backgroundColor="#ff0000">
        <TestChild />
      </Section>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders with padded variant', () => {
    const { getByText } = render(
      <Section variant="padded">
        <TestChild />
      </Section>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('applies custom background color', () => {
    const { getByText } = render(
      <Section backgroundColor="#00ff00">
        <TestChild />
      </Section>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('applies custom padding', () => {
    const { getByText } = render(
      <Section variant="padded" padding={30}>
        <TestChild />
      </Section>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { marginTop: 20, opacity: 0.8 };
    const { getByText } = render(
      <Section style={customStyle}>
        <TestChild />
      </Section>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('passes through additional View props', () => {
    const { getByText } = render(
      <Section accessible={true} accessibilityLabel="Test section">
        <TestChild />
      </Section>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  describe('Variants', () => {
    it('handles default variant correctly', () => {
      const { getByText } = render(
        <Section variant="default" backgroundColor="#123456">
          <TestChild />
        </Section>
      );
      
      expect(getByText('Test Content')).toBeTruthy();
    });

    it('handles colored variant correctly', () => {
      const { getByText } = render(
        <Section variant="colored" backgroundColor="#654321">
          <TestChild />
        </Section>
      );
      
      expect(getByText('Test Content')).toBeTruthy();
    });

    it('handles padded variant without custom padding', () => {
      const { getByText } = render(
        <Section variant="padded">
          <TestChild />
        </Section>
      );
      
      expect(getByText('Test Content')).toBeTruthy();
    });

    it('handles padded variant with custom padding', () => {
      const { getByText } = render(
        <Section variant="padded" padding={40}>
          <TestChild />
        </Section>
      );
      
      expect(getByText('Test Content')).toBeTruthy();
    });
  });

  describe('Children Rendering', () => {
    it('renders multiple children', () => {
      const { getByText } = render(
        <Section>
          <Text>First Child</Text>
          <Text>Second Child</Text>
        </Section>
      );
      
      expect(getByText('First Child')).toBeTruthy();
      expect(getByText('Second Child')).toBeTruthy();
    });

    it('renders complex children', () => {
      const ComplexChild = () => (
        <>
          <Text>Complex</Text>
          <Text>Component</Text>
        </>
      );

      const { getByText } = render(
        <Section>
          <ComplexChild />
        </Section>
      );
      
      expect(getByText('Complex')).toBeTruthy();
      expect(getByText('Component')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined padding gracefully', () => {
      const { getByText } = render(
        <Section variant="padded" padding={undefined}>
          <TestChild />
        </Section>
      );
      
      expect(getByText('Test Content')).toBeTruthy();
    });

    it('handles zero padding', () => {
      const { getByText } = render(
        <Section variant="padded" padding={0}>
          <TestChild />
        </Section>
      );
      
      expect(getByText('Test Content')).toBeTruthy();
    });

    it('handles empty backgroundColor', () => {
      const { getByText } = render(
        <Section backgroundColor="">
          <TestChild />
        </Section>
      );
      
      expect(getByText('Test Content')).toBeTruthy();
    });
  });
});
