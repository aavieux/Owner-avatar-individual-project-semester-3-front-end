import React from 'react';
import TopNavBarComponent from "./reusable/TopNavBarFrag";
import LeftNavBarComponent from "./reusable/LeftNavBarFrag";
import FriendBarComponent from "./reusable/FriendBarFrag";

const BooksFromLibraryComponent = ({ allBooks }) => {
    return (
        <div>
            {/* Top NAV - Include your TopNavBar component here */}
             <TopNavBarComponent />

            {/* CENTER */}
            <div className="float-right contentDiv display-block">
                <div className="rAddedField">
                    {allBooks.map(book => (
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
                                    <span>{book.author.pseudonym}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SIDE NAV left - Include your LeftNavBar component here */}
             <LeftNavBarComponent />

            {/* SIDE NAV right YOUR FRIENDS - Include your FriendBar component here */}
             <FriendBarComponent />
        </div>
    );
};

export default BooksFromLibraryComponent;