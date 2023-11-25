import React, {useEffect, useState} from 'react';
import { RedirectFunctions } from "../../js/RedirectFunctions";
import {useNavigate} from "react-router-dom";
import FetchData from "../custom-hooks/FetchData";

const FriendBarComponent = () => {

    const navigate = useNavigate();
    const redirectFunctions = RedirectFunctions(navigate);

    const {data: data, error: error, loading: loading} = FetchData("GET", "/relationships/allfriends", null, null)
    // useEffect(() => {
    //     const fetchFriends = () => {
    //         try {
    //             console.log("tuka");
    //             const {
    //                 data: data,
    //                 error: error,
    //                 loading: loading
    //             } = useFetchData("GET", "/relationships/allfriends", null, null)
    //
    //             // Check if fetchDataHook returned an error
    //             if (error) {
    //                 // Handle the fetchError from fetchDataHook
    //                 setError(error);
    //                 console.log(error);
    //                 return; // Exit the function early to prevent further execution
    //             }
    //             setAllFriends(data);
    //             console.log("ok");
    //             setError(null);
    //
    //         } catch (err) {
    //             setError(err.message || 'An unexpected error occurred');
    //             console.log("not ok");
    //         }
    //     };
    //
    //     fetchFriends();
    // }, []);
    return (
        <div className="d-flex flex-column flex-shrink-0 p-2-rem text-white sideNavBarHP right0 g-r-g-20px rightNavBar">
            <div className="yfriends">
                <p className="yfriendstxt">Your friends</p>
            </div>

            {error ? (
                <div className="error-message">
                    {/* Display an error message */}
                    <p>There was an error: {error}</p>
                    {/* You can add more UI elements or instructions for the user */}
                </div>
            ) : !data || data.length === 0 ? (
                <div className="no-friends-message">
                    {/* Display a message when data is empty */}
                    <p>No friends available</p>
                    {/* You can add more UI elements or instructions for the user */}
                </div>
            ) : (
                data.map((friend) => (
                    <div className="friend-bar" key={friend.id}>
                    <div className="chat-overlay"></div>
                    <div className="friend-bar-image-holder">
                        <img
                            className="chatImage"
                            src={'/pictures/icons8-avatar-48.png'}
                            alt="User Profile Picture"
                        />
                    </div>
                    <div className="friend-bar-contents">
                        <div className="chat-name">
                            <p>{friend.first_name}</p>
                        </div>
                        <div className="chat-status">
                            <p>User status</p>
                        </div>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        redirectFunctions.redirectToProfileOverview(friend.id);
                    }}>
                        <input type="hidden" name="userId" value={friend.id} />
                        <button type="submit">Go to User</button>
                    </form>
                </div>
                ))
            )}
        </div>
    );
};

export default FriendBarComponent;