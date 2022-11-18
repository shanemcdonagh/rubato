import './App.css';
import React, { Component } from 'react';

// Local Components to import

import Lists from './components/lists';

// Bootstrap - Requirements
// Bootstrap - Used to provide CSS styling to Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


// Allows for dynamic routing and switching between components
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from './components/home';
import Diary from './components/diary';
import Profile from './components/profile';


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

          {/* NavBar - For easy navigation throughout the application */}
          <Navbar expand="lg" variant="dark" bg="dark">
            <Container className="buttons">
              <Button variant="dark" href="/">Home</Button>
              <Button variant="dark" href="/lists">Lists</Button>
              <Button variant="dark" href="/diary">Diary</Button>
              <Button variant="dark" href="/profile">Profile</Button>
            </Container>
          </Navbar>

          {/* Switches between the local components */}
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/lists' element={<Lists/>} />
            <Route path='/diary' element={<Diary/>} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
