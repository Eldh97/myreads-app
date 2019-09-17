import React, { Component } from "react";
import Book from './Book';

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              <Book/>
              <Book/>
              <Book/>

            {/* Generate the books here: Book  */}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
