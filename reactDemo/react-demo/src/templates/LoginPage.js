import React from 'react';

const LoginComponent = () => {
    return (
        <>
            {/* CSS Import (if needed) */}
            {/* <link rel="stylesheet" type="text/css" href="/static/css/styles.css" /> */}
            {/* HTML Content */}
            <div className="login-container">
                <h1>Please Log In</h1>
                {window.location.search.includes('error') && <div>Invalid username and password.</div>}
                {window.location.search.includes('logout') && <div>You have been logged out.</div>}
                <form action="/login" method="post">
                    <div>
                        <input type="text" name="username" placeholder="Username" />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                    <div className="rememberMe-container">
                        <p id="rememberMe-txt">Remember Me:</p>
                        <input type="checkbox" className="w-30px" name="remember-me" />
                    </div>
                    <input className="loginButton" type="submit" value="Log in" />
                </form>
            </div>
        </>
    );
};

export default LoginComponent;