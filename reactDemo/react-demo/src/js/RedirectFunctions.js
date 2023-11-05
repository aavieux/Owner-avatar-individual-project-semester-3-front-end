import { useNavigate } from "react-router-dom";

export function RedirectFunctions(navigate) {


    return {
        redirectTo: (destination) => navigate(`/${destination}`),
        redirectToLibraryOverview: (libraryId) =>
            navigate(`/libraries/mylibrary/${libraryId}`),
        redirectToBookPage: (bookId) => navigate(`/books/${bookId}`),
        redirectToProfileOverview: (userId) => navigate(`/users/${userId}`),
        redirectToMyProfile: () => navigate(`/users/profile`),
        logOut: () => {
            localStorage.removeItem('authToken');
            navigate("/login");
        },
    };
}