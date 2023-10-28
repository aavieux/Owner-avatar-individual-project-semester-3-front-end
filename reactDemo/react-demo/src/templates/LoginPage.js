import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {RedirectFunctions} from "../js/RedirectFunctions";
import {useNavigate} from "react-router-dom";


const LoginComponent = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const redirectFunctions = RedirectFunctions(navigate);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData)
    };
    useEffect(() => {
        // Check if the user is already authenticated (has a stored token)
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            // If authenticated, redirect to the desired page (e.g., /users/myprofile)
            redirectFunctions.redirectToMyProfile();
        } else {
            // If not authenticated, set loading to false to display the login form
            setLoading(false);
        }
    }, ); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', formData);
            const authToken = response.data.token; // Assuming the token is returned in the 'token' field of the response
            localStorage.setItem('authToken', authToken); // Store the token in localStorage (or secure storage)

            redirectFunctions.redirectToMyProfile();
        } catch (error) {
            // Handle authentication error (display error message, etc.)
            console.error('Authentication failed:', error);
        }
    };
    if (loading) {
        // Render loading indicator or any other loading content while checking authentication status
        return <div>Loading...</div>;
    }
    return (
        <>
            {/* CSS Import (if needed) */}
            {/* <link rel="stylesheet" type="text/css" href="/static/css/styles.css" /> */}
            {/* HTML Content */}
            <body className="loginBody">
            <div className="login-container">
                <h1>Please Log In</h1>
                {window.location.search.includes('error') && <div>Invalid username and password.</div>}
                {window.location.search.includes('logout') && <div>You have been logged out.</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="email" placeholder="Username" onChange={handleInputChange} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                    </div>
                    <div className="rememberMe-container">
                        <p id="rememberMe-txt">Remember Me:</p>
                        <input type="checkbox" className="w-30px" name="remember-me" />
                    </div>
                    <input className="loginButton" type="submit" value="Log in" />
                </form>
            </div>
            </body>
        </>
    );
};

export default LoginComponent;