import React from 'react';
import {RedirectFunctions} from "../../js/RedirectFunctions";

const LeftNavBarComponent = () => {
    const redirectFunctions = RedirectFunctions();

    return (
        <div className="d-flex flex-column flex-shrink-0 p-2-rem text-white sideNavBarHP">
            <div className="browseField">
                <div id="browse-txt">
                    <p>Browse</p>
                </div>

                <div className="item-field" >
                    <p id="home-txt" onClick={() =>  redirectFunctions.redirectTo('home')}>Home</p>
                </div>
            </div>

            <div className="yourBooksField">
                <div id="your-books-txt">
                    <p>Your Books</p>
                </div>
                <div className="item-field" onClick={() =>   redirectFunctions.redirectTo('libraries/mylibrary')}>
                    <p>My Library</p>
                </div>
                <div className="item-field" onClick={() =>   redirectFunctions.redirectTo('/libraries/mylibrary/saved')}>
                    <p>Saved</p>
                </div>
                <div className="item-field" onClick={() =>   redirectFunctions.redirectTo('/libraries/mylibrary')}>
                    <p>More</p>
                </div>
            </div>
        </div>
    );
};

export default LeftNavBarComponent;