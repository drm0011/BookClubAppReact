import React, { useState } from 'react';
import SearchComponent from './SearchComponent';
import BooksComponent from './BooksComponent';

const BooksPage = () => {
    const [books, setBooks] = useState([]);

    const handleSearch = async (query) => {
        // Replace 'yourPort' with the actual port number your backend server is running on.
        const response = await fetch(`${process.env.REACT_APP_API_URL}/books?q=${query}`);
        const data = await response.json();
        setBooks(data.docs); // Adjust according to your API response
    };

    return (
        <div>
            <h1>Search for Books</h1>
            <SearchComponent onSearch={handleSearch} />
            <BooksComponent books={books} />
        </div>
    );
};

export default BooksPage;
