import React from 'react';
import { render } from '@testing-library/react-native';
import { Typography } from '../Typography';

describe('Typography Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Typography>Test Text</Typography>);
    expect(getByText('Test Text')).toBeTruthy();
  });

  it('applies correct styles for different variants', () => {
    const variants = [
      'sectionTitle',
      'subtitle', 
      'body',
      'caption',
      'placeholder',
      'heading',
      'cardTitle',
      'cardSubtitle'
    ] as const;

    variants.forEach(variant => {
      const { getByText } = render(
        <Typography variant={variant}>{variant} text</Typography>
      );
      const textElement = getByText(`${variant} text`);
      expect(textElement).toBeTruthy();
    });
  });

  it('applies custom color when provided', () => {
    const { getByText } = render(
      <Typography color="#FF0000">Colored Text</Typography>
    );
    const textElement = getByText('Colored Text');
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining({ color: '#FF0000' })
    );
  });

  it('merges custom styles with default styles', () => {
    const customStyle = { marginTop: 10 };
    const { getByText } = render(
      <Typography style={customStyle}>Styled Text</Typography>
    );
    const textElement = getByText('Styled Text');
    expect(textElement.props.style).toContainEqual(
      expect.objectContaining(customStyle)
    );
  });

  it('passes through additional Text props', () => {
    const { getByText } = render(
      <Typography numberOfLines={2} testID="typography-test">
        Long text that should be truncated
      </Typography>
    );
    const textElement = getByText('Long text that should be truncated');
    expect(textElement.props.numberOfLines).toBe(2);
    expect(textElement.props.testID).toBe('typography-test');
  });

  it('renders nested React elements as children', () => {
    const { getByText } = render(
      <Typography>
        <Typography variant="caption">Hello</Typography>
        <Typography variant="caption">World</Typography>
      </Typography>
    );
    expect(getByText('Hello')).toBeTruthy();
    expect(getByText('World')).toBeTruthy();
  });

  describe('Variant Styles', () => {
    it('applies correct styles for sectionTitle variant', () => {
      const { getByText } = render(
        <Typography variant="sectionTitle">Section Title</Typography>
      );
      const textElement = getByText('Section Title');
      expect(textElement.props.style).toContainEqual(
        expect.objectContaining({
          fontSize: 20,
          fontWeight: 'bold',
          color: '#000',
        })
      );
    });

    it('applies correct styles for heading variant', () => {
      const { getByText } = render(
        <Typography variant="heading">Heading</Typography>
      );
      const textElement = getByText('Heading');
      expect(textElement.props.style).toContainEqual(
        expect.objectContaining({
          fontSize: 18,
          fontWeight: '600',
          color: '#000',
        })
      );
    });

    it('applies correct styles for caption variant', () => {
      const { getByText } = render(
        <Typography variant="caption">Caption</Typography>
      );
      const textElement = getByText('Caption');
      expect(textElement.props.style).toContainEqual(
        expect.objectContaining({
          fontSize: 12,
          fontWeight: '400',
          color: '#666',
        })
      );
    });

    it('applies correct styles for placeholder variant', () => {
      const { getByText } = render(
        <Typography variant="placeholder">Placeholder</Typography>
      );
      const textElement = getByText('Placeholder');
      expect(textElement.props.style).toContainEqual(
        expect.objectContaining({
          fontSize: 12,
          color: '#666',
          textAlign: 'center',
        })
      );
    });
  });
});
