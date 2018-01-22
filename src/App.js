import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import Shelves from './Shelves';

class App extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: []
  }

  onShelveChange = (book, shelve, oldShelve) => {
    BooksAPI.update(book, shelve).then(() => this.setState((state) => {
      let stateToSet = {...state};
      stateToSet[shelve].push(book);
      stateToSet[oldShelve] = stateToSet[oldShelve].filter((b) => b.id !== book.id);
      return stateToSet;
    }));
  }

  componentDidMount = () => {
    //This should't have to be done this way but I don't really find a way to get all the books in
    //with this iteration of the backend server nor how to delete a book from a shelve
    let shelvesPromise = BooksAPI.update({id: 'none'}, 'none');
    let booksPromise = BooksAPI.getAll();
    let stateToSet = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
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
    let { currentlyReading, wantToRead, read } = this.state;
    let shelves = {currentlyReading, wantToRead, read}
    return (
      <div className='app'>
        <Route exact path='/' render={() => <Shelves onShelveChange={this.onShelveChange} shelves={shelves} />} />
        <Route path='/search' render={() => <Search onShelveChange={this.onShelveChange} />} />
      </div>
    );
  }
}

export default App;
