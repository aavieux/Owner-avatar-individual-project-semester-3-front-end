import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from './Error';


test('renders "User not Authenticated!"', () => {
    render(<Error />);
    const errorMessage = screen.getByText(/User not Authenticated!/i);
    expect(errorMessage).toBeInTheDocument();
});
