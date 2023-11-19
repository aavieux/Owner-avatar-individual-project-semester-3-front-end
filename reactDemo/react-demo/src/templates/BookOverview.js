import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {closeAddLibraryMenu, openAddLibraryMenu} from "../js/js";
import useFetchData from "./custom-hooks/FetchDataHook";

const BookOverviewComponent = () => {

    const {bookId} = useParams();
    const {book, bookError, bookLoading} = useFetchData("GET", "/books/${bookId}", null, null)

    const {libraries, librariesError, librariesLoading} = useFetchData("GET", "/libraries/mylibrary", null, null)
    //TODO get libraries /libraries/mylibrary

    // setLibrariesWithTheBook(librariesResponse.data.filter(library => library.book_ids.includes(book.id)).map(library => ({
    //     ...library, // Spread the existing library object
    //     isChecked: 'true' // Add a new key-value pair to each library object
    // })));
    // setLibrariesWithoutTheBook(librariesResponse.data.filter(library => !library.book_ids.includes(book.id)).map(library => ({
    //     ...library, // Spread the existing library object
    //     isChecked: 'false' // Add a new key-value pair to each library object
    // })));

    const [librariesWithTheBook, setLibrariesWithTheBook] = useState([]);
    const [librariesWithoutTheBook, setLibrariesWithoutTheBook] = useState([]);

    const [librariesToBeAdded, setLibrariesToBeAdded] = useState([]);
    const [librariesToBeDeleted, setLibrariesToBeDeleted] = useState([]);

    const handleCheckboxChange = (library) => {
        if (librariesToBeAdded.includes(library)) {
            setLibrariesToBeAdded(librariesToBeAdded.filter((item) => item !== library));
        } else {
            setLibrariesToBeAdded([...librariesToBeAdded, library]);
        }
    }
    const handleCheckboxChangeDelete = (library) => {
        // if (librariesToBeDeleted.includes(library)) {
        //     setLibrariesToBeDeleted(librariesToBeDeleted.filter((item) => item !== library));
        // } else {
        //     setLibrariesToBeDeleted([...librariesToBeDeleted, library]);
        // }
        setLibrariesToBeDeleted(prevList => [...prevList, library]);
        console.log(librariesToBeDeleted);
        deleteBooksFromLibraries();
        setLibrariesToBeDeleted([]);
        console.log(librariesToBeDeleted);
    }


    const openMenu = async () => {
        openAddLibraryMenu();// Assuming fetchLibraries is an asynchronous function returning a Promise
    };
    const addBookToLibraries = () => {
        // Using the custom hook 'useFetchData' within the functional component
        const { data: result, error: currentError } = useFetchData(
            "POST", `/books/${bookId}`, // Ensure 'bookId' is defined in your component
            {'Content-Type': 'application/json'},
            JSON.stringify(librariesToBeAdded.map(library => library.id))
        );
        if (result.status === 200){

            window.location.reload();

            console.log("Successfully added books!");
        }
        else{
            console.log("There was a problem adding the books!");
        }
        //TODO error check
    }
    const deleteBooksFromLibraries = async () => {

        const {data: result, error: currentError} = useFetchData(
            "DELETE", `/books/${bookId}`,
            null,
            JSON.stringify(librariesToBeDeleted.map(library => library.id))
        );
        if (result.status === 200) {

            window.location.reload();

            console.log("Successfully deleted books!");
        } else {
            console.log("There was a problem deleting books!");
        }
        return { result, currentError };
    }

    return (
        <>
            <div className="modal-Library" id="modal-Library">
                <div className="modal-library-inner" id="modal-library-inner">
                    <div className="settings-header-txt">
                        <p>
                            Add Book to Library
                        </p>
                    </div>

                    <div className="bigDiv">
                        <div className="scrollableDiv">
                            {librariesWithTheBook.map((library) => (
                                <div key={library.id} className="libraryDiv">
                                    <div className="libraryName">{library.title}</div>
                                    <div className="checkboxContainer">
                                        <input
                                            type="button"
                                            value = "Remove"
                                            checked={library.isChecked}
                                            onClick={() => handleCheckboxChangeDelete(library)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="scrollableDiv">
                            {librariesWithoutTheBook.map((library) => (
                                <div key={library.id} className="libraryDiv">
                                    <div className="libraryName">{library.title}</div>
                                    <div className="checkboxContainer">
                                        <input
                                            type="checkbox"
                                            checked={librariesToBeAdded.includes(library)}
                                            onChange={() => handleCheckboxChange(library)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="buttonsField">
                        <button id="closeModalLibrary" onClick={() => (closeAddLibraryMenu())}>Close</button>
                        <button id="closeModalLibrary" onClick={() => addBookToLibraries() }>Save</button>
                    </div>

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
        </>
    );
};

export default BookOverviewComponent;