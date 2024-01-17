import React from 'react';
import { render, act } from '@testing-library/react';
import FetchData from '../templates/custom-hooks/FetchData'; // Adjust the import path based on your project structure
import axios from 'axios';

// Mock the axios module to control its behavior during testing
jest.mock('axios');

describe('FetchData Component', () => {
    it('fetches successfully data from an API', async () => {
        // Set up your test data
        const methodType = 'GET';
        const url = '/example';
        const customHeaders = null;
        const body = null;

        // Set up the axios mock response
        const responseData = { data: 'mocked data' };
        axios.get.mockResolvedValue({ status: 200, data: responseData });

        // Render the component
        let component;
        await act(async () => {
            component = render(<FetchData methodType={methodType} url={url} customHeaders={customHeaders} body={body} />);
        });

        // Access the state from the component
        const { data, error, loading } = component.result.current;

        // Assertions
        expect(axios.get).toHaveBeenCalledWith(`http://localhost:8080/api${url}`, {
            headers: { Authorization: 'Bearer null' },
            data: null,
        });

        expect(data).toEqual(responseData);
        expect(error).toBeNull();
        expect(loading).toBeFalsy();
    });

    // Add more test cases for other scenarios (e.g., error cases, different HTTP methods, etc.)
});