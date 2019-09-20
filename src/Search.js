import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState(() => {
      if (value.trim()) this.props.search(value);
      return { query: value };
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.query) this.props.search(this.state.query.trim());
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.query}
                placeholder="Search by title or author"
                onChange={e => this.handleChange(e)}
              />
            </form>
          </div>
        </div>
        {this.state.query && this.props.children}
      </div>
    );
  }
}

export default Search;
