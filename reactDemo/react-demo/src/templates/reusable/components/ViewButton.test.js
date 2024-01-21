import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ViewButton from './ViewButton';

describe('ViewButton component', () => {
    it('renders without errors', () => {
        render(<ViewButton type="library" itemId={123} />);
        expect(screen.getByAltText('View')).toBeInTheDocument();
    });

    it('handles click event for library type', () => {
        const mockRedirectToLibraryOverview = jest.fn();
        jest.mock('../../../js/RedirectFunctions', () => ({
            RedirectFunctions: () => ({
                redirectToLibraryOverview: mockRedirectToLibraryOverview,
            }),
        }));

        render(<ViewButton type="library" itemId={123} />);
        fireEvent.click(screen.getByAltText('View'));
        expect(mockRedirectToLibraryOverview).toHaveBeenCalledWith(123);
    });

    it('handles click event for other type', () => {
        const mockRedirectToBookPage = jest.fn();
        jest.mock('../../../js/RedirectFunctions', () => ({
            RedirectFunctions: () => ({
                redirectToBookPage: mockRedirectToBookPage,
            }),
        }));

        render(<ViewButton type="otherType" itemId={456} />);
        fireEvent.click(screen.getByAltText('View'));
        expect(mockRedirectToBookPage).toHaveBeenCalledWith(456);
    });
});
