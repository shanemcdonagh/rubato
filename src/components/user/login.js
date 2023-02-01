import React, { Component } from "react";
import {Form, Button}from 'react-bootstrap';
import { NavLink } from "react-router-dom";


class Login extends Component {
    render() {
        return (
            <Form style={{ marginLeft: '60vh', marginTop: '20vh'}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="danger" type="submit">
                    Login
                </Button>
                <NavLink to="/register">
                    <Button variant="danger">Register</Button>
                </NavLink>
            </Form>
        );

    }
}

// Export for use in App.js
export default Login;
