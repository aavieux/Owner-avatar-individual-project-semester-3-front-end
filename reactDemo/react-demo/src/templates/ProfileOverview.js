import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import DefaultUserIcon from "../pictures/bubble-gum-avatar-icon.png";
import FetchData from "./custom-hooks/FetchData";

const ProfileOverviewComponent = () => {

    const { userId } = useParams();

    const { data: profile, error: profileError, loading: profileLoading } = FetchData("GET", `/users?id=${userId}`, null, null);

    return (
        <div>
            <div className="contentDiv accountOverview-center-div">
                <div id="accountOverview-center-field">
                    {profileLoading && <p>Loading...</p>}
                    {profileError && (
                        <div className="error-message">
                            <p>Error: {profileError.message}</p>
                        </div>
                    )}
                    {!profileLoading && !profileError && (
                        <div id="account-dashboard">
                            <div id="account-image-field">
                                <div id="account-image-settings">
                                    <div id="account-image">
                                        <img
                                            className="profile-pic"
                                            src={profile.profile_pic_url ? profile.profile_pic_url : DefaultUserIcon}
                                            alt="User Profile Picture"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div id="account-bio-field">
                                <div id="account-bio-txt">
                                    <p className="margin-top-a margin-bot-a">
                                        {profile.first_name} {profile.last_name}
                                    </p>
                                </div>
                            </div>

                            <div id="account-stats-field">
                                <div id="personal-info-header-txt">
                                    <p>Personal Info</p>
                                </div>
                                <div id="personal-info-txt">
                                    <p>Email: {profile.email}</p>
                                </div>
                                <div id="personal-info-header-txt">
                                    <p>General Information</p>
                                </div>
                                <div id="personal-info-txt">
                                    {/* Total number of books content */}
                                </div>
                                <div id="personal-info-txt">
                                    <p>Total friends: {profile.total_friends}</p>
                                </div>
                                <div id="personal-info-txt">
                                    <p>Favourite author: {profile.f_author_pseudonym}</p>
                                </div>
                                <div id="total-number-likes">
                                    {/* Total number of likes content */}
                                </div>
                            </div>
                        </div>
                    )}
                    <div id="account-details">
                        {/* Other account details */}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ProfileOverviewComponent;