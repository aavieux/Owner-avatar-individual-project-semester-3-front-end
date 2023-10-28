import React, {useEffect, useState} from 'react';
import FriendBarComponent from "./reusable/FriendBarFrag";
import LeftNavBarComponent from "./reusable/LeftNavBarFrag";
import TopNavBarComponent from "./reusable/TopNavBarFrag";
import axios from "axios";



const MyProfileComponent = ({ authenticatedUser }) => {

    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState([]);


    useEffect(() => {
        // Retrieve the token from localStorage

        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8080/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }});

            setUser(response.data);
            console.log("Response data: " + response.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            {/* CSS Imports */}
            {/* <link rel="stylesheet" type="text/css" href="/static/css/styles.css" /> */}

            {/* Top NAV */}
             <TopNavBarComponent />

            {/* CENTER */}
            <div className="contentDiv accountOverview-center-div">
                <div id="accountOverview-center-field">
                    <div id="account-dashboard">
                        <div id="account-image-field">
                            <div id="account-image-settings">
                                <div id="settings-field">{/* Settings content */}</div>
                                <div id="account-image">
                                    <img
                                        className="profile-pic"
                                        src={user.profile_pic_url ? user.profile_pic_url : '/pictures/bubble-gum-avatar-icon.png'}
                                        alt="User Profile Picture"
                                    />
                                </div>
                            </div>
                        </div>

                        <div id="account-bio-field">
                            <div id="account-bio-txt">
                                <p className="margin-top-a margin-bot-a">{user.first_name} {user.last_name}</p>
                            </div>
                        </div>

                        <div id="account-stats-field">
                            <div id="total-number-books">{/* Total number of books content */}</div>
                            <div id="total-number-friends">{/* Total number of friends content */}</div>
                            <div id="total-number-likes">{/* Total number of likes content */}</div>
                        </div>
                    </div>
                    <div id="account-details">{/* Account details content */}</div>
                </div>
            </div>

            {/* SIDE NAV left */}
             <LeftNavBarComponent />

            {/* SIDE NAV right YOUR FRIENDS */}
             <FriendBarComponent />

            {/* JavaScript Import */}
            {/* <script src="/./js/js.js"></script> */}
        </div>
    );
};

export default MyProfileComponent;