import React, { useState, useEffect } from 'react'; // TODO zashto react ne e tuk
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
                }
                 else {
                    currentHeaders =
                        {
                        ...customHeaders
                    };
                }

                switch (methodType.toUpperCase()) {
                    case 'GET':
                        response = await axios.get(fullUrl, {
                            headers: currentHeaders,
                            data: body
                        });
                        break;
                    case 'POST':
                        if (customHeaders === 0){
                            response = await axios.post(fullUrl, {
                                token: body
                            });
                        }
                        else{
                            response = await axios.post(fullUrl, {
                                headers: currentHeaders,
                                data: body
                            });
                        }

                        // console.log("response :" + response);
                        // console.log(body);
                        break;

                    case 'DELETE':
                        response = await axios.delete(fullUrl, {
                            headers: currentHeaders,
                            data: body // Data for DELETE requests
                        });
                        break;
                    default:
                        throw new Error(`Unsupported HTTP method: ${methodType}`);
                }

                if (response.status === 200) {
                    setData(response.data);
                }
                else if (response.status === 403){
                    setError(`Response status: ${response.status} (accessed api?? not sure)`);
                }else {
                    setError(`Unexpected response status: ${response.status} (accessed api)Response body: ${response.data} `);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 409) {
                        setError("(Cannot reach the api)" + " " + error);
                    } else if (error.response.status === 204) {
                        setError("(Cannot reach the api)" + " " + error);
                    } else if (error.response.status === 403) {
                        setError("(Cannot reach the api)" + " " + error);
                    } else if (error.response.status === 404) {
                        setError("(Cannot reach the api)" + " " + error);
                    } else if (error.response.status === 401) {
                        setError("(Cannot reach the api)" + " " + error);
                    } else {
                        setError("There was an unexpected error with connecting to the API with unknown error.response.status: " + error.response.status );
                    }
                } else {
                    setError("An unexpected error occurred (Client side)");
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