import React from 'react';
import FetchData from "./custom-hooks/FetchData";
import LibraryIcon from "../pictures/hand-drawn-seamless-pattern-book-doodle-elements-education-concept_253081-84.avif"
import ViewButton from "./reusable/components/ViewButton";
import ReviewButton from "./reusable/components/ReviewButton";
const MyLibraryComponent = () => {


    const { data: allLibraries, error: allLibrariesError, loading: allLibrariesLoading } = FetchData("GET", "/libraries/mylibrary", null, null);

    return (
        <div>
            <div className="float-right contentDiv display-block">
                <div className="yourLibraries">
                    <p className="yourLibrariestxt">Your Libraries</p>
                </div>

                <div className="yourLibrariesField">
                    {allLibrariesError && (
                        <div className="error-message">
                            <p>Error: {allLibrariesError.message}</p>
                        </div>
                    )}

                    {allLibraries && allLibraries.length === 0 && !allLibrariesLoading && !allLibrariesError && (
                        <div className="error-message">
                            <p>No libraries found.</p>
                        </div>
                    )}

                    {allLibraries && allLibraries.length > 0 && !allLibrariesLoading && !allLibrariesError && (
                        allLibraries.map(library => (
                            <div className="library-contents w-unset" key={library.id}>
                                <div className="image-holder">
                                    <div className="middle">
                                        <div className="hover-button">
                                            <ViewButton type={"library"} itemId={library.id}/>
                                        </div>
                                        <div className="hover-button">
                                            <ReviewButton type={"library"}/>
                                        </div>
                                    </div>
                                    <img className="h-inherit" src={LibraryIcon} alt="Library" />
                                </div>
                                <div className="info-holder">
                                    <div className="title-holder">
                                        <p>{library.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="rForYou">
                    <p className="rForYoutxt">Recommended for you</p>
                </div>
                <div className="rForYouField"></div>
            </div>
        </div>
    );

};

export default MyLibraryComponent;