import React from 'react';

export default function Shelve (props) {
  return (
    <div className='bookshelf' key={props.id}>
      <h2 className='bookshelf-title'>{props.name}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {props.children}
        </ol>
      </div>
    </div>
  );
}
