import React, {useEffect, useState} from 'react';
import TopNavBarComponent from "./reusable/TopNavBarFrag";
import LeftNavBarComponent from "./reusable/LeftNavBarFrag";
import FriendBarComponent from "./reusable/FriendBarFrag";
import axios from "axios";
import {RedirectFunctions} from "../js/RedirectFunctions";
import {useNavigate} from "react-router-dom";

const HomePageComponent = () => {
    const authToken = localStorage.getItem("authToken");
    const [allBooks, setAllBooks] = useState([]);
    const navigate = useNavigate();
    const redirectFunctions = RedirectFunctions(navigate);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/books`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setAllBooks(response.data); // Assuming the response contains a list of UserDto objects
                // Handle the friends list in your component state or context as needed
            } catch (error) {
                // Handle errors (network error, server error, etc.)
                console.error('Error fetching all books:', error);
            }
        };
        fetchBooks();
    }, [authToken]); // us

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
                    {allBooks.length === 0 ? (
                        <div className="error-message">
                            <p>No books found.</p>
                        </div>
                        ) : (
                        allBooks.map((book) => (
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
                                        <span>{book.shadowprofile_id}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
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