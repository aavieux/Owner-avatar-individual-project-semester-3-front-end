import React, {useEffect, useState} from 'react';
import TopNavBarComponent from "./reusable/TopNavBarFrag";
import LeftNavBarComponent from "./reusable/LeftNavBarFrag";
import FriendBarComponent from "./reusable/FriendBarFrag";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {RedirectFunctions} from "../js/RedirectFunctions";

const BooksFromLibraryComponent = () => {
    const { libraryId } = useParams();
    const authToken = localStorage.getItem("authToken");
    const [booksList, setBooksList] = useState([]);
    const navigate = useNavigate();
    const redirectFunctions = RedirectFunctions(navigate);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8080/api/libraries/mylibrary/${libraryId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }});
            setBooksList(response.data);
            console.log("Response data: " + response.data);
        };
        fetchData();
    }, [libraryId]);



    return (
        <div>
            {/* Top NAV - Include your TopNavBar component here */}
             <TopNavBarComponent />

            {/* CENTER */}
            <div className="float-right contentDiv display-block">
                <div className="libraryNameDiv">
                    <p id="libraryNameTxt"> {booksList.length > 0 ? booksList[0].library_title : "No library available"} </p>
                </div>
                <div className="rAddedField">
                    {booksList.map(book => (
                        <div className="book-contents" key={book.id}>
                            <div className="image-holder">
                                <div className="middle">
                                    <div className="hover-button">
                                        <img className="image" src="/pictures/icons8-view-48.png" alt="View" onClick={() => redirectFunctions.redirectToBookPage(book.id)}/>
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
                                    <span>{book.author_pseudonym}</span>
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