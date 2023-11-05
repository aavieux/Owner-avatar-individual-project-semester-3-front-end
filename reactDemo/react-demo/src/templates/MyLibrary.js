import React, {useEffect, useState} from 'react';
import TopNavBarComponent from "./reusable/TopNavBarFrag";
import LeftNavBarComponent from "./reusable/LeftNavBarFrag";
import FriendBarComponent from "./reusable/FriendBarFrag";
import axios from "axios";
import {RedirectFunctions} from "../js/RedirectFunctions";
import {useNavigate} from "react-router-dom";

const MyLibraryComponent = () => {

    const authToken = localStorage.getItem("authToken");
    const [allLibraries, setAllLibraries] = useState([]);
    const navigate = useNavigate();
    const redirectFunctions = RedirectFunctions(navigate);


    useEffect(() => {
        const fetchLibraries = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/libraries/mylibrary`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                if (response.status === 200) {
                    setAllLibraries(response.data);// Log the fetched data
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
        fetchLibraries();
    }, [authToken]); // us



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
                    {allLibraries.map(library => (
                        <div className="library-contents w-unset" key={library.id}>
                            <div className="image-holder">
                                <div className="middle">
                                    <div className="hover-button"  onClick={() =>  redirectFunctions.redirectToLibraryOverview(library.id)}>
                                        <img className="image book-hover-button" src="/pictures/icons8-view-48.png" alt="View" />
                                    </div>
                                    <div className="hover-button">
                                        <img className="image book-hover-button" src="/pictures/icons8-star-48.png" alt="Star" />
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