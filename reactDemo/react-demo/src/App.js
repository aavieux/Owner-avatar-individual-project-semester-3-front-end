import './pre-made/App.css';
import LoginComponent from "./templates/LoginPage";
import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import HomePageComponent from "./templates/HomePage";
import MyProfileComponent from "./templates/MyProfile";
import './css/index.css';
import "./css/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileOverviewComponent from "./templates/ProfileOverview";
import MyLibraryComponent from "./templates/MyLibrary";
import BooksFromLibraryComponent from "./templates/BooksFromLibrary";
import BookOverviewComponent from "./templates/BookOverview";
import TopNavBarComponent from "./templates/reusable/TopNavBar";
import LeftNavBarComponent from "./templates/reusable/LeftNavBar";
import FriendBarComponent from "./templates/reusable/FriendsBar";
import {isAuthenticated} from "./templates/custom-hooks/authHelper";
import SettingsOverview from "./templates/SettingsOverview";

const App = () => {
    // const { isAuthenticated } = useContext(AuthContext);
    const isLoggedIn = isAuthenticated();
    // if (!isLoggedIn) {
    //     navigate('/login');
    // }

    return (
        <Router>
            {isLoggedIn && <TopNavBarComponent />}
            <Routes>
                {!isLoggedIn && <Route path="/" element={<Navigate to="/login" />} />}
                {isLoggedIn && <Route path="/" element={<Navigate to="/home" />} />}
                {isLoggedIn && <Route path="/home" element={<HomePageComponent />} />}
                {isLoggedIn && <Route path="/users/profile" element={<MyProfileComponent />} />}
                {isLoggedIn && <Route path="/users/profile/settings" element={<SettingsOverview />} />}
                {!isLoggedIn && <Route path="/login" element={<LoginComponent />} />}
                {isLoggedIn && <Route path="/users/:userId" element={<ProfileOverviewComponent />} />}
                {isLoggedIn && <Route path="/libraries/mylibrary" element={<MyLibraryComponent />} />}
                {isLoggedIn && <Route path="/libraries/mylibrary/:libraryId" element={<BooksFromLibraryComponent />} />}
                {isLoggedIn && <Route path="/books/:bookId" element={<BookOverviewComponent />} />}
            </Routes>
            {isLoggedIn && <LeftNavBarComponent />}
            {isLoggedIn && <FriendBarComponent />}
        </Router>
    );
}

export default App;
