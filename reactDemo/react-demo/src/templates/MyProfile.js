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
            try{
                const response = await axios.get(`http://localhost:8080/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }});

                setUser(response.data);
                if (response.status === 200) {
                    setUser(response.data);// Log the fetched data
                }
                else {
                    console.error(`Unexpected response status: ${response.status}`);
                }
            } catch (error) {

                if (error.response.status === 409){

                    console.error(error.response.data);
                }
                else if (error.response.status === 204){

                    console.error(error.response.data);
                }
                else if (error.response.status === 404){

                    console.error(error.response.data);
                }
                else if (error.response.status === 401){

                    console.error(error.response.data);
                }
                else{
                    console.error("There was an unexpected error with connecting to the API")
                }
            }
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
                            <div id="personal-info-header-txt">
                                <p>Personal Info</p>
                            </div>
                            <div id="personal-info-txt">
                                <p>
                                    Email: {user.email}
                                </p>
                            </div>
                            <div id="personal-info-header-txt">
                                <p>General Information</p>
                            </div>
                            <div id="personal-info-txt">
                                {/* Total number of books content */}
                            </div>
                            <div id="personal-info-txt">
                                <p>
                                    Total friends: {user.total_friends}
                                </p>
                            </div>
                            <div id="personal-info-txt">
                                <p>
                                    Favourite author: {user.f_author_pseudonym}
                                </p>
                            </div>
                            <div id="total-number-likes">{/* Total number of likes content */}

                            </div>
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