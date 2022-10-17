import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

// App class - extends Component class
class App extends Component {
  // Visual content - Method
  render()
  {  
    return(
      <div className="App">
      <header className="App-header">
        <img src='./simplelogo.png' alt='rubitologo'/>
        <p>
          Rubito
        </p>
        <a>Your taste, your music</a>
      </header>
    </div>
    );
  }
}

export default App;
