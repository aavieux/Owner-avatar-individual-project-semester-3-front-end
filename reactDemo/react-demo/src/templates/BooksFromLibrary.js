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
            try {
                const response = await axios.get(`http://localhost:8080/api/libraries/mylibrary/${libraryId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                if (response.status === 200) {
                    setBooksList(response.data);// Log the fetched data
                }
                else {
                    console.error(`Unexpected response status: ${response.status}`);
                }
            } catch (error) {

                if (error.response.status === 409){

                    console.error(error.response.data);
                }
                else if (error.response.status === 204){

                    console.error(error.response.data);
                }
                else if (error.response.status === 404){

                    console.error(error.response.data);
                }
                else if (error.response.status === 401){

                    console.error(error.response.data);
                }
                else{
                    console.error("There was an unexpected error with connecting to the API")
                }
            }
        };

        fetchData();
    }, [libraryId, authToken]);



    return (
        <div>
            {/* Top NAV - Include your TopNavBar component here */}
             <TopNavBarComponent />

            {/* CENTER */}
            <div className="float-right contentDiv display-block">
                <div className="libraryNameDiv">
                    <p id="libraryNameTxt"> {booksList.length > 0 ? booksList[0].library_title : "No Books Available"} </p>
                </div>
                <div className="rAddedField">
                    {booksList.length > 0 ? (
                        booksList.map(book => (
                        <div className="book-contents" key={book.id}>
                            <div className="image-holder">
                                <div className="middle">
                                    <div className="hover-button">
                                        <img className="image book-hover-button" src="/pictures/icons8-view-48.png" alt="View" onClick={() => redirectFunctions.redirectToBookPage(book.id)}/>
                                    </div>
                                    <div className="hover-button">
                                        <img className="image book-hover-button" src="/pictures/icons8-star-48.png" alt="Star" />
                                    </div>
                                </div>
                                <img className="h-inherit w-inherit" src={book.cover_url} alt={`${book.title}'s image`} />
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
                    ))): null}
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