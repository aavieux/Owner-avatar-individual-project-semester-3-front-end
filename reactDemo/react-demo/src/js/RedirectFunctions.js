import { useNavigate } from "react-router-dom";

export function RedirectFunctions() {
    const navigate = useNavigate();
    return {
        redirectTo: (destination) => navigate(`/${destination}`),
        redirectToLibraryOverview: (libraryId) =>
            navigate(`/libraries/mylibrary/${libraryId}`),
        redirectToBookPage: (bookId) => navigate(`/books/${bookId}`),
        redirectToProfileOverview: (userId) => navigate(`/users/${userId}`),
        redirectToMyProfile: () => {
            navigate(`/users/profile`);
            window.location.reload();
        }
        ,
        logOut: () => {
            localStorage.removeItem('authToken');
            navigate("/login");
            window.location.reload();
        },
    };
}