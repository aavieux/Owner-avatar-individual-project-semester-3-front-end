import React from 'react';
import StarIcon from "../../../pictures/icons8-star-48.png";
const ReviewButton = ({type, itemId}) => {

    if (type.toLowerCase() === "library") {
        return (
            <img className="image book-hover-button" src={StarIcon} alt="Star" />
        );
    } else {
        // Replace 'OtherImage' with the source of the other image you want to display
        return (
            <img className="image book-hover-button" src={StarIcon} alt="Star" />
        );
    }
};

export default ReviewButton;