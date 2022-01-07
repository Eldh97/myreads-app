import React, { Component } from "react";

class Book extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.generateOptions = this.generateOptions.bind(this);
  }
  handleChange(e) {
    const shelf = e.target.value;
    this.props.updateBookShelf(this.props.book, shelf);
  }
  generateOptions() {}
  render() {
    const { authors, title, imageLinks, shelf } = this.props.book;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  imageLinks ? imageLinks.thumbnail : "none"
                })`
              }}
            ></div>
            <div className="book-shelf-changer ">
              <select value={shelf} onChange={this.handleChange}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">
            {authors &&
              authors.map(author => (
                <span style={{ display: "block" }} key={author}>
                  {author}
                </span>
              ))}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
