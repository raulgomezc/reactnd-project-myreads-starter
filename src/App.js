import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI';
import Search from './Search';
import Shelves from './Shelves';

class App extends Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={Shelves}/>
        <Route path='/search' component={Search}/>
      </div>
    );
  }
}

export default App;
