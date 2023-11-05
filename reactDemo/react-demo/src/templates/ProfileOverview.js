import React, {useEffect, useState} from 'react';
import FriendBarComponent from "./reusable/FriendBarFrag";
import LeftNavBarComponent from "./reusable/LeftNavBarFrag";
import TopNavBarComponent from "./reusable/TopNavBarFrag";
import {useParams} from "react-router-dom";
import axios from "axios";

const ProfileOverviewComponent = () => {

    const { userId } = useParams();
    const authToken = localStorage.getItem("authToken");
    const [profile, setProfile] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8080/api/users?id=${userId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }});
            setProfile(response.data);

      };
      fetchData();
    }, [userId]);

    return (
        <div>
            {/* CSS Imports */}
            {/* <link rel="stylesheet" type="text/css" href="/static/css/styles.css" /> */}

            {/* Top NAV */}
             <TopNavBarComponent  />

            {/* CENTER */}
            <div className="contentDiv accountOverview-center-div">
                <div id="accountOverview-center-field">
                    <div id="account-dashboard">
                        <div id="account-image-field">
                            <div id="account-image-settings">
                                <div id="account-image">
                                    <img
                                        className="profile-pic"
                                        src={profile.profile_pic_url ? profile.profile_pic_url : '/pictures/bubble-gum-avatar-icon.png'}
                                        alt="User Profile Picture"
                                    />
                                </div>
                            </div>
                        </div>

                        <div id="account-bio-field">
                            {/*{relationType === 'FRIENDS' && <button id="friendsBTN">FRIENDS</button>}*/}
                            {/*{relationType === 'NOT_FRIENDS' && <button id="addFriendBtn">Add Friend</button>}*/}
                            {/*{relationType === 'INCOMING' && <button id="acceptFriendRequestBtn">Accept Friend Request</button>}*/}
                            {/*{relationType === 'OUTGOING' && <button id="cancelFriendRequestBtn">Cancel Friend Request</button>}*/}

                            <div id="account-bio-txt">
                                <p className="margin-top-a margin-bot-a">{profile.first_name} {profile.last_name}</p>
                            </div>
                        </div>

                        <div id="account-stats-field">
                            <div id="personal-info-header-txt">
                                <p>Personal Info</p>
                            </div>
                            <div id="personal-info-txt">
                                <p>
                                    Email: {profile.email}
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
                                    Total friends: {profile.total_friends}
                                </p>
                            </div>
                            <div id="personal-info-txt">
                                <p>
                                    Favourite author: {profile.f_author_pseudonym}
                                </p>
                            </div>
                            <div id="total-number-likes">{/* Total number of likes content */}

                            </div>
                        </div>
                    </div>
                    <div id="account-details">



                    </div>
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

export default ProfileOverviewComponent;