import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SearchBar from './SearchBar';

describe('SearchBar component', () => {
    let mockAxios;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    test('renders SearchBar component', () => {
        render(<SearchBar />);
        const searchBarElement = screen.getByTestId('search-bar');
        expect(searchBarElement).toBeInTheDocument();
    });

    test('handles search input and displays results', async () => {
        render(<SearchBar />);

        const searchInput = screen.getByPlaceholderText('Search by title');
        fireEvent.change(searchInput, { target: { value: 'Harry Potter' } });

        // Mocking the API response
        mockAxios.onGet('http://localhost:8080/api/books/search?query=Harry%20Potter').reply(200, [
            { id: 1, title: 'Harry Potter and the Sorcerer\'s Stone', author_pseudonym: 'J.K. Rowling', isbn: '123456789' },
            { id: 2, title: 'Harry Potter and the Chamber of Secrets', author_pseudonym: 'J.K. Rowling', isbn: '987654321' },
        ]);

        fireEvent.click(screen.getByTestId('search-query-submit'));

        // Wait for the asynchronous call to complete
        await waitFor(() => {
            const bookTitles = screen.getAllByText(/Harry Potter/);
            expect(bookTitles.length).toBe(2);
        });
    });

    // Add more test cases as needed
});
