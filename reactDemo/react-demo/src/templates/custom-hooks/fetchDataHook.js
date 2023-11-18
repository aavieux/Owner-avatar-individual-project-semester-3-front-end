import { useEffect, useState } from 'react';
import axios from 'axios';

const fetchDataHook = (url, authToken, method) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const host = 'http://localhost:8080';
    const deleteResponse = await axios.delete(`${host}/api/books/${bookId}`, {

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                switch (method.toUpperCase()) {
                    case 'GET':
                        response = await axios.get(url, {
                            headers: {
                                Authorization: `Bearer ${authToken}`
                            }
                        });
                        break;
                    case 'POST':
                        response = await axios.post(url, requestData, {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        break;
                    case 'DELETE':
                        response = await axios.delete(url, {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                                'Content-Type': 'application/json'
                            },
                            data: requestData // Data for DELETE requests
                        });
                        break;
                    // Add cases for other methods like PUT, PATCH, etc. if needed

                    default:
                        throw new Error(`Unsupported HTTP method: ${method}`);
                }
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    setError(`Unexpected response status: ${response.status}`);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 409) {
                        setError(error.response.data);
                    } else if (error.response.status === 204) {
                        setError(error.response.data);
                    } else if (error.response.status === 404) {
                        setError(error.response.data);
                    } else if (error.response.status === 401) {
                        setError(error.response.data);
                    } else {
                        setError("There was an unexpected error with connecting to the API");
                    }
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, authToken]);

    return { data, error, loading };
};

export default fetchDataHook;