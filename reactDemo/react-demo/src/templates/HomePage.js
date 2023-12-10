import React from 'react';
import FetchData from "./custom-hooks/FetchData";
import ViewButton from "./reusable/components/ViewButton";
import ReviewButton from "./reusable/components/ReviewButton";

const HomePageComponent = () =>{

    // useEffect(() => {
    //     const fetchBooks = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/api/books`, {
    //                 headers: {
    //                     Authorization: `Bearer ${authToken}`
    //                 }
    //             });
    //             if (response.status === 200) {
    //                 setAllBooks(response.data);// Log the fetched data
    //             }
    //             else {
    //                 console.error(`Unexpected response status: ${response.status}`);
    //             }
    //         } catch (error) {
    //
    //             if (error.response.status === 409){
    //
    //                 console.error(error.response.data);
    //             }
    //             else if (error.response.status === 204){
    //
    //                 console.error(error.response.data);
    //             }
    //             else if (error.response.status === 404){
    //
    //                 console.error(error.response.data);
    //             }
    //             else if (error.response.status === 401){
    //
    //                 console.error(error.response.data);
    //             }
    //             else{
    //                 console.error("There was an unexpected error with connecting to the API")
    //             }
    //         }
    //     };
    //     fetchBooks();
    // }, [authToken]); // us
    const { data: allBooks, error: errorBooks, loading: loadingBooks } = FetchData("GET", "/books", null, null);

    return (
        <>
            {/* CENTER */}
            <div className="float-right contentDiv display-block">
                <div className="rAdded">
                    <p className="rAddedtxt">Recently added</p>
                </div>

                <div className="rAddedField">
                    {errorBooks && (
                        <div className="error-message">
                            <p>Error: {errorBooks.message}</p>
                        </div>
                    )}

                    {allBooks && allBooks.length === 0 && !loadingBooks && !errorBooks && (
                        <div className="error-message">
                            <p>No books found.</p>
                        </div>
                    )}

                    {allBooks && allBooks.length > 0 && !loadingBooks && !errorBooks && (
                        allBooks.map((book) => (
                            <div className="book-contents" key={book.id}>
                                <div className="image-holder">
                                    <div className="middle">
                                        <div className="hover-button">
                                            <ViewButton type={"book"} itemId={book.id}/>
                                        </div>
                                        <div className="hover-button">
                                           <ReviewButton type={"book"}/>
                                        </div>
                                    </div>
                                    <img className="h-inherit w-inherit" src={book.cover_url} alt={`${book.title}'s image`} />
                                </div>

                                <div className="info-holder">
                                    <div className="title-holder">
                                        <p>{book.title}</p>
                                    </div>

                                    <div className="author-txt">
                                        <div className="highlight"></div>
                                        <span>{book.shadowprofile_id}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="rForYou">
                    <p className="rForYoutxt">Recommended for you</p>
                </div>
                <div className="rForYouField">{/* Recommended books go here */}</div>
            </div>
        </>
    );

};
export default HomePageComponent;