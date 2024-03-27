import React from 'react';

const BooksComponent = ({ books }) => {
    return (
        <div>
            {books.map((book, index) => (
                <div key={index}>
                    <h3>{book.title /* add error handling for empty title, etc. */}</h3>
                    {/* Check if author_name exists and is an array before joining, otherwise show default text */}
                    <p>{Array.isArray(book.author_name) ? book.author_name.join(', ') : 'Author unknown'}</p>
                    <p>{Array.isArray(book.publish_year) ? book.publish_year.join(', ') : 'Year not available'}</p>
                </div>
            ))}
        </div>
    );
};

export default BooksComponent;
