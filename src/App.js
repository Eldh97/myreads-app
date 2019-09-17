import React from "react";
import * as BooksAPI from './BooksAPI'
import "./App.css";
import Bookshelf from "./Bookshelf";
import CreateBook from "./CreateBook";

class BooksApp extends React.Component {

  state = {
    
  };
  
  componentDidMount(){
    BooksAPI.getAll()
    .then(books => {
      console.log(books);
    })
  }
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf />
              <Bookshelf />
              <Bookshelf />
              {/* <CreateBook/> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
