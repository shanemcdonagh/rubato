import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

class Genre extends Component {
    render() {
        return (
            <Card
                bg="dark"
                text="danger"
                style={{ width: '18rem', marginLeft: '10vh' }}
                className="mb-2 genre-card" key={this.props.key}>
                <NavLink style={{ color: 'red', textDecoration: 'none' }}>
                    <Card.Body>
                        {this.props.genre.toUpperCase()}
                    </Card.Body>
                </NavLink>
                <NavLink to={"/genre/albums/?term=" + this.props.genre}>
                    <Button variant="danger">View Albums</Button>
                </NavLink>
            </Card>
        )
    }
}

export default Genre;