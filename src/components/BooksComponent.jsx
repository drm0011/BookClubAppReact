import React from 'react';

const handleAddToReadingList = async (bookId) => {
    const userId = process.env.REACT_APP_USER_ID; 
    const response = await fetch(`${process.env.REACT_APP_API_URL}/readinglist/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, bookId }),
    });
  
    if (response.ok) {
      alert('Book added to your reading list!');
    } else {
      alert('Failed to add book to reading list.');
    }
  };

const BooksComponent = ({ books }) => {
    return (
        <div className='books-list'>
            {books.map((book, index) => (
                <div key={index} className='book-item'>
                    <h3>{book.title /* add error handling for empty title, etc. */}</h3>
                    {/* Check if author_name exists and is an array before joining, otherwise show default text */}
                    <p>{Array.isArray(book.author_name) ? book.author_name.join(', ') : 'Author unknown'}</p>
                    <p>{Array.isArray(book.publish_year) ? book.publish_year.join(', ') : 'Year not available'}</p>
                    <p>{book.edition_key[0]}</p>
                    <button onClick={() => handleAddToReadingList(book.id)}>Add to Reading List</button>
                </div>
            ))}
        </div>
    );
};

export default BooksComponent;
