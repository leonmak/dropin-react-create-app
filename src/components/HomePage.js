import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

class HomePage extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>HomePage page</h2>
        </div>
      </div>
    );
  }
}

export default HomePage;
