import React from 'react';
import TopNavBarComponent from "./reusable/TopNavBarFrag";
import LeftNavBarComponent from "./reusable/LeftNavBarFrag";
import FriendBarComponent from "./reusable/FriendBarFrag";

const MyLibraryComponent = ({ allLibrariesForAuthenticatedUser }) => {
    return (
        <div>
            {/* CSS Imports */}
            {/* <link rel="stylesheet" type="text/css" href="/static/css/styles.css" /> */}

            {/* Top NAV */}
             <TopNavBarComponent />

            {/* CENTER */}
            <div className="float-right contentDiv display-block">
                <div className="yourLibraries">
                    <p className="yourLibrariestxt">Your Libraries</p>
                </div>

                <div className="yourLibrariesField">
                    {allLibrariesForAuthenticatedUser.map(library => (
                        <div className="library-contents" key={library.id}>
                            <div className="image-holder">
                                <div className="middle">
                                    <div className="hover-button">
                                        <img className="image" src="/pictures/icons8-view-48.png" alt="View" />
                                    </div>
                                    <div className="hover-button">
                                        <img className="image" src="/pictures/icons8-star-48.png" alt="Star" />
                                    </div>
                                </div>
                                <img className="h-inherit" src="/pictures/hand-drawn-seamless-pattern-book-doodle-elements-education-concept_253081-84.avif" alt="Library" />
                            </div>
                            <div className="info-holder">
                                <div className="title-holder">
                                    <p>{library.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rForYou">
                    <p className="rForYoutxt">Recommended for you</p>
                </div>
                <div className="rForYouField">{/* Recommended books go here */}</div>
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

export default MyLibraryComponent;