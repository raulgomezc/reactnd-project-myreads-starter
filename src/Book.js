import React from 'react';

export default function Book(props) {
  return (
    <li key={props.id}>
      <div className='book'>
        <div className='book-top'>
          <img className='book-cover' src={props.image } alt={`Cover for ${props.title}`} />
          <div className='book-shelf-changer'>
            <select defaultValue={props.shelve}>
              <option value='none' disabled>Move to...</option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{props.title}</div>
        <div className='book-authors'>{props.authors ? props.authors.join(', ') : 'Unkwon writers'}</div>
      </div>
    </li>
  );
}

