import React from 'react';

const FriendBarComponent = ({ allFriends }) => {
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
                            src={friend.profile_pic_url ? friend.profile_pic_url : '/pictures/icons8-avatar-48.png'}
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
                    <form action="/redirectToUser" method="post">
                        <input type="hidden" name="userId" value={friend.id} />
                        <button type="submit">Go to User</button>
                    </form>
                </div>
            ))}
        </div>
    );
};

export default FriendBarComponent;