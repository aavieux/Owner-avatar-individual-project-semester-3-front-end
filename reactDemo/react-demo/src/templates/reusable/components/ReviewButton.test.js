import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewButton from './ReviewButton';
import '@testing-library/jest-dom';

test('renders ReviewButton with StarIcon for library type', () => {
    render(<ReviewButton type="library" itemId={123} />);
    const starIcon = screen.getByAltText('Star');
    expect(starIcon).toBeInTheDocument();
});

test('renders ReviewButton with StarIcon for other types', () => {
    render(<ReviewButton type="otherType" itemId={456} />);
    const starIcon = screen.getByAltText('Star');
    expect(starIcon).toBeInTheDocument();
});
