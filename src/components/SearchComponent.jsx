import React, { useState } from 'react';
import '../App.css';

const SearchComponent = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className='search-component'>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books"
                className='search-input'
            />
            <button onClick={handleSearch} className='search-button'>Search</button>
        </div>
    );
};

export default SearchComponent;
