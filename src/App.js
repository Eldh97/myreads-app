import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Bookshelf";
import { Route, Link } from "react-router-dom";
import Search from "./Search";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      currentlyReadBooks: [],
      readBooks: [],
      wantToReadBooks: []
    };
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books);
    });
  }
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-content">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div>
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <Bookshelf />
                    <Bookshelf />
                    <Bookshelf />
                    <Link to="/search/" className="open-search">
                      <button>Add a book</button>
                    </Link>
                  </>
                )}
              />
            </div>
          </div>
          <Route exact path="/search" component={Search} />
        </div>
      </div>
    );
  }
}

export default BooksApp;
