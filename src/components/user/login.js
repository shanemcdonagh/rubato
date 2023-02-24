import React, { Component } from "react";
import {Button}from 'react-bootstrap';
import axios from "axios";

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
            <form onSubmit={this.handleLogin}>
                <div style={{borderRadius: '25px'}}>
                    <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleInputChange} required /><br/>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleInputChange} required /><br/> 
                </div>  
            <Button variant="danger" type="submit">Login</Button>
          </form>
        );

    }
}

// Export for use in App.js
export default Login;
