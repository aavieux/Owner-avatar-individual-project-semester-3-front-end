import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {closeAddLibraryMenu, openAddLibraryMenu} from "../../js/js";
import FetchData from "../custom-hooks/FetchData";

const BookOverviewComponent = () => {

    const {bookId} = useParams();
    const {data: book, error: bookError, loading: bookLoading } = FetchData("GET", `/books/${bookId}`, null, null);
    const {data: libraries, error: librariesError, loading: librariesLoading} = FetchData("GET", "/libraries/mylibrary", null, null);

    const [librariesWithTheBook, setLibrariesWithTheBook] = useState([]);
    const [librariesWithoutTheBook, setLibrariesWithoutTheBook] = useState([]);

    const [librariesToBeAdded, setLibrariesToBeAdded] = useState([]);
    const [librariesToBeDeleted, setLibrariesToBeDeleted] = useState([]);

    const [librariesToBeAddedTemp, setLibrariesToBeAddedTemp] = useState([]);
    const [librariesToBeDeletedTemp, setLibrariesToBeDeletedTemp] = useState([]);


    useEffect(() => {
        if (libraries && Array.isArray(libraries)) {
            setLibrariesWithTheBook(
                libraries
                    .filter(library => library.book_ids.includes(book.id))
                    .map(library => ({
                        ...library,
                        isChecked: true // Use boolean value instead of string
                    }))
            );

            setLibrariesWithoutTheBook(
                libraries
                    .filter(library => !library.book_ids.includes(book.id))
                    .map(library => ({
                        ...library,
                        isChecked: false // Use boolean value instead of string
                    }))
            );
        }
    }, [libraries]);

    useEffect(() => { // Add libraries
        const {data: data, error: error, loading: loading} = FetchData("POST", `/books/${bookId}`, {'Content-Type': 'application/json'},
            JSON.stringify(librariesToBeAdded.map(library => library.id)));
        if (data.status === 200) {

            window.location.reload();
            console.log("Successfully added books!");
        }
        else{
            console.log("There was a problem adding the books!");
        }
        // //TODO error check
    }, [librariesToBeAdded]);

    useEffect(() => { // Delete Libraries
        // const {data, error, loading} = FetchData("DELETE", `/books/${bookId}`,null, JSON.stringify(librariesToBeDeleted.map(library => library.id)));
        // if (data.status === 200) {
        //
        //     window.location.reload();
        //     console.log("Successfully deleted books!");
        // }
        // else{
        //     console.log("There was a problem deleting the books!");
        // }
        // //TODO error check
    }, [librariesToBeDeleted]);

    const handleAddMethod = async () =>{
        setLibrariesToBeAdded(librariesToBeAddedTemp);
        // setLibrariesToBeDeletedTemp([]);

    };
    const handleCheckboxChange = (library) => {
        if (librariesToBeAddedTemp.includes(library)) {
            setLibrariesToBeAddedTemp(librariesToBeAddedTemp.filter((item) => item !== library));
        } else {
            setLibrariesToBeAddedTemp([...librariesToBeAddedTemp, library]);
        }
    }
    const openMenu = async () => {
        openAddLibraryMenu();// Assuming fetchLibraries is an asynchronous function returning a Promise
    };

    return (
        <>
            {book ? (
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
                                                    // onClick={() => handleCheckboxChangeDelete(library)}
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
                                                    checked={librariesToBeAddedTemp.includes(library)}
                                                    onChange={() => handleCheckboxChange(library)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="buttonsField">
                                <button id="closeModalLibrary" onClick={() => (closeAddLibraryMenu())}>Close</button>
                                <button id="closeModalLibrary" onClick={() => handleAddMethod() }>Save</button>
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
            ) : (
                <div className="float-right contentDiv contentDivBookPreview display-block">
                    <div className="book-preview">
                        <div>Invalid book</div>
                    </div>
                </div>

            )}
        </>
    );
};

export default BookOverviewComponent;