import React, { useEffect, useState } from 'react';
import { RedirectFunctions } from "../../../../js/RedirectFunctions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {

    const navigate = useNavigate();
    const redirectFunctions = RedirectFunctions(navigate);
    const authToken = localStorage.getItem("authToken");

    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const handleSearch = async () => {
        try {
            if (query !== '') {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/api/books/search?query=${query}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                
                setBooks(response.data);
            }
            else {
                setBooks([]);
            }
        } catch (error) {
            setLoading(false);
            // Handle different error statuses here
            console.error("There was an unexpected error with connecting to the API", error);
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            handleSearch();
        }, 500); // Adjust the delay time as needed (milliseconds)

        return () => clearTimeout(delayedSearch);
    }, [query]);

  return (
    <>
        <div className="searchBar">
            <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search by title" value={query} onChange={handleInputChange} />
            {/*{loading ? <p>Loading...</p> : null}*/}
            <div className="results-container">
                {books.length > 0 && (
                    <ul>
                        {books.map((book) => (
                            <li key={book.id} >
                                <span onClick={() => redirectFunctions.redirectToBookPage(book.id)} className="clickable">
                                    {book.title}
                                </span>
                                <br></br>
                                <span onClick={() => redirectFunctions.redirectToMyProfile()} className="clickable">
                                    Author: {book.author_pseudonym}
                                </span>
                                <br></br>
                                <span>ISBN: {book.isbn}</span>
                                {/*<img className="h-inherit w-inherit" src={book.cover_url} alt={`${book.title}'s image`} />*/}
                            </li>
                            // Display other book details as needed
                        ))}
                    </ul>
                )}
                {/* Conditionally render the empty div when books list is empty */}
                {books.length === 0 && query && (
                    <div className="empty-results">No books found</div>
                )}
            </div>
            <button id="searchQuerySubmit" name="searchQuerySubmit">
                <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                    <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
            </button>
        </div>
    </>
  )
}

export default SearchBar