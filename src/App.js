import './styling/App.css';
import React, { Component } from 'react';

// Local Components to import

import Lists from './components/pages/lists';

// Bootstrap - Requirements
// Bootstrap - Used to provide CSS styling to Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Form, Card, Row, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


// Allows for dynamic routing and switching between components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/pages/home';
import Diary from './components/pages/diary';
import Profile from './components/pages/profile';
import Sidebar from './components/sidebar';
import Search from './components/pages/search';

// App class - extends Component class
class App extends Component {
  // Visual content - Method
  render() {
    return (
        <Router>
          <div className="App">

            {/* NavBar - For easy navigation throughout the application */}
            <Navbar expand="lg" variant="dark">
              <img src='./simplelogo.png' style={{ width: '30px', marginLeft: "30px", marginRight: "5px" }} alt='fulllogo' />
              <b>Rubato</b>
            </Navbar>

            <div className='component-view'>
              <Sidebar />

              {/* <header className="App-header">
            <img src='./simplelogo.png' alt='rubitologo' />
            <p>Rubito</p>
            <p>Your taste, your music</p>
          </header> */}

              {/* Switches between the local components */}
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/lists' element={<Lists />} />
                <Route path='/diary' element={<Diary />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/search' element={<Search />} />
              </Routes>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
