import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

class AboutPage extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>AboutPage page</h2>
        </div>
      </div>
    );
  }
}

export default AboutPage;
