import React from 'react';
import {jwtDecode} from 'jwt-decode';

const getCoverImage = (coverId) => {
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://via.placeholder.com/150';
};

const handleAddToReadingList = async (book) => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to be logged in to add books to your reading list.');
        return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken ? decodedToken.nameid : null;
    
    if (!userId) {
        alert('Invalid user token. Please log in again.');
        return;
    }

    // Extract required information from the book object
    const title = book.title || 'Unknown Title';
    const author = Array.isArray(book.author_name) ? book.author_name.join(', ') : 'Author Unknown';
    const publishYear = Array.isArray(book.publish_year) ? book.publish_year[0] : null;  // Take only the first publish year

    // Make the POST request with the necessary data
    const response = await fetch(`${process.env.REACT_APP_API_URL}/readinglist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            userId,  
            title,
            author,  
            publishYear,  
        }),
    });

    if (response.ok) {
        alert('Book added to your reading list!');
    } else {
        alert('Failed to add book to reading list.');
    }
};

const BooksComponent = ({ books }) => {
    return (
        <div className="row">
            {books.map((book, index) => (
                <div key={index} className="col-md-4 mb-4">
                    <div className="card">
                        <img src={getCoverImage(book.cover_i)} className="card-img-top" alt={book.title || 'Unknown Title'} />
                        <div className="card-body">
                            <h5 className="card-title">{book.title || 'Unknown Title'}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{Array.isArray(book.author_name) ? book.author_name.join(', ') : 'Author Unknown'}</h6>
                            <p className="card-text">{Array.isArray(book.publish_year) ? book.publish_year.join(', ') : 'Year Not Available'}</p>
                            <button onClick={() => handleAddToReadingList(book)} className="btn btn-primary">Add to Reading List</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BooksComponent;
