import React, { useState } from 'react';
import SearchComponent from './SearchComponent';
import BooksComponent from './BooksComponent';
import LoadingComponent from './LoadingComponent'; 
import '../App.css';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (query) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/books?q=${query}`);
            const data = await response.json();
            setBooks(data.docs); // Adjust according to your API response
        } catch (error) {
            console.error("Failed to fetch books:", error); 
        } finally {
            setIsLoading(false); // End loading
        }
    };


    return (
        <div className='books-page'>
            <h1>Search for Books</h1>
            <SearchComponent onSearch={handleSearch} />
            {isLoading ? (
                <LoadingComponent /> 
            ) : (
                <BooksComponent books={books} />
            )}
        </div>
    );
};

export default BooksPage;
