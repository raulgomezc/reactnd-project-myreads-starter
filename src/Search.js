import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

export default class Search extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  handleSubmit = () => {
    BooksAPI.search(this.state.query).then((books) => this.setState({books}));
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              onKeyPress={((event) => {
                if (event.key === 'Enter') {
                  this.handleSubmit();
                }
              })}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => <Book
              key={book.id} title={book.title}
              authors={book.authors}
              image={book.imageLinks.thumbnail}
            />)}
          </ol>
        </div>
      </div>
    );
  }
}
