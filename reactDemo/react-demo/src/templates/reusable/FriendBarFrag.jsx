import React, {useEffect, useState} from 'react';
import axios from "axios";
import { RedirectFunctions } from "../../js/RedirectFunctions";
import {useNavigate} from "react-router-dom";

const FriendBarComponent = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("authToken");
    const [allFriends, setAllFriends] = useState([]);
    const redirectFunctions = RedirectFunctions(navigate);

    useEffect(() => {
        const userId = 11;

        const fetchFriends = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/relationships/allfriends`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setAllFriends(response.data); // Assuming the response contains a list of UserDto objects
                // Handle the friends list in your component state or context as needed
            } catch (error) {
                // Handle errors (network error, server error, etc.)
                console.error('Error fetching friends:', error);
            }
        };
        fetchFriends();
    }, [authToken]); // useEffect will run whenever authToken changes



    // Rest of your component code
    // ...

    return (
        <div className="d-flex flex-column flex-shrink-0 p-2-rem text-white sideNavBarHP right0 g-r-g-20px rightNavBar">
            <div className="yfriends">
                <p className="yfriendstxt">Your friends</p>
            </div>
            {allFriends.map(friend => (
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
            ))}
        </div>
    );
};

export default FriendBarComponent;