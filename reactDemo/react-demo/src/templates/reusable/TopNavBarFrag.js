import React from 'react';
import {RedirectFunctions} from "../../js/RedirectFunctions";
import {closeSettings, openSettings} from "../../js/js";
import {useNavigate} from "react-router-dom";


const TopNavBarComponent = () => {
    const navigate = useNavigate();
    const redirectFunctions = RedirectFunctions(navigate);

    return (
        <div>
            <div className="modal-ex333" id="modal-ex333">
                <div className="modal-inner" id="modal-inner">
                    {/* Modal Content */}
                    <div></div>
                    <button id="closeModal" onClick={() => closeSettings()}>Close</button>
                </div>
            </div>

            <nav className="navbar-expand-lg bg-white vh-5 d-flex position-relative topNavBarHP">
                {/* Left */}
                <div className="smallBoxTop rightB cursorPointer contentCenter">
                    <img
                        className="cursorPointer"
                        src="/pictures/vector-book-blue-icon-original%20(1).svg"
                        alt="Book Icon"
                        onClick={() =>  redirectFunctions.redirectTo('home')}
                    />
                </div>

                {/* Center */}
                <div className="bigBoxTop">
                    <div className="searchBar">
                        <input id="searchQueryInput" type="text" name="searchQueryInput" value="" />
                        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                            <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                            </svg>
                        </button>
                        {/* <div id="searchResults"></div> */}
                    </div>
                </div>

                {/* Right */}
                <div className="smallBoxTop right0 leftB">
                    <div className="d-flex w-inherit justify-content-evenly p-3-px">
                        <div className="contentCenter p-l-5px cursorPointer ">
                            <img
                                className="rotate mirror-image"
                                src="/pictures/icons8-account-48.png"
                                alt="User Account"
                                onClick={() =>  redirectFunctions.redirectTo('users/profile')}
                            />
                        </div>
                        <div className="contentCenter p-l-5px cursorPointer " id="openModal" onClick={() => openSettings()}>
                            <img className="rotate" src="/pictures/icons8-settings-48.png" alt="Settings"  />
                        </div>
                        <div className="contentCenter p-r-10px cursorPointer">
                            <img src="/pictures/icons8-exit-48.png" alt="Logout" onClick={() => redirectFunctions.logOut()} />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default TopNavBarComponent;