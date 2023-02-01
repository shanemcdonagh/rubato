import React, { Component } from "react";
import {Form, Button}from 'react-bootstrap';
import { NavLink } from "react-router-dom";


class Register extends Component {
    render() {
        return (
            // https://react-bootstrap.github.io/forms/overview/
            <Form style={{ marginLeft: '60vh', marginTop: '20vh'}}>
                 <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <NavLink to="/register">
                    <Button variant="danger">Register</Button>
                </NavLink>
            </Form>
        );

    }
}

// Export for use in App.js
export default Register;
