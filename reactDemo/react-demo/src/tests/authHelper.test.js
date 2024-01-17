import { isAuthenticated } from '../templates/custom-hooks/authHelper';
import FetchData from '../templates/custom-hooks/FetchData';


// Mock the FetchData function
jest.mock('../templates/custom-hooks/FetchData');

describe('isAuthenticated Function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset mock calls after each test
    });

    it('should return false if token is not present', () => {
        localStorage.getItem.mockReturnValueOnce(null);

        const result = isAuthenticated();

        expect(result).toBe(false);
    });

    it('should return false if token is expired', async () => {
        const token = 'mockedToken';
        localStorage.getItem.mockReturnValueOnce(token);

        FetchData.mockReturnValueOnce({
            data: true, // Assume token is expired in this mock
            error: null,
            loading: false,
        });

        const result = isAuthenticated();

        expect(result).toBe(false);
        expect(FetchData).toHaveBeenCalledWith('POST', '/auth/tokenexpired', 0, token);
    });

    it('should return true if token is valid', async () => {
        const token = 'mockedToken';
        localStorage.getItem.mockReturnValueOnce(token);

        FetchData.mockReturnValueOnce({
            data: false, // Assume token is valid in this mock
            error: null,
            loading: false,
        });

        const result = isAuthenticated();

        expect(result).toBe(true);
        expect(FetchData).toHaveBeenCalledWith('POST', '/auth/tokenexpired', 0, token);
    });

    it('should return false if FetchData encounters an error', async () => {
        const token = 'mockedToken';
        localStorage.getItem.mockReturnValueOnce(token);

        FetchData.mockReturnValueOnce({
            data: null,
            error: 'Some error message',
            loading: false,
        });

        const result = isAuthenticated();

        expect(result).toBe(false);
        expect(FetchData).toHaveBeenCalledWith('POST', '/auth/tokenexpired', 0, token);
    });
});
