import React from 'react';
import FriendBarComponent from "./reusable/FriendBarFrag";
import LeftNavBarComponent from "./reusable/LeftNavBarFrag";
import TopNavBarComponent from "./reusable/TopNavBarFrag";

const AccountOverviewComponent = ({ authenticatedUser }) => {

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
                                        src={authenticatedUser.profile_pic_url ? authenticatedUser.profile_pic_url : '/pictures/bubble-gum-avatar-icon.png'}
                                        alt="User Profile Picture"
                                    />
                                </div>
                            </div>
                        </div>

                        <div id="account-bio-field">
                            <div id="account-bio-txt">
                                <p className="margin-top-a margin-bot-a">{authenticatedUser.first_name} {authenticatedUser.last_name}</p>
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

export default AccountOverviewComponent;