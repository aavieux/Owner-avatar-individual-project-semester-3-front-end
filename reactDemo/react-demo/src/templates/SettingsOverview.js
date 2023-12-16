import React, {useState} from 'react';
import FetchData from "./custom-hooks/FetchData";
import SettingsIcon from "../pictures/icons8-settings.png";
import DefaultUserIcon from "../pictures/bubble-gum-avatar-icon.png";
import axios from "axios";
const SettingsOverview = () => {
    const { data: user, error: userError, loading: userLoading } = FetchData("GET", "/users/profile", null, null);
    const [firstNameTemp, setFirstNameTemp] = useState('');
    const [lastNameTemp, setLastNameTemp] = useState('');
    const [emailTemp, setEmailTemp] = useState('');
    const [authorTemp, setAuthorTemp] = useState('');
    const handleInputChangeFirstName = (e) => {
        // Update the temporary value on input change
        setFirstNameTemp(e.target.value);
    };
    const handleInputChangeLastName = (e) => {
        // Update the temporary value on input change
        setFirstNameTemp(e.target.value);
    };
    const handleInputChangeEmail = (e) => {
        // Update the temporary value on input change
        setEmailTemp(e.target.value);
    };
    const handleInputChangeAuthor = (e) => {
        // Update the temporary value on input change
        setAuthorTemp(e.target.value);
    };
    const syncData = async () => {

        try {
            const data = {
                first_name: firstNameTemp,
                last_name: lastNameTemp,
                email: emailTemp,
                profile_pic_url: null
            };
            const response = await axios.put(`http://localhost:8080/api/users/profile/settings`, data,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            });

            if (response.status === 200) {
               window.location.reload();
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
    const saveUser = () =>{

        syncData();
    }

    return (
        <div>
            <div className="contentDiv accountOverview-center-div">
                <div id="accountOverview-center-field">
                    {userLoading && <p>Loading...</p>}
                    {userError && (
                        <div className="error-message">
                            <p>Error: {userError.message}</p>
                        </div>
                    )}
                    {user && !userLoading && !userError && (
                        <div id="account-dashboard">
                            <div id="account-image-field">
                                <div id="account-image-settings">
                                    <div id="account-image">
                                        <img
                                            className="profile-pic"
                                            src={user.profile_pic_url ? user.profile_pic_url : DefaultUserIcon}
                                            alt="User Profile Picture"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div id="account-bio-field">
                                <div id="account-bio-txt">
                                    <input
                                        type="text"
                                        className="margin-top-a margin-bot-a"
                                        value={firstNameTemp !== '' ? firstNameTemp : `${user.first_name}`}
                                        onChange={handleInputChangeFirstName}
                                    />
                                    <input
                                        type="text"
                                        className="margin-top-a margin-bot-a"
                                        value={lastNameTemp !== '' ? lastNameTemp : `${user.last_name}`}
                                        onChange={handleInputChangeLastName}
                                    />
                                </div>
                            </div>
                            <div id="account-stats-field">
                                <div id="personal-info-header-txt">
                                    <p>Personal Info</p>
                                </div>
                                <div id="personal-info-txt">
                                    <p>Email:</p>
                                    <input
                                        type="text"
                                        value={emailTemp !== '' ? emailTemp : user.email}
                                        onChange={handleInputChangeEmail}
                                    />
                                </div>
                                <div id="personal-info-header-txt">
                                    <p>General Information</p>
                                </div>
                                <div id="personal-info-txt">
                                    <p>Total friends: {user.total_friends}</p>
                                </div>
                                <div id="personal-info-txt">
                                    <p>Favourite Author:</p>
                                    <input
                                        type="text"
                                        value={authorTemp !== '' ? authorTemp : user.f_author_pseudonym}
                                        onChange={handleInputChangeAuthor}
                                    />
                                </div>
                                <div id="total-number-likes">
                                    <button onClick={() => saveUser()}>Save</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsOverview;