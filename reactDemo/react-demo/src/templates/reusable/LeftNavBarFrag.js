import React from 'react';

const LeftNavBarComponent = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-2-rem text-white sideNavBarHP">
            <div className="browseField">
                <div id="browse-txt">
                    <p>Browse</p>
                </div>

                <div className="item-field" onClick={redirectToHomePage}>
                    <p id="home-txt">Home</p>
                </div>
            </div>

            <div className="yourBooksField">
                <div id="your-books-txt">
                    <p>Your Books</p>
                </div>
                <div className="item-field" onClick={redirectToMyLibrary}>
                    <p>My Library</p>
                </div>
                <div className="item-field">
                    <p>Saved</p>
                </div>
                <div className="item-field">
                    <p>More</p>
                </div>
            </div>
        </div>
    );
};

export default LeftNavBarComponent;