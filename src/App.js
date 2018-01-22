import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Search from './Search';
import Shelves from './Shelves';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Route exact path='/' component={Shelves}/>
        <Route path='/search' component={Search}/>
      </div>
    );
  }
}

export default App;
