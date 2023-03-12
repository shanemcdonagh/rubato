import React, { Component } from "react";
import {Button}from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from "axios";
import logo from '../../images/simplelogo.png';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange(event){
        const { name, value } = event.target;
    
        this.setState({
          [name]: value,
        });
      };

      async handleLogin(e){
        e.preventDefault();

        const loggedUser = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/login', loggedUser)
        .then((response) => {
            const data = response.data

            if(data.user)
            {
                localStorage.setItem('token', data.user)
                localStorage.setItem('userID', data.userID)
                alert('Login successful')
                window.location.href = '/'
            }
            else
            {
                alert('Please check your username or password')
            }
        })
        .catch((error) => {
            console.log("Cannot retrieve information from server " + error);
        })
      }

    render() {
        const {email, password} = this.state

        return (
            <div className="containerLoginRegister">
            <img src={logo} alt="logo" className = "logoUser"/>
            <h1 className = "logoUser">Rubato</h1>
            <div className="vl"></div>
            <div className="register">
                <form onSubmit={this.handleLogin}>
                    <div style={{ borderRadius: '25px' }}>
                        <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleInputChange} required /><br/>
                        <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleInputChange} required /><br/> 
                    </div><br/>
                    <Button variant="danger" type="submit" className="register-login-button">Login</Button>
                    <NavLink id="RouterNavLink" to="/register">
                        <Button variant="danger" className="register-login-button">Register</Button>
                    </NavLink>
                </form>
            </div>
        </div>
        );

    }
}

// Export for use in App.js
export default Login;
