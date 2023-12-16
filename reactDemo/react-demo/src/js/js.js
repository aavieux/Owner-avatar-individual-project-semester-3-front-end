// const openCreateBookBtn = document.getElementById("openModal");
// const closeCreateBookBtn = document.getElementById("closeModal");
// const modalInner = document.getElementById("modal-inner")
//
export function openSettings(){
    const modalex333 = document.getElementById("modal-ex333");
    modalex333.classList.add("open");
}
export function closeSettings(){
    const modalex333 = document.getElementById("modal-ex333");
    modalex333.classList.remove("open");
}
export function openAddLibraryMenu(){
    const modalLibrary = document.getElementById('modal-Library');
    console.log(modalLibrary)
    modalLibrary.classList.add("open");
}
export function closeAddLibraryMenu(){
    const modalLibrary = document.getElementById('modal-Library');
    modalLibrary.classList.remove("open");
}
// export function redirectTo(destination){
//     const navigate = useNavigate();
//     navigate(`/${destination}`)
// }
// export function redirectToLibraryOverview (libraryId) {
//     const navigate = useNavigate();
//     navigate(`/libraries/mylibrary/${libraryId}`);
// }
// export function redirectToBookPage (bookId) {
//     const navigate = useNavigate();
//     navigate(`/books/${bookId}`);
// }
// export function  redirectToProfileOverview (userId){
//     const navigate = useNavigate();
//     navigate(`/users/${userId}`);
// }
// export function redirectToMyProfile() {
//     const navigate = useNavigate();
//     navigate(`/users/profile`);
// }

// export function logOut () {
//     localStorage.removeItem('authToken');
//     redirectTo("login")
// }

//     function redirectToHomePage() {
//     window.location.href = '/';
// }
//     function redirectToMyProfile() {
//             window.location.href = '/users/myprofile'
//     }
//     function redirectToMyLibrary() {
//         window.location.href = '/users/myprofile/mylibrary'
//     }
//     function logOut(){
//         window.location.href = '/logout'
//     }

// var friendBars = document.querySelectorAll(".friend-bar");
// friendBars.forEach(function(friendBar) {
//     friendBar.onclick = function() {
//         var formId = friendBar.getAttribute("data-formid");
//         var userId = friendBar.getAttribute("data-userid");
//         // Set the userId value in the hidden input field of the corresponding form
//         document.getElementById(formId).querySelector("#userIdInput").value = userId;
//
//         // Submit the form
//         document.getElementById(formId).submit();
//     }
// });

// function searchFunction() {
//     var query = document.getElementById("searchQueryInput").value;
//     var searchResultsDiv = document.getElementById("searchResults");
//
//     // Clear previous search results
//     searchResultsDiv.innerHTML = "";
//
//     // Make an AJAX request to the backend
//     fetch(`/books/search?query=${query}`)
//         .then(response => response.json())
//         .then(data => {
//             // Update search results dynamically
//             data.forEach(book => {
//                 var resultDiv = document.createElement("div");
//                 resultDiv.classList.add("searchResult");
//
//                 // Create elements for book image, title, and author
//                 var imageElement = document.createElement("img");
//                 imageElement.src = "book.image";
//                 imageElement.alt = "alt";
//                 imageElement.classList.add("searchResultImage");
//
//                 var infoDiv = document.createElement("div");
//                 infoDiv.classList.add("searchResultInfo");
//                 infoDiv.innerHTML = `<h3>Book Title</h3><p>Book Author</p>`;
//
//                 // Append elements to the result div
//                 resultDiv.appendChild(imageElement);
//                 resultDiv.appendChild(infoDiv);
//
//                 // Append result div to search results container
//                 searchResultsDiv.appendChild(resultDiv);
//             });
//         })
//         .catch(error => console.error("Error:", error));
// }