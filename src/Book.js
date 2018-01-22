import React from 'react';

export default function Book({ book, shelve, onShelveChange }) {
  let selectedShelve = shelve ? shelve : 'none';
  return (
    <li>
      <div className='book'>
        <div className='book-top'>
          <img className='book-cover' src={book.imageLinks.thumbnail } alt={`Cover for ${book.title}`} />
          <div className='book-shelf-changer'>
            <select defaultValue={selectedShelve} onChange={(event) => onShelveChange(book, event.target.value, selectedShelve)}>
              <option value='none' disabled>Move to...</option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{book.title}</div>
        <div className='book-authors'>{book.authors ? book.authors.join(', ') : 'Unkwon writers'}</div>
      </div>
    </li>
  );
}

