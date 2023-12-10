import React from 'react';
import {RedirectFunctions} from "../../js/RedirectFunctions";
import {closeSettings, openSettings} from "../../js/js";
import SearchBar from './components/SearchBar';
import HomePageLogo from "../../pictures/vector-book-blue-icon-original (1).svg";
import UserAvatar from "../../pictures/icons8-account-48.png";
import SettingsIcon from "../../pictures/icons8-settings-48.png";
import LogOutIcon from "../../pictures/icons8-exit-48.png";
const TopNavBarComponent = () => {
    const redirectFunctions = RedirectFunctions();
    return (
        <div>
            <div className="modal-ex333" id="modal-ex333">
                <div className="modal-inner" id="modal-inner">
                    {/* Modal Content */}
                    <div className="settings-header-txt">
                        <p>
                            Settings
                        </p>
                    </div>
                    <button id="closeModal" onClick={() => closeSettings()}>Close</button>
                </div>
            </div>

            <nav className="navbar-expand-lg bg-white vh-5 d-flex position-relative topNavBarHP">
                {/* Left */}
                <div className="smallBoxTop rightB cursorPointer contentCenter">
                    <img
                        className="cursorPointer"
                        src={HomePageLogo}
                        alt="Book Icon"
                        onClick={() =>  redirectFunctions.redirectTo('home')}
                    />
                </div>

                {/* Center */}
                <div className="bigBoxTop">
                    <SearchBar/>
                </div>

                {/* Right */}
                <div className="smallBoxTop right0 leftB">
                    <div className="d-flex w-inherit justify-content-evenly p-3-px">
                        <div className="contentCenter p-l-5px cursorPointer ">
                            <img
                                className="rotate mirror-image"
                                src={UserAvatar}
                                alt="User Avatar"
                                onClick={() =>  redirectFunctions.redirectTo('users/profile')}
                            />
                        </div>
                        <div className="contentCenter p-l-5px cursorPointer " id="openModal">
                            <img className="rotate" src={SettingsIcon} alt="Settings Icon" onClick={() => openSettings()}/>
                        </div>
                        <div className="contentCenter p-r-10px cursorPointer">
                            <img src={LogOutIcon} alt="Logout" onClick={() => redirectFunctions.logOut()} />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default TopNavBarComponent;