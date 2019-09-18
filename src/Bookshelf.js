import React, { Component } from "react";
import Book from "./Book";

class Bookshelf extends Component {
  render() {
    const { books } = this.props;

    const renderedBooks = books.map(book => (
      <Book key = {book.id} book ={book} />
    ));
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {renderedBooks}

            {/* Generate the books here: Book  */}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
