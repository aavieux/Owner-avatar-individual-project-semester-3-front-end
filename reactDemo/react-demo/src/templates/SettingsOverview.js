import React from 'react';
import FetchData from "./custom-hooks/FetchData";
import SettingsIcon from "../pictures/icons8-settings.png";
import DefaultUserIcon from "../pictures/bubble-gum-avatar-icon.png";
const SettingsOverview = () => {
    const { data: user, error: userError, loading: userLoading } = FetchData("GET", "/users/profile", null, null);

    return (
        <div>
            <div className="contentDiv accountOverview-center-div">
                <div id="accountOverview-center-field">
                    {userLoading && <p>Loading...</p>}
                    {userError && (
                        <div className="error-message">
                            <p>Error: {userError.message}</p>
                        </div>
                    )}
                    {user && !userLoading && !userError && (
                        <div id="account-dashboard">
                            <div id="account-image-field">
                                <div id="account-image-settings">
                                    <div id="account-image">
                                        <img
                                            className="profile-pic"
                                            src={user.profile_pic_url ? user.profile_pic_url : DefaultUserIcon}
                                            alt="User Profile Picture"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div id="account-bio-field">
                                <div id="account-bio-txt">
                                    <input
                                        type="text"
                                        className="margin-top-a margin-bot-a"
                                        value={`${user.first_name} ${user.last_name}`}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div id="account-stats-field">
                                <div id="personal-info-header-txt">
                                    <p>Personal Info</p>
                                </div>
                                <div id="personal-info-txt">
                                    <input
                                        type="email"
                                        value={user.email}
                                        readOnly
                                    />
                                </div>
                                <div id="personal-info-header-txt">
                                    <p>General Information</p>
                                </div>
                                <div id="personal-info-txt">
                                    <input
                                        type="number"
                                        value={user.total_friends}
                                        readOnly
                                    />
                                </div>
                                <div id="personal-info-txt">
                                    <input
                                        type="text"
                                        value={user.f_author_pseudonym}
                                        readOnly
                                    />
                                </div>
                                <div id="total-number-likes">{/* Total number of likes content */}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default SettingsOverview;