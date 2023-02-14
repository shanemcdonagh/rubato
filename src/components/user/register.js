import React, { Component } from "react";
import {Button}from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from "axios";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleInputChange(event){
        const { name, value } = event.target;
    
        this.setState({
          [name]: value,
        });
      };

      async handleRegister(e){
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/register', newUser)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log("Cannot retrieve information from server " + error);
        })
      }

    render() {
        const {name, email, password} = this.state

        return (
            <form onSubmit={this.handleRegister}>
                <div style={{borderRadius: '25px'}}>
                    <input type="text" placeholder="Username" name="name" value={name} onChange={this.handleInputChange} required /><br/>
                    <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleInputChange} required /><br/>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleInputChange} required /><br/> 
                </div>  
            <Button variant="danger" type="submit">Register</Button>
          </form>
        );

    }
}

// Export for use in App.js
export default Register;
