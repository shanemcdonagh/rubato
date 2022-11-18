import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

// Local Components to import

// Allows for dynamic routing and switching between components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// App class - extends Component class
class App extends Component {
  // Visual content - Method
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src='./simplelogo.png' alt='rubitologo' />
            <p>
              Rubito
            </p>
            <a>Your taste, your music</a>
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
