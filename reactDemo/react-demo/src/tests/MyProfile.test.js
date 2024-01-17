import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RedirectFunctions } from '../js/RedirectFunctions';
import FetchData from '../templates/custom-hooks/FetchData';
import MyProfileComponent from '../templates/MyProfile';

// Mock the FetchData function
jest.mock('../templates/custom-hooks/FetchData');

// Mock the RedirectFunctions module
jest.mock('../js/RedirectFunctions', () => ({
    RedirectFunctions: jest.fn(() => ({
        redirectTo: jest.fn(),
    })),
}));

describe('MyProfileComponent', () => {
    test('renders loading state', () => {
        // Mock FetchData to return loading state
        FetchData.mockReturnValueOnce({
            data: null,
            error: null,
            loading: true,
        });

        render(<MyProfileComponent />);

        // Check if loading message is displayed
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders error state', async () => {
        const errorMessage = 'Test error message';

        // Mock FetchData to return error state
        FetchData.mockReturnValueOnce({
            data: null,
            error: new Error(errorMessage),
            loading: false,
        });

        render(<MyProfileComponent />);

        // Wait for the error message to be displayed
        await waitFor(() => {
            expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
        });
    });

    test('renders user profile', async () => {
        const userMockData = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            total_friends: 10,
            f_author_pseudonym: 'Jane Author',
            // Add other properties as needed for your user object
        };

        // Mock FetchData to return user data
        FetchData.mockReturnValueOnce({
            data: userMockData,
            error: null,
            loading: false,
        });

        render(<MyProfileComponent />);

        // Wait for the user profile to be displayed
        await waitFor(() => {
            expect(screen.getByText(`${userMockData.first_name} ${userMockData.last_name}`)).toBeInTheDocument();
            expect(screen.getByText(`Email: ${userMockData.email}`)).toBeInTheDocument();
            expect(screen.getByText(`Total friends: ${userMockData.total_friends}`)).toBeInTheDocument();
            expect(screen.getByText(`Favourite author: ${userMockData.f_author_pseudonym}`)).toBeInTheDocument();
        });

        // Check if the redirect function is called when the settings icon is clicked
        userEvent.click(screen.getByAltText('Settings Picture'));
        expect(RedirectFunctions().redirectTo).toHaveBeenCalledWith('users/profile/settings');
    });
});
