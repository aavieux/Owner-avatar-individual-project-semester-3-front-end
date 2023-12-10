import React from 'react';
import {RedirectFunctions} from "../../../js/RedirectFunctions";
import ViewBookIcon from "../../../pictures/icons8-view-48.png";
const ViewButton = ({type, itemId}) => {
    const redirectFunctions = RedirectFunctions();
    if (type.toLowerCase() === "library") {
        return (
            <img
                className="image book-hover-button"
                src={ViewBookIcon}
                alt="View"
                onClick={() => redirectFunctions.redirectToLibraryOverview(itemId)}
            />
        );
    } else {
        // Replace 'OtherImage' with the source of the other image you want to display
        return (
            <img
                className="image book-hover-button"
                src={ViewBookIcon}
                alt="View"
                onClick={() => redirectFunctions.redirectToBookPage(itemId)/* Handle click for other type */}
            />
        );
    }
};

export default ViewButton;