import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchData = (methodType, url, customHeaders, body) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const host = 'http://localhost:8080/api';
    const fullUrl = (host + url);

    const authToken = localStorage.getItem("authToken");

    useEffect( ()  => {
        const fetchData = async () => {
            try {
                let response = null;

                let currentHeaders;

                if (customHeaders == null) {
                    currentHeaders =
                        {
                            Authorization: `Bearer ${authToken}`
                        }
                } else {
                    currentHeaders =
                        {
                        Authorization: `Bearer ${authToken}`,
                        ...customHeaders
                    };
                }

                switch (methodType.toUpperCase()) {

                    case 'GET':
                        if (customHeaders == null) {
                            response = await axios.get(fullUrl, {
                                headers: currentHeaders,
                                data: body
                            });
                            break;
                        } else {
                            response = axios.get(fullUrl, {
                                headers: customHeaders,
                                data: body
                            });
                            break;
                        }

                    case 'POST':
                        response = axios.post(fullUrl, {
                            headers: currentHeaders,
                            data: body
                        });
                        break;
                    case 'DELETE':
                        response = axios.delete(fullUrl, {
                            headers: currentHeaders,
                            data: body // Data for DELETE requests
                        });
                        break;
                    default:

                        throw new Error(`Unsupported HTTP method: ${methodType}`);
                }

                if (response.status === 200) {
                    setData(response.data);
                } else {
                    setError(`Unexpected response status: ${response.status}`);
                }
            } catch (error) {
                console.log("CAUGHT ERROR IN FETCH");
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
        }
        fetchData();
    }, []);

    return { data, error, loading };
};

export default FetchData;