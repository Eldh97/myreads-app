import React from "react";
import Book from "./Book";

const Bookshelf = ({ heading, books, updateBookShelf }) => {
  const renderedBooks = books.map(book => (
    <Book key={book.id} book={book} updateBookShelf={updateBookShelf} />
  ));

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title text-xl font-semibold">{heading}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{renderedBooks}</ol>
      </div>
    </div>
  );
};

export default Bookshelf;
