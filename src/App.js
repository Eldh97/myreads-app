import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Bookshelf";
import { Route, Link } from "react-router-dom";
import Search from "./Search";
import { BsBook } from "react-icons/bs"
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      searchedBooks: [],
      queryError: false
    };
    this.updateShelf = this.updateShelf.bind(this);
    this.updateBookShelf = this.updateBookShelf.bind(this);
    this.search = this.search.bind(this);
    this.getBook = this.getBook.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.updateShelf(books);
    });
  }

  updateShelf(newAllBooks) {
    this.setState(currState => ({ allBooks: newAllBooks }));
  }
  async updateBookShelf(book, shelf) {
    await BooksAPI.update(book, shelf);
    let isSearch = false;
    const newAllBooks = this.state.allBooks.map(b => {
      if (b.title === book.title) {
        isSearch = true;
        return { ...book, shelf: shelf };
      }
      return b;
    });
    if (isSearch) this.updateShelf(newAllBooks);
    else this.updateShelf([...newAllBooks, { ...book, shelf: shelf }]);
  }

  async search(query) {
    try {
      if (query.trim() === "") throw Error("Not Found");
      const books = await BooksAPI.search(query);
      let newSearchedBooks = books.map(b => {
        return b;
      });

      // Get the information of the shelf
      newSearchedBooks = newSearchedBooks.map(b =>
        this.getBook(b.id).then(book => book)
      );

      // Convert an array of promises
      newSearchedBooks = await Promise.all(newSearchedBooks);

      this.setState(currentState => ({
        searchedBooks: newSearchedBooks,
        queryError: false
      }));
    } catch (error) {
      if (!this.state.queryError) {
        this.setState({ searchedBooks: [], queryError: true });
      }
    }
  }

  async getBook(id) {
    const book = await BooksAPI.get(id);
    return book;
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-content">
            <div className="p-4 text-center text-white mb-10 from-pink-600 w-full to-red-800 bg-gradient-to-l">
              <h1 className="text-2xl font-bold flex items-center justify-center">
                <BsBook className="mr-4" />
                <span>Books Cafe</span>
              </h1>
            </div>
            <div>
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <Bookshelf
                      heading={"Currently Reading"}
                      books={this.state.allBooks.filter(
                        book => book.shelf === "currentlyReading"
                      )}
                      updateBookShelf={this.updateBookShelf}
                    />
                    <Bookshelf
                      heading={"Want to Read"}
                      books={this.state.allBooks.filter(
                        book => book.shelf === "wantToRead"
                      )}
                      updateBookShelf={this.updateBookShelf}
                    />
                    <Bookshelf
                      heading={"Read"}
                      books={this.state.allBooks.filter(
                        book => book.shelf === "read"
                      )}
                      updateBookShelf={this.updateBookShelf}
                    />
                    <Link to="/search/" className="fixed bottom-3 right-3 rounded-full shadow-2xl from-pink-600 
                     to-red-800 bg-gradient-to-l text-white w-14 h-14 flex items-center justify-center text-2xl font-bold ">
                      <button>+</button>
                    </Link>
                  </>
                )}
              />
            </div>
          </div>
          <Route
            exact
            path="/search"
            render={() => (
              <>
                <Search search={this.search}>
                  {!this.state.queryError ? (
                    <Bookshelf
                      heading={"Search Books"}
                      books={this.state.searchedBooks}
                      updateBookShelf={this.updateBookShelf}
                    />
                  ) : (
                    <h2 style={{ textAlign: "center" }}>Not Found</h2>
                  )}
                </Search>
              </>
            )}
          />
        </div>
      </div>
    );
  }
}

export default BooksApp;
