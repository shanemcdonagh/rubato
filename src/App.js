import './styling/App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Local Components to import

import Lists from './components/pages/lists';

// Bootstrap - Requirements
// Bootstrap - Used to provide CSS styling to Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';


// Allows for dynamic routing and switching between components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/pages/home';
import Diary from './components/pages/diary';
import Profile from './components/pages/profile';
import Sidebar from './components/sidebar';
import Search from './components/pages/search';
import AlbumDetails from './components/albums/albumDetails';
import Login from './components/user/login';
import Register from './components/user/register';
import logo from './images/simplelogo.png';
import Welcome from './components/welcome';

// App class - extends Component class
class App extends Component {
  // Visual content - Method
  render() {
    return (
        <Router>
          <div className="App">

            {/* NavBar - For easy navigation throughout the application */}
            <Navbar expand="lg" variant="dark" sticky="top">
              <img src={logo} style={{ width: '30px', marginLeft: "30px", marginRight: "5px" }} alt='fulllogo' />
              <b>Rubato</b>
            </Navbar>

            <div className='component-view'>
            <div className='sidebar'>
            {/* <Sidebar /> */}
            </div>
             
              {/* Switches between the local components */}
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/lists' element={<Lists />} />
                <Route path='/diary' element={<Diary />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/search' element={<Search />} />
                <Route path='/album/' element={<AlbumDetails />} />
                <Route path='/welcome' element={<Welcome />} />
              </Routes>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
