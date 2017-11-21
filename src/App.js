import React, { Component } from 'react';

import Header from './components/Header';
import FooterCo from './components/Footer';
import Main from './components/Main';


import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <FooterCo />
      </div>
    );
  }
}

export default App;
