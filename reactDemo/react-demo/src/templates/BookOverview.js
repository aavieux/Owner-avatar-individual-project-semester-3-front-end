import TopNavBarComponent from "./reusable/TopNavBarFrag";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import LeftNavBarComponent from "./reusable/LeftNavBarFrag";
import FriendBarComponent from "./reusable/FriendBarFrag";
import {closeAddLibraryMenu, openAddLibraryMenu} from "../js/js";

const BookOverviewComponent = () => {
    const authToken = localStorage.getItem("authToken");
    const { bookId } = useParams();
    const [book, setBook] = useState([]);

    const [allLibraries, setAllLibraries] = useState([]);

    const [librariesWithTheBook, setLibrariesWithTheBook] = useState([]);
    const [librariesWithoutTheBook, setLibrariesWithoutTheBook] = useState([]);
    const [checkedLibraries, setCheckedLibraries] = useState([]);
    const handleCheckboxChange = (library) => {
        if (checkedLibraries.includes(library)) {
            setCheckedLibraries(checkedLibraries.filter((item) => item !== library));
        } else {
            setCheckedLibraries([...checkedLibraries, library]);
        }
    }

    useEffect(() => {
        const fetchBook = async () => {
            const response = await axios.get(`http://localhost:8080/api/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }});
            setBook(response.data);

        };
        fetchBook();
    }, [bookId]);
    const fetchLibraries = async (book) => {
        try {
            const librariesResponse = await axios.get(`http://localhost:8080/api/libraries/mylibrary`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            await setAllLibraries(librariesResponse.data);

            // Assuming `book` is defined and has an `id` property
            setLibrariesWithTheBook(librariesResponse.data.filter(library => library.book_ids.includes(book.id)));
            setLibrariesWithoutTheBook(librariesResponse.data.filter(library => !library.book_ids.includes(book.id)));

        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error fetching libraries:', error);
        }
    };
    // const checkLibrariesForBook = (libraries) => {
    //     const librariesWithBooks = libraries.map(library => {
    //         const bookExistsInLibrary = library.book_ids.some(id => id === book.id);
    //         return { library, bookExists: bookExistsInLibrary };
    //     });
    //     setLibrariesWithTheBookHashTable(librariesWithBooks);
    //     console.log("TUKA TUKA ");
    //     console.log(librariesWithTheBookHashTable);
    //     console.log("TUKA TUKA ");
    // };

    const openMenu = async () => {
        openAddLibraryMenu();
        await fetchLibraries(book); // Assuming fetchLibraries is an asynchronous function returning a Promise
    };


    return (
        <>
            <TopNavBarComponent/>
            <div className="modal-Library" id="modal-Library">
                <div className="modal-library-inner" id="modal-library-inner">
                    {/* Modal Content */}
                    <div className="settings-header-txt">
                        <p>
                            Add Book to Library
                        </p>
                    </div>

                    <div className="bigDiv">
                        <div className="scrollableDiv">
                            {/*<div>  </div>*/}
                            {librariesWithTheBook.map((library) => (
                                <div key={library.id} className="libraryDiv">
                                    <div className="libraryName">{library.title}</div>
                                    <div className="checkboxContainer">
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            onChange={() => handleCheckboxChange(library)}
                                        />
                                    </div>
                                </div>
                            ))}
                            {librariesWithoutTheBook.map((library) => (
                                <div key={library.id} className="libraryDiv">
                                    <div className="libraryName">{library.title}</div>
                                    <div className="checkboxContainer">
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            onChange={() => handleCheckboxChange(library)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    <button id="closeModalLibrary" onClick={() => (closeAddLibraryMenu())}>Close</button>
                    <button onClick={() => console.log(librariesWithTheBook)}>Submit</button>
                </div>
            </div>
            <div className="float-right contentDiv contentDivBookPreview display-block">
                <div className="book-preview">
                    <img className="book-cover" src={book.cover_url} alt="Book Cover"/>
                        <div className="book-details">
                            <h1>{book.title}</h1>
                            <p>Author: {book.author_pseudonym}</p>
                            <p>Genre: {book.genre}</p>
                            <p>ISBN: {book.isbn}</p>
                            <button className="library-button" onClick={() => (openMenu())}>Add to Library</button>
                            <button className="read-button">Read Now</button>
                        </div>
                </div>
            </div>
            <LeftNavBarComponent/>
            <FriendBarComponent/>

        </>
    );
};

export default BookOverviewComponent;