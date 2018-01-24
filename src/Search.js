import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

export default class Search extends Component {
  state = {
    query: '',
    books: [],
    noBooks: false
  }

  handleChange = (query) => {
    this.setState({query});
    if (!query) return;
    BooksAPI.search(query.trim()).then((books) => {
      if (books.error) books = [];
      const noBooks = books.length === 0;
      this.setState({books, noBooks})
    });
  }

  render() {
    let { shelves, onShelveChange } = this.props;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={this.state.query}
              onChange={(event) => this.handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          {this.state.query && this.state.noBooks &&
          <div className='books-place-holder'>
            <h1>{'No books found'}</h1>
          </div>}
          {this.state.query && this.state.books.length > 0 &&
          <ol className='books-grid'>
            {this.state.books.map((book) => {
              let selectedShelve;
              for (let shelve in shelves){
                let inShelve = shelves[shelve].find((b) => b.id === book.id);
                if (inShelve){
                  selectedShelve = shelve;
                  break;
                }
              }
              return <Book
              key={book.id}
              book={book}
              onShelveChange={onShelveChange}
              shelve={selectedShelve}
            />})}
          </ol>}
        </div>
      </div>
    );
  }
}
