import React from 'react';
import TopNavBarComponent from "./reusable/TopNavBarFrag";
import LeftNavBarComponent from "./reusable/LeftNavBarFrag";
import FriendBarComponent from "./reusable/FriendBarFrag";

const HomePageComponent = ({ allBooks }) => {
    return (
        <>
            {/* Top NAV */}
            <TopNavBarComponent />

            {/* CENTER */}
            <div className="float-right contentDiv display-block">
                <div className="rAdded">
                    <p className="rAddedtxt">Recently added</p>
                </div>

                <div className="rAddedField">
                    {allBooks.map((book) => (
                        <div className="book-contents" key={book.id}>
                            <div className="image-holder">
                                <div className="middle">
                                    <div className="hover-button">
                                        <img className="image" src="/pictures/icons8-view-48.png" alt="View" />
                                    </div>
                                    <div className="hover-button">
                                        <img className="image" src="/pictures/icons8-star-48.png" alt="Star" />
                                    </div>
                                </div>
                                <img className="h-inherit" src={book.cover_url} alt={`${book.title}'s image`} />
                            </div>

                            <div className="info-holder">
                                <div className="title-holder">
                                    <p>{book.title}</p>
                                </div>

                                <div className="author-txt">
                                    <div className="highlight"></div>
                                    <span>{book.author.getPseudonym()}</span>
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
        </>
    );
};
export default HomePageComponent;