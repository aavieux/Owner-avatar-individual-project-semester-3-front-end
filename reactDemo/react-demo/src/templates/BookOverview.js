import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {closeAddLibraryMenu, openAddLibraryMenu} from "../js/js";
import data from "bootstrap/js/src/dom/data";

const BookOverviewComponent = () => {
    const authToken = localStorage.getItem("authToken");
    const { bookId } = useParams();
    const [book, setBook] = useState([]);

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
        setLibrariesToBeDeleted(library);
        console.log(librariesToBeDeleted);
        deleteBooksFromLibraries();
        setLibrariesToBeDeleted([]);
        console.log(librariesToBeDeleted);
    }

    useEffect(() => {
        const fetchBook = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/api/books/${bookId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }});
                setBook(response.data);
                if (response.status === 200) {
                    setBook(response.data);// Log the fetched data
                }
                else {
                    console.error(`Unexpected response status: ${response.status}`);
                }
            } catch (error) {

                if (error.response.status === 409){

                    console.error(error.response.data);
                }
                else if (error.response.status === 204){

                    console.error(error.response.data);
                }
                else if (error.response.status === 404){

                    console.error(error.response.data);
                }
                else if (error.response.status === 401){

                    console.error(error.response.data);
                }
                else{
                    console.error("There was an unexpected error with connecting to the API")
                }
            }

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

            // Assuming `book` is defined and has an `id` property
            setLibrariesWithTheBook(librariesResponse.data.filter(library => library.book_ids.includes(book.id)).map(library => ({
                ...library, // Spread the existing library object
                isChecked: 'true' // Add a new key-value pair to each library object
            })));
            setLibrariesWithoutTheBook(librariesResponse.data.filter(library => !library.book_ids.includes(book.id)).map(library => ({
                ...library, // Spread the existing library object
                isChecked: 'false' // Add a new key-value pair to each library object
            })));

        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error fetching libraries:', error);
        }
    };


    const openMenu = async () => {
        openAddLibraryMenu();
        await fetchLibraries(book); // Assuming fetchLibraries is an asynchronous function returning a Promise
    };
    const addBookToLibraries = async () =>{
        try{
            const response = await axios.post(`http://localhost:8080/api/books/${bookId}`, JSON.stringify(librariesToBeAdded.map(library => library.id)), {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                }});
            if (response.status === 200) {
                console.log("Successfully added books!");
                window.location.reload();
            }
            else {
                console.error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {

            if (error.response.status === 409){

                console.error(error.response.data);
            }
            else if (error.response.status === 204){

                console.error(error.response.data);
            }
            else if (error.response.status === 404){

                console.error(error.response.data);
            }
            else if (error.response.status === 401){

                console.error(error.response.data);
            }
            else{
                console.error("There was an unexpected error with connecting to the API")
            }
        }
    }
    const deleteBooksFromLibraries = async () =>{
        // if (librariesToBeDeleted.length !== 0)
        // {
        try{
            const host = 'http://localhost:8080';
            console.log({data: JSON.stringify(librariesToBeDeleted.map(library => library.id))})
            const deleteResponse = await axios.delete(`${host}/api/books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                data: JSON.stringify(librariesToBeDeleted.map(library => library.id)),
            });
            if (deleteResponse.status === 200){
                window.location.reload();

                console.log("Successfully deleted books!");
            }
            else{
                console.log("There was a problem deleting books!");
            }
        }
        catch (error) {

            if (error.response.status === 409) {
                console.error(error.response.data);
            } else if (error.response.status === 204) {

                console.error(error.response.data);
            }
            else if (error.response.status === 403) {

                console.error(error.response.data);
            } else if (error.response.status === 404) {

                console.error(error.response.data);
            } else if (error.response.status === 401) {

                console.error(error.response.data);
            } else {
                console.error("There was an unexpected error with connecting to the API")
            }


        }
        // }
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