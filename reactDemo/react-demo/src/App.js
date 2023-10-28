import './pre-made/App.css';
import LoginComponent from "./templates/LoginPage";
import React, {useContext} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import HomePageComponent from "./templates/HomePage";
import MyProfileComponent from "./templates/MyProfile";

import './css/index.css';
import "./css/styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileOverviewComponent from "./templates/ProfileOverview";
import MyLibraryComponent from "./templates/MyLibrary";
import BooksFromLibraryComponent from "./templates/BooksFromLibrary";
import BookOverviewComponent from "./templates/BookOverview";
import {AuthContext} from "./templates/Authentication/AuthProvider";
import PrivateRoute from "./templates/Authentication/PrivateRoute";

const App = () => {
    // const { isAuthenticated } = useContext(AuthContext);
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePageComponent />} />
          <Route path="/users/profile" element={<MyProfileComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/users/:userId" element={<ProfileOverviewComponent/>} />
            <Route path="/libraries/mylibrary" element={<MyLibraryComponent/>}/>
            <Route path ="/libraries/mylibrary/:libraryId" element={<BooksFromLibraryComponent/>}/>
            <Route path = "/books/:bookId" element={<BookOverviewComponent/>}/>

        </Routes>
      </Router>
  );
}

export default App;
