const handleAddToReadingList = async (book) => {
  const userId = 4007;  // Hardcoded user ID for the user who owns the reading list

  // Extract required information from the book object
  const title = book.title || 'Unknown Title';
  const author = Array.isArray(book.author_name) ? book.author_name.join(', ') : 'Author Unknown';
  const publishYear = Array.isArray(book.publish_year) ? book.publish_year[0] : null;  // Take only the first publish year

  // Make the POST request with the necessary data
  const response = await fetch(`${process.env.REACT_APP_API_URL}/add`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userId,  // Include userId
          title,   // Include title
          author,  // Include author
          publishYear,  // Include first publish year
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
      <div className="books-list">
          {books.map((book, index) => (
              <div key={index} className="book-item">
                  <h3>{book.title || 'Unknown Title'}</h3>
                  <p>{Array.isArray(book.author_name) ? book.author_name.join(', ') : 'Author Unknown'}</p>
                  <p>{Array.isArray(book.publish_year) ? book.publish_year.join(', ') : 'Year Not Available'}</p>
                  <button onClick={() => handleAddToReadingList(book)}>Add to Reading List</button>  {/* Pass full book object */}
              </div>
          ))}
      </div>
  );
};

export default BooksComponent;
