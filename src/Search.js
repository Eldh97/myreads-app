import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi"
class Search extends Component {
  state = {

  }


  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    // explicit binding 
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
      <div className="search-books ">
        <div className="search-books-bar items-center">
          <Link className="text-white text-xl p-4" to="/">
            <FiChevronLeft className="text-3xl cursor-pointer" />
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
