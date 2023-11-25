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
    };
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {

            redirectFunctions.redirectToMyProfile();
        } else {

            setLoading(false);
        }
    }, );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', formData);
            const authToken = response.data.token;
            localStorage.setItem('authToken', authToken);
            redirectFunctions.redirectToMyProfile();
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
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
