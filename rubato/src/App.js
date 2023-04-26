import './styling/App.css';
import React, { Component, useEffect } from 'react';

// Local Components to import
import Lists from './components/pages/lists';
import { Navbar } from 'react-bootstrap';

// Allows for dynamic routing and switching between components
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import Home from './components/pages/home';
import Diary from './components/pages/diary';
import Profile from './components/pages/profile';
import Sidebar from './components/misc/sidebar';
import Search from './components/pages/search';
import AlbumDetails from './components/albums/albumDetails';
import Login from './components/user/login';
import Register from './components/user/register';
import logo from './images/simplelogo.png';
import Welcome from './components/user/welcome';
import GenreAlbums from './components/genres/genreartists';
import ArtistAlbums from './components/genres/artistalbums';
import ListenListAlbums from './components/listenlists/listenlistalbums';


// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
// App class - extends Component class
class App extends Component {
  // Check if the user is logged in, determines the state of the application

  constructor(props) {
    super(props);
    this.state = { userLoggedIn: false };
    this.updateLoginState = this.updateLoginState.bind(this);
  }

  componentDidMount() {
    console.log(this.state.userLoggedIn)
    const token = localStorage.getItem('token')

    if (token) {
      const user = decodeToken(token)
      console.log(user)

      if (!user) {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        this.setState({ userLoggedIn: false });
      }
      else {
        this.setState({ userLoggedIn: true });
      }
    }
  }


  updateLoginState(currentState) {
    this.setState({ userLoggedIn: currentState });
  }

  // Visual content - Method
  render() {

    const { userLoggedIn } = this.state

    return (
      <Router>
        <div className="App">
          <ScrollToTop />
          {/* NavBar - For easy navigation throughout the application */}
          <Navbar expand="lg" variant="dark" sticky="top">
            <img src={logo} style={{ width: '30px', marginLeft: "30px", marginRight: "5px" }} alt='fulllogo' />
            <b>Rubato</b>
          </Navbar>

          {!userLoggedIn ? (
            <div>
              <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          ) : (
            <div>
              <div className='sidebar'>
                <Sidebar updateLoginState={this.updateLoginState} />
              </div>
              <div className='component-view'>
                {/* Switches between the local components */}
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/lists' element={<Lists />} />
                  <Route path='/lists/albums' element={<ListenListAlbums />} />
                  <Route path='/diary' element={<Diary />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/album/' element={<AlbumDetails />} />
                  <Route path='/genre/albums/' element={<GenreAlbums />} />
                  <Route path='/artists/albums/' element={<ArtistAlbums />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
