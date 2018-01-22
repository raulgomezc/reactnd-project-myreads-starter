import React from 'react';
import { Link } from 'react-router-dom';
import Shelve from './Shelve';
import Book from './Book';

export default function Shelves ({ onShelveChange, shelves }) {
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <Shelve name={'Currently Reading'}>
            {shelves.currentlyReading.map((book) => <Book
              key={book.id}
              book={book}
              shelve={'currentlyReading'}
              onShelveChange={onShelveChange}
            />)}
          </Shelve>
          <Shelve name={'Want to Read'}>
            {shelves.wantToRead.map((book) => <Book
              key={book.id}
              book={book}
              shelve={'wantToRead'}
              onShelveChange={onShelveChange}
            />)}
          </Shelve>
          <Shelve name={'Read'}>
            {shelves.read.map((book) => <Book
              key={book.id}
              book={book}
              shelve={'read'}
              onShelveChange={onShelveChange}
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
