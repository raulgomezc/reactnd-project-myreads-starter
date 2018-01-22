import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelve from './Shelve';
import Book from './Book';

export default class Shelves extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount = () => {
    //This should't have to be done this way but I don't really find a way to get all the books in
    //with this iteration of the backend server nor how to delete a book from a shelve
    let shelvesPromise = BooksAPI.update({id: 'none'}, 'none');
    let booksPromise = BooksAPI.getAll();
    let stateToSet = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
    Promise.all([shelvesPromise, booksPromise]).then((data) => {
      let shelves = data[0];
      let books = data[1]
      books.map((book) => {
        if (shelves.currentlyReading.find(id => id === book.id)) return stateToSet.currentlyReading.push(book);
        if (shelves.wantToRead.find(id => id === book.id)) return stateToSet.wantToRead.push(book);
        if (shelves.read.find(id => id === book.id)) return stateToSet.read.push(book);
        return null;
      });
      this.setState(stateToSet);
    });
  }

  render() {
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <Shelve name={'Currently Reading'}>
              {this.state.currentlyReading.map((book) => <Book
                key={book.id}
                title={book.title}
                authors={book.authors}
                image={book.imageLinks.thumbnail}
                shelve={'currentlyReading'}
              />)}
            </Shelve>
            <Shelve name={'Want to Read'}>
              {this.state.wantToRead.map((book) => <Book
                key={book.id}
                title={book.title}
                authors={book.authors}
                image={book.imageLinks.thumbnail}
                shelve={'wantToRead'}
              />)}
            </Shelve>
            <Shelve name={'Read'}>
              {this.state.read.map((book) => <Book
                key={book.id}
                title={book.title}
                authors={book.authors}
                image={book.imageLinks.thumbnail}
                shelve={'read'}
              />)}
            </Shelve>
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
 }
}
