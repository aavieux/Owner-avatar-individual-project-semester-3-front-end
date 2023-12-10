import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import DefaultUserIcon from "../pictures/bubble-gum-avatar-icon.png";

const ProfileOverviewComponent = () => {

    const { userId } = useParams();
    const authToken = localStorage.getItem("authToken");
    const [profile, setProfile] = useState([]);


    useEffect(() => {
      const fetchData = async () => {
          try{
            const response = await axios.get(`http://localhost:8080/api/users?id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }});
                setProfile(response.data);
              if (response.status === 200) {
                  setProfile(response.data);// Log the fetched data
              }
              else if (response.status === 300){
                  console.error(`Response status: ${response.status}`);
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
    }, [userId]);

    return (
        <div>
            <div className="contentDiv accountOverview-center-div">
                <div id="accountOverview-center-field">
                    <div id="account-dashboard">
                        <div id="account-image-field">
                            <div id="account-image-settings">
                                <div id="account-image">
                                    <img
                                        className="profile-pic"
                                        src={profile.profile_pic_url ? profile.profile_pic_url : DefaultUserIcon}
                                        alt="User Profile Picture"
                                    />
                                </div>
                            </div>
                        </div>

                        <div id="account-bio-field">
                            {/*{relationType === 'FRIENDS' && <button id="friendsBTN">FRIENDS</button>}*/}
                            {/*{relationType === 'NOT_FRIENDS' && <button id="addFriendBtn">Add Friend</button>}*/}
                            {/*{relationType === 'INCOMING' && <button id="acceptFriendRequestBtn">Accept Friend Request</button>}*/}
                            {/*{relationType === 'OUTGOING' && <button id="cancelFriendRequestBtn">Cancel Friend Request</button>}*/}

                            <div id="account-bio-txt">
                                <p className="margin-top-a margin-bot-a">{profile.first_name} {profile.last_name}</p>
                            </div>
                        </div>

                        <div id="account-stats-field">
                            <div id="personal-info-header-txt">
                                <p>Personal Info</p>
                            </div>
                            <div id="personal-info-txt">
                                <p>
                                    Email: {profile.email}
                                </p>
                            </div>
                            <div id="personal-info-header-txt">
                                <p>General Information</p>
                            </div>
                            <div id="personal-info-txt">
                                {/* Total number of books content */}
                            </div>
                            <div id="personal-info-txt">
                                <p>
                                    Total friends: {profile.total_friends}
                                </p>
                            </div>
                            <div id="personal-info-txt">
                                <p>
                                    Favourite author: {profile.f_author_pseudonym}
                                </p>
                            </div>
                            <div id="total-number-likes">{/* Total number of likes content */}

                            </div>
                        </div>
                    </div>
                    <div id="account-details">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileOverviewComponent;